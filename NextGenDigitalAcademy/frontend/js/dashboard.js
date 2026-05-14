document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!token || !user) {
    window.location.href = '/login.html';
    return;
  }

  const userName = document.getElementById('userName');
  if (userName && user.name) {
    userName.textContent = user.name;
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

  loadEnrollments(token);
});

async function loadEnrollments(token) {
  try {
    const res = await fetch(APP_CONFIG.API_BASE_URL + '/enrollments/my', {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!res.ok) return;

    const data = await res.json();
    const table = document.getElementById('enrollmentTable');
    const enrolledCount = document.getElementById('enrolledCount');

    if (data.enrollments && data.enrollments.length > 0) {
      if (enrolledCount) enrolledCount.textContent = data.enrollments.length;
      table.innerHTML = data.enrollments.map(e => `
        <tr>
          <td>${e.courseName || e.courseId}</td>
          <td><span class="status-badge ${e.status || 'pending'}">${e.status || 'Pending'}</span></td>
          <td>${e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '-'}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    // Silently handle - user will see default empty state
  }
}
