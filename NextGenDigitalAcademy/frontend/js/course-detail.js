document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderCourseDetail();
  initEnrollModal();
});

function initNavbar() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
}

function renderCourseDetail() {
  const container = document.getElementById('courseDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('id');
  const course = COURSES.find(c => c.id === courseId);

  if (!course) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
        <h2>Course Not Found</h2>
        <p style="color: var(--text-secondary); margin: 16px 0 24px;">The course you are looking for does not exist or has been removed.</p>
        <a href="/#courses" class="btn btn-primary">Browse All Courses</a>
      </div>
    `;
    return;
  }

  document.title = course.title + ' - NextGen Digital Academy';

  container.innerHTML = `
    <div class="course-detail-body">
      <div class="course-detail-header">
        <span class="course-level ${course.level}">${course.level}</span>
        <h1>${course.title}</h1>
        <p>${course.description}</p>
      </div>
      <h2>What You Will Learn</h2>
      <ul>
        ${course.topics.map(t => `<li>${t}</li>`).join('')}
      </ul>
      <h2>Course Overview</h2>
      <p>This comprehensive program is designed for anyone who wants to build practical skills and launch a career in the digital space. Our hands-on approach ensures you gain real-world experience through projects, assignments, and mentorship.</p>
      <p>By the end of this course, you will have a solid portfolio and the confidence to start working professionally, whether as a freelancer, remote employee, or entrepreneur.</p>
      <h2>Who Is This For?</h2>
      <ul>
        <li>Students looking to build marketable skills</li>
        <li>Professionals wanting to transition into digital careers</li>
        <li>Entrepreneurs and small business owners</li>
        <li>Anyone passionate about learning new digital skills</li>
      </ul>
    </div>
    <div class="course-sidebar">
      <div class="course-sidebar-card">
        <div class="price">${course.price}</div>
        <div class="detail-row"><span>Duration</span><span>${course.duration}</span></div>
        <div class="detail-row"><span>Level</span><span style="text-transform: capitalize;">${course.level}</span></div>
        <div class="detail-row"><span>Language</span><span>Urdu / English</span></div>
        <div class="detail-row"><span>Access</span><span>Lifetime</span></div>
        <div class="detail-row"><span>Certificate</span><span>Yes</span></div>
        <div style="margin-top: 24px;">
          <button class="btn btn-primary btn-full enroll-btn" data-course-id="${course.id}" data-course-title="${course.title}">Enroll Now</button>
        </div>
        <div style="margin-top: 12px;">
          <a href="/#contact" class="btn btn-outline btn-full btn-sm">Ask a Question</a>
        </div>
      </div>
    </div>
  `;
}

function initEnrollModal() {
  const modal = document.getElementById('enrollModal');
  const modalClose = document.getElementById('modalClose');
  const enrollForm = document.getElementById('enrollForm');
  if (!modal) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.enroll-btn');
    if (!btn) return;
    document.getElementById('enrollCourseTitle').textContent = btn.dataset.courseTitle;
    document.getElementById('enrollCourseId').value = btn.dataset.courseId;
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
          status.textContent = data.message || 'Enrollment request submitted! We will contact you shortly.';
          status.style.display = 'block';
          enrollForm.reset();
          setTimeout(() => modal.classList.remove('active'), 3000);
        } else {
          throw new Error(data.message || 'Something went wrong.');
        }
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = err.message || 'Could not submit enrollment. Please try again.';
        status.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
}
