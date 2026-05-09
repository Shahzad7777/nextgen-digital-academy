/* =========================================================
   NextGen Digital Academy — Phase 2 App Structure
   Dynamic Course Grid + Blog + Comments Hooks
   Full course database and admin sync will be expanded in Phase 3.
========================================================= */

"use strict";

/* ---------- App State ---------- */
const NextGenApp = {
  courses: [],
  blogs: [],
  comments: [],

  storageKeys: {
    courses: "nextgen_courses",
    blogs: "nextgen_blogs",
    comments: "nextgen_comments"
  },

  elements: {}
};

/* ---------- DOM Shortcuts ---------- */
function cacheElements() {
  NextGenApp.elements = {
    year: document.getElementById("year"),

    navToggle: document.getElementById("navToggle"),
    navLinks: document.getElementById("navLinks"),

    courseGrid: document.getElementById("courseGrid"),
    courseSearch: document.getElementById("courseSearch"),
    courseFilter: document.getElementById("courseFilter"),

    blogGrid: document.getElementById("blogGrid"),

    commentForm: document.getElementById("commentForm"),
    commentName: document.getElementById("commentName"),
    commentEmail: document.getElementById("commentEmail"),
    commentMessage: document.getElementById("commentMessage"),
    commentList: document.getElementById("commentList"),

    toast: document.getElementById("toast")
  };
}

/* ---------- Utilities ---------- */
function getFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Storage read failed for ${key}:`, error);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Storage save failed for ${key}:`, error);
  }
}

function showToast(message) {
  const { toast } = NextGenApp.elements;

  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

function formatPrice(price) {
  return `$${price}`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- Temporary Seed Data ---------- */
function getDefaultCourses() {
  return [
    {
      id: "google-ads-mastery",
      title: "Master Google Ads",
      category: "ads",
      level: "Beginner to Advanced",
      duration: "4 Weeks",
      image: "",
      description: "Learn high-intent Google Ads campaigns for leads, sales, and service businesses.",
      standardPrice: 99,
      vipPrice: 199,
      mentorshipPrice: 199,
      oldVipPrice: 199,
      discount: "90% Off for 1 Month"
    },
    {
      id: "fb-sales-funnels",
      title: "FB Sales Funnels",
      category: "funnels",
      level: "Intermediate",
      duration: "5 Weeks",
      image: "",
      description: "Build Facebook ad funnels that turn cold traffic into paying customers.",
      standardPrice: 99,
      vipPrice: 149,
      mentorshipPrice: 199,
      oldVipPrice: 149,
      discount: "90% Off for 1 Month"
    },
    {
      id: "mentorship-funnels",
      title: "Mentorship Funnels",
      category: "mentorship",
      level: "Advanced",
      duration: "6 Weeks",
      image: "",
      description: "Design premium funnels for coaching, consulting, and mentorship offers.",
      standardPrice: 99,
      vipPrice: 199,
      mentorshipPrice: 199,
      oldVipPrice: 199,
      discount: "90% Off for 1 Month"
    }
  ];
}

function getDefaultBlogs() {
  return [
    {
      id: "digital-marketing-pakistan",
      title: "Why Digital Marketing Is Exploding in Pakistan",
      tag: "Market Insight",
      date: "Latest",
      readTime: "5 min read",
      excerpt: "Pakistan’s online business economy is growing fast, but only skilled marketers can turn attention into income.",
      featured: true
    },
    {
      id: "funnels-vs-websites",
      title: "Funnels vs Websites: What Actually Converts?",
      tag: "Funnels",
      date: "Guide",
      readTime: "4 min read",
      excerpt: "A beautiful website is not enough. Learn why conversion paths matter more than random pages.",
      featured: false
    },
    {
      id: "google-ads-buyer-intent",
      title: "Google Ads and Buyer Intent",
      tag: "Paid Ads",
      date: "Strategy",
      readTime: "6 min read",
      excerpt: "Google Ads works because people are already searching. The skill is knowing which searches deserve your money.",
      featured: false
    }
  ];
}

/* ---------- Course Rendering ---------- */
function renderCourses() {
  const { courseGrid, courseSearch, courseFilter } = NextGenApp.elements;

  if (!courseGrid) return;

  const searchValue = courseSearch ? courseSearch.value.toLowerCase().trim() : "";
  const selectedCategory = courseFilter ? courseFilter.value : "all";

  const filteredCourses = NextGenApp.courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchValue) ||
      course.description.toLowerCase().includes(searchValue) ||
      course.category.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!filteredCourses.length) {
    courseGrid.innerHTML = `
      <div class="course-empty">
        No courses found. Try a different search or category.
      </div>
    `;
    return;
  }

  courseGrid.innerHTML = filteredCourses
    .map((course) => {
      return `
        <article class="course-card">
          <div class="course-thumb">
            <span class="course-category">${escapeHTML(course.category)}</span>
          </div>

          <h3 class="course-title">${escapeHTML(course.title)}</h3>

          <p class="course-desc">${escapeHTML(course.description)}</p>

          <div class="course-meta">
            <span>${escapeHTML(course.level)}</span>
            <span>${escapeHTML(course.duration)}</span>
          </div>

          <div class="course-pricing">
            <div class="price-tier">
              <small>Standard</small>
              <strong>${formatPrice(course.standardPrice)}</strong>
            </div>

            <div class="price-tier">
              <small>VIP</small>
              <strong>
                ${course.oldVipPrice ? `<del>${formatPrice(course.oldVipPrice)}</del>` : ""}
                ${formatPrice(course.vipPrice)}
              </strong>
            </div>

            <div class="price-tier">
              <small>Mentorship</small>
              <strong>${formatPrice(course.mentorshipPrice)}</strong>
            </div>
          </div>

          <div class="discount-pill">${escapeHTML(course.discount)}</div>

          <a href="#contact" class="course-cta btn">
            Start Reading Free ▶
          </a>
        </article>
      `;
    })
    .join("");
}

/* ---------- Blog Rendering ---------- */
function renderBlogs() {
  const { blogGrid } = NextGenApp.elements;

  if (!blogGrid) return;

  if (!NextGenApp.blogs.length) {
    blogGrid.innerHTML = `
      <div class="course-empty">
        No blog posts available yet.
      </div>
    `;
    return;
  }

  blogGrid.innerHTML = NextGenApp.blogs
    .map((blog) => {
      const featuredClass = blog.featured ? "featured" : "";

      return `
        <article class="blog-card ${featuredClass}">
          <div>
            <div class="blog-meta">
              <span class="blog-tag">${escapeHTML(blog.tag)}</span>
              <span>${escapeHTML(blog.date)}</span>
              <span>${escapeHTML(blog.readTime)}</span>
            </div>

            <h3 class="blog-title">${escapeHTML(blog.title)}</h3>

            <p class="blog-excerpt">${escapeHTML(blog.excerpt)}</p>

            <a href="#comments" class="blog-read-more">
              Read Insight →
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

/* ---------- Comment Rendering ---------- */
function renderComments() {
  const { commentList } = NextGenApp.elements;

  if (!commentList) return;

  const approvedComments = NextGenApp.comments.filter(
    (comment) => comment.status === "approved"
  );

  const defaultComment = `
    <div class="comment-bubble approved">
      <div class="comment-topline">
        <p class="comment-author">NextGen Team</p>
        <span class="comment-date">Pinned</span>
      </div>

      <p class="comment-text">
        Welcome to the student discussion area. Approved comments will appear here.
      </p>

      <span class="comment-status approved">Approved</span>
    </div>
  `;

  const userComments = approvedComments
    .map((comment) => {
      return `
        <div class="comment-bubble approved">
          <div class="comment-topline">
            <p class="comment-author">${escapeHTML(comment.name)}</p>
            <span class="comment-date">${escapeHTML(comment.date)}</span>
          </div>

          <p class="comment-text">${escapeHTML(comment.message)}</p>

          <span class="comment-status approved">Approved</span>
        </div>
      `;
    })
    .join("");

  commentList.innerHTML = defaultComment + userComments;
}

/* ---------- Event Binding ---------- */
function bindEvents() {
  const {
    navToggle,
    navLinks,
    courseSearch,
    courseFilter,
    commentForm,
    commentName,
    commentEmail,
    commentMessage
  } = NextGenApp.elements;

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  if (courseSearch) {
    courseSearch.addEventListener("input", renderCourses);
  }

  if (courseFilter) {
    courseFilter.addEventListener("change", renderCourses);
  }

  if (commentForm) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newComment = {
        id: `comment-${Date.now()}`,
        name: commentName.value.trim(),
        email: commentEmail.value.trim(),
        message: commentMessage.value.trim(),
        date: new Date().toLocaleDateString("en-PK", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }),
        status: "pending"
      };

      NextGenApp.comments.push(newComment);
      saveToStorage(NextGenApp.storageKeys.comments, NextGenApp.comments);

      commentForm.reset();

      showToast("Comment submitted. It will appear after admin approval.");
    });
  }
}

/* ---------- App Init ---------- */
function initApp() {
  cacheElements();

  if (NextGenApp.elements.year) {
    NextGenApp.elements.year.textContent = new Date().getFullYear();
  }

  NextGenApp.courses = getFromStorage(
    NextGenApp.storageKeys.courses,
    getDefaultCourses()
  );

  NextGenApp.blogs = getFromStorage(
    NextGenApp.storageKeys.blogs,
    getDefaultBlogs()
  );

  NextGenApp.comments = getFromStorage(
    NextGenApp.storageKeys.comments,
    []
  );

  bindEvents();
  renderCourses();
  renderBlogs();
  renderComments();
}

document.addEventListener("DOMContentLoaded", initApp);
