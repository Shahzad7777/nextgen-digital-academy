document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!token || !user || user.role !== 'admin') {
    window.location.href = '/login.html';
    return;
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    });
  }

  loadAdminData(token);
});

async function loadAdminData(token) {
  const headers = { 'Authorization': 'Bearer ' + token };

  try {
    const [enrollRes, contactRes] = await Promise.all([
      fetch(APP_CONFIG.API_BASE_URL + '/admin/enrollments', { headers }),
      fetch(APP_CONFIG.API_BASE_URL + '/admin/contacts', { headers })
    ]);

    if (enrollRes.ok) {
      const enrollData = await enrollRes.json();
      const enrollments = enrollData.enrollments || [];
      document.getElementById('totalEnrollments').textContent = enrollments.length;
      const table = document.getElementById('adminEnrollmentTable');
      if (enrollments.length > 0) {
        table.innerHTML = enrollments.map(e => `
          <tr>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.courseName || e.courseId}</td>
            <td><span class="status-badge ${e.status || 'pending'}">${e.status || 'Pending'}</span></td>
            <td>${e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '-'}</td>
          </tr>
        `).join('');
      } else {
        table.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;">No enrollment requests yet.</td></tr>';
      }
    }

    if (contactRes.ok) {
      const contactData = await contactRes.json();
      const contacts = contactData.contacts || [];
      document.getElementById('totalMessages').textContent = contacts.length;
      const table = document.getElementById('adminContactTable');
      if (contacts.length > 0) {
        table.innerHTML = contacts.map(c => `
          <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.subject}</td>
            <td>${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '-'}</td>
          </tr>
        `).join('');
      } else {
        table.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:40px;">No contact messages yet.</td></tr>';
      }
    }
  } catch (err) {
    // Handle silently - admin will see default state
  }
}
