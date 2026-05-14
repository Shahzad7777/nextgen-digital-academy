document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderCourses();
  initContactForm();
  initEnrollModal();
  initScrollAnimations();
});

/* === Navigation === */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

/* === Render Courses === */
function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid || typeof COURSES === 'undefined') return;

  grid.innerHTML = COURSES.map(course => `
    <div class="course-card" data-course-id="${course.id}">
      <div class="course-image" style="background: linear-gradient(135deg, ${course.color}22, ${course.color}08);">
        ${course.icon}
      </div>
      <div class="course-body">
        <span class="course-level ${course.level}">${course.level}</span>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <div class="course-meta">
          <span class="course-price">${course.price}</span>
          <span class="course-duration">${course.duration}</span>
        </div>
        <div class="course-actions">
          <a href="/course.html?id=${course.id}" class="btn btn-outline btn-sm" style="margin-right: 8px;">Learn More</a>
          <button class="btn btn-primary btn-sm enroll-btn" data-course-id="${course.id}" data-course-title="${course.title}">Enroll Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* === Contact Form === */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('contactStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    status.className = 'form-status';
    status.style.display = 'none';

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      subject: form.subject.value,
      message: form.message.value.trim()
    };

    try {
      const res = await fetch(APP_CONFIG.API_BASE_URL + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = data.message || 'Thank you! Your message has been sent successfully. We will get back to you soon.';
        status.style.display = 'block';
        form.reset();
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = err.message || 'Could not send your message. Please try again or contact us directly.';
      status.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/* === Enrollment Modal === */
function initEnrollModal() {
  const modal = document.getElementById('enrollModal');
  const modalClose = document.getElementById('modalClose');
  const enrollForm = document.getElementById('enrollForm');
  if (!modal) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.enroll-btn');
    if (!btn) return;

    const courseId = btn.dataset.courseId;
    const courseTitle = btn.dataset.courseTitle;
    document.getElementById('enrollCourseTitle').textContent = courseTitle;
    document.getElementById('enrollCourseId').value = courseId;
    modal.classList.add('active');
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  if (enrollForm) {
    enrollForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('enrollStatus');
      const submitBtn = enrollForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
      status.className = 'form-status';
      status.style.display = 'none';

      const formData = {
        name: enrollForm.querySelector('#enrollName').value.trim(),
        email: enrollForm.querySelector('#enrollEmail').value.trim(),
        phone: enrollForm.querySelector('#enrollPhone').value.trim(),
        courseId: enrollForm.querySelector('#enrollCourseId').value
      };

      try {
        const res = await fetch(APP_CONFIG.API_BASE_URL + '/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
          status.className = 'form-status success';
          status.textContent = data.message || 'Enrollment request submitted! We will contact you with next steps.';
          status.style.display = 'block';
          enrollForm.reset();
          setTimeout(() => modal.classList.remove('active'), 3000);
        } else {
          throw new Error(data.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = err.message || 'Could not submit enrollment. Please try again or contact us directly.';
        status.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
}

/* === Scroll Animations === */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.feature-card, .course-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
