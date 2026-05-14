document.addEventListener('DOMContentLoaded', () => {
  initAuthTabs();
  initLoginForm();
  initRegisterForm();
});

function initAuthTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-tab-content="${target}"]`).classList.add('active');
    });
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('loginStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Signing in...';
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const res = await fetch(APP_CONFIG.API_BASE_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.value.trim(),
          password: form.password.value
        })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = data.user.role === 'admin' ? '/admin.html' : '/dashboard.html';
      } else {
        throw new Error(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = err.message || 'Login failed. Please try again.';
      status.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('registerStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Creating account...';
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const res = await fetch(APP_CONFIG.API_BASE_URL + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.querySelector('#regName').value.trim(),
          email: form.querySelector('#regEmail').value.trim(),
          phone: form.querySelector('#regPhone').value.trim(),
          password: form.querySelector('#regPassword').value
        })
      });

      const data = await res.json();

      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = data.message || 'Account created successfully! You can now sign in.';
        status.style.display = 'block';
        form.reset();
      } else {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = err.message || 'Registration failed. Please try again.';
      status.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
