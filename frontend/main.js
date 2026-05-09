"use strict";

/* =========================================================
   NextGen Digital Academy — Public Dynamic Engine
   Location: /frontend/main.js
   Shared Admin Data Source: /frontend/admin.js via LocalStorage keys
========================================================= */

/* ---------- Shared Keys: Must Match admin.js ---------- */
const NEXTGEN_KEYS = {
  courses: "nextgen_courses",
  blogs: "nextgen_blogs",
  comments: "nextgen_comments",
  dbVersion: "nextgen_db_version"
};

/* ---------- Lightweight Default Data ---------- */
const NEXTGEN_DEFAULT_DB = {
  version: "6.0.0",

  courses: [
    {
      id: "google-ads-mastery",
      title: "Master Google Ads",
      shortTitle: "Google Ads",
      category: "ads",
      categoryLabel: "Paid Ads",
      level: "Beginner to Advanced",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Launch profitable Google Search campaigns for leads, calls, sales, and local service businesses.",
      standardPrice: 99,
      vipPrice: 199,
      oldVipPrice: 199,
      mentorshipPrice: 199,
      discount: "90% Off for 1 Month",
      badge: "High Intent",
      featured: true,
      gradient: "linear-gradient(135deg, #102f5f, #05122b 58%, #0a2144)"
    },
    {
      id: "facebook-sales-funnels",
      title: "FB Sales Funnels",
      shortTitle: "FB Funnels",
      category: "funnels",
      categoryLabel: "Funnels",
      level: "Intermediate",
      duration: "5 Weeks",
      instructor: "Shahzad Hassan",
      description: "Build Facebook ad funnels that convert cold Pakistani traffic into qualified leads and buyers.",
      standardPrice: 99,
      vipPrice: 149,
      oldVipPrice: 149,
      mentorshipPrice: 199,
      discount: "90% Off for 1 Month",
      badge: "Conversion",
      featured: true,
      gradient: "linear-gradient(135deg, #111b4d, #05122b 55%, #12376b)"
    },
    {
      id: "mentorship-funnels",
      title: "Mentorship Funnels",
      shortTitle: "Mentorship",
      category: "mentorship",
      categoryLabel: "Mentorship",
      level: "Advanced",
      duration: "6 Weeks",
      instructor: "Shahzad Hassan",
      description: "Create premium coaching and mentorship funnels with trust, proof, offer strategy, and closing systems.",
      standardPrice: 99,
      vipPrice: 199,
      oldVipPrice: 199,
      mentorshipPrice: 199,
      discount: "90% Off for 1 Month",
      badge: "Premium",
      featured: true,
      gradient: "linear-gradient(135deg, #071936, #020716 55%, #102f5f)"
    },
    {
      id: "tiktok-ads-growth",
      title: "TikTok Ads Growth",
      shortTitle: "TikTok Ads",
      category: "ads",
      categoryLabel: "Paid Ads",
      level: "Beginner",
      duration: "3 Weeks",
      instructor: "Shahzad Hassan",
      description: "Use short-form creatives and TikTok ads to generate attention, leads, and sales.",
      standardPrice: 79,
      vipPrice: 129,
      oldVipPrice: 179,
      mentorshipPrice: 179,
      discount: "Launch Offer",
      badge: "Trending",
      featured: false,
      gradient: "linear-gradient(135deg, #05243d, #05122b 55%, #12376b)"
    },
    {
      id: "landing-page-mastery",
      title: "Landing Page Mastery",
      shortTitle: "Landing Pages",
      category: "funnels",
      categoryLabel: "Funnels",
      level: "Intermediate",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Design landing pages with hooks, proof, urgency, offers, and WhatsApp conversion flow.",
      standardPrice: 89,
      vipPrice: 149,
      oldVipPrice: 199,
      mentorshipPrice: 199,
      discount: "90% Off for 1 Month",
      badge: "CRO",
      featured: false,
      gradient: "linear-gradient(135deg, #0a2144, #05122b 58%, #062c55)"
    },
    {
      id: "whatsapp-closing-system",
      title: "WhatsApp Closing System",
      shortTitle: "WhatsApp Sales",
      category: "business",
      categoryLabel: "Online Business",
      level: "Beginner to Intermediate",
      duration: "2 Weeks",
      instructor: "Shahzad Hassan",
      description: "Turn WhatsApp chats into paid enrollments using scripts, follow-ups, and proof.",
      standardPrice: 49,
      vipPrice: 99,
      oldVipPrice: 149,
      mentorshipPrice: 149,
      discount: "Student Special",
      badge: "Pakistan Ready",
      featured: false,
      gradient: "linear-gradient(135deg, #063c39, #05122b 58%, #0a2144)"
    },
    {
      id: "seo-blog-authority",
      title: "SEO Blog Authority",
      shortTitle: "SEO Authority",
      category: "business",
      categoryLabel: "Online Business",
      level: "Intermediate",
      duration: "5 Weeks",
      instructor: "Shahzad Hassan",
      description: "Build search authority with topic clusters, helpful blogs, and conversion-focused SEO.",
      standardPrice: 89,
      vipPrice: 159,
      oldVipPrice: 199,
      mentorshipPrice: 199,
      discount: "90% Off for 1 Month",
      badge: "Organic Growth",
      featured: false,
      gradient: "linear-gradient(135deg, #0b2f4d, #05122b 58%, #102f5f)"
    },
    {
      id: "agency-launch-blueprint",
      title: "Agency Launch Blueprint",
      shortTitle: "Agency Launch",
      category: "business",
      categoryLabel: "Online Business",
      level: "Advanced",
      duration: "6 Weeks",
      instructor: "Shahzad Hassan",
      description: "Start a digital agency with service offers, pricing, outreach, and delivery systems.",
      standardPrice: 129,
      vipPrice: 199,
      oldVipPrice: 299,
      mentorshipPrice: 299,
      discount: "Mentorship Deal",
      badge: "Business",
      featured: false,
      gradient: "linear-gradient(135deg, #102f5f, #030816 58%, #071936)"
    },
    {
      id: "email-automation-mastery",
      title: "Email Automation Mastery",
      shortTitle: "Email Automation",
      category: "funnels",
      categoryLabel: "Funnels",
      level: "Intermediate",
      duration: "3 Weeks",
      instructor: "Shahzad Hassan",
      description: "Create nurture sequences that educate leads, build trust, and recover missed sales.",
      standardPrice: 69,
      vipPrice: 129,
      oldVipPrice: 179,
      mentorshipPrice: 179,
      discount: "Automation Offer",
      badge: "Follow-Up",
      featured: false,
      gradient: "linear-gradient(135deg, #071936, #05122b 55%, #0e3c77)"
    },
    {
      id: "copywriting-for-sales",
      title: "Copywriting for Sales",
      shortTitle: "Copywriting",
      category: "business",
      categoryLabel: "Online Business",
      level: "Beginner to Advanced",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Write hooks, ad copy, landing page copy, and WhatsApp scripts that convert.",
      standardPrice: 79,
      vipPrice: 139,
      oldVipPrice: 199,
      mentorshipPrice: 199,
      discount: "90% Off for 1 Month",
      badge: "Sales Skill",
      featured: false,
      gradient: "linear-gradient(135deg, #152452, #05122b 58%, #102f5f)"
    },
    {
      id: "youtube-growth-engine",
      title: "YouTube Growth Engine",
      shortTitle: "YouTube Growth",
      category: "business",
      categoryLabel: "Online Business",
      level: "Beginner",
      duration: "5 Weeks",
      instructor: "Shahzad Hassan",
      description: "Plan content, titles, thumbnails, and funnels that turn attention into business growth.",
      standardPrice: 89,
      vipPrice: 159,
      oldVipPrice: 219,
      mentorshipPrice: 219,
      discount: "Creator Offer",
      badge: "Creator",
      featured: false,
      gradient: "linear-gradient(135deg, #122e5c, #05122b 58%, #061832)"
    },
    {
      id: "freelancing-client-acquisition",
      title: "Freelancing Client Acquisition",
      shortTitle: "Freelancing",
      category: "mentorship",
      categoryLabel: "Mentorship",
      level: "Beginner to Intermediate",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Find clients, pitch services, build proof, close deals, and create repeat income.",
      standardPrice: 79,
      vipPrice: 149,
      oldVipPrice: 249,
      mentorshipPrice: 249,
      discount: "Pakistan Student Deal",
      badge: "Career",
      featured: false,
      gradient: "linear-gradient(135deg, #082a46, #05122b 58%, #12376b)"
    }
  ],

  blogs: [
    {
      id: "digital-marketing-pakistan",
      title: "Why Digital Marketing Is Exploding in Pakistan",
      tag: "Market Insight",
      date: "Latest",
      readTime: "5 min read",
      excerpt: "Pakistan’s online business economy is growing fast, but only skilled marketers can convert attention into income.",
      featured: true
    },
    {
      id: "funnels-vs-websites",
      title: "Funnels vs Websites: What Actually Converts?",
      tag: "Funnels",
      date: "Guide",
      readTime: "4 min read",
      excerpt: "A beautiful website is not enough. Conversion comes from a guided path: hook, offer, trust, proof, and action.",
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
    },
    {
      id: "whatsapp-sales-proof",
      title: "Why WhatsApp Proof Increases Course Sales",
      tag: "Sales Psychology",
      date: "Conversion",
      readTime: "4 min read",
      excerpt: "For Pakistani buyers, trust often happens inside WhatsApp. Screenshots, replies, and payment proof reduce hesitation.",
      featured: false
    }
  ],

  comments: []
};

/* ---------- State ---------- */
const App = {
  courses: [],
  blogs: [],
  comments: [],
  visibleCourseLimit: 6,
  elements: {}
};

/* ---------- Utilities ---------- */
const $ = (selector) => document.querySelector(selector);

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Storage unavailable. Please check browser settings.");
  }
}

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("en-US")}`;
}

function isMobileConnection() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowNetwork = connection && /2g|3g|slow-2g/i.test(connection.effectiveType || "");
  return window.matchMedia("(max-width: 760px)").matches || slowNetwork;
}

function debounce(callback, delay = 180) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), delay);
  };
}

function showToast(message) {
  const toast = App.elements.toast;
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

/* ---------- Data Sync With Admin ---------- */
function seedIfEmpty() {
  if (!localStorage.getItem(NEXTGEN_KEYS.courses)) {
    writeJSON(NEXTGEN_KEYS.courses, NEXTGEN_DEFAULT_DB.courses);
  }

  if (!localStorage.getItem(NEXTGEN_KEYS.blogs)) {
    writeJSON(NEXTGEN_KEYS.blogs, NEXTGEN_DEFAULT_DB.blogs);
  }

  if (!localStorage.getItem(NEXTGEN_KEYS.comments)) {
    writeJSON(NEXTGEN_KEYS.comments, NEXTGEN_DEFAULT_DB.comments);
  }

  if (!localStorage.getItem(NEXTGEN_KEYS.dbVersion)) {
    localStorage.setItem(NEXTGEN_KEYS.dbVersion, NEXTGEN_DEFAULT_DB.version);
  }
}

function loadData() {
  seedIfEmpty();

  App.courses = readJSON(NEXTGEN_KEYS.courses, NEXTGEN_DEFAULT_DB.courses);
  App.blogs = readJSON(NEXTGEN_KEYS.blogs, NEXTGEN_DEFAULT_DB.blogs);
  App.comments = readJSON(NEXTGEN_KEYS.comments, []);
}

/* ---------- DOM Cache ---------- */
function cacheElements() {
  App.elements = {
    year: $("#year"),
    navToggle: $("#navToggle"),
    navLinks: $("#navLinks"),
    courseGrid: $("#courseGrid"),
    courseSearch: $("#courseSearch"),
    courseFilter: $("#courseFilter"),
    blogGrid: $("#blogGrid"),
    commentForm: $("#commentForm"),
    commentName: $("#commentName"),
    commentEmail: $("#commentEmail"),
    commentMessage: $("#commentMessage"),
    commentList: $("#commentList"),
    toast: $("#toast")
  };
}

/* ---------- Course Rendering ---------- */
function getFilteredCourses() {
  const searchValue = App.elements.courseSearch
    ? App.elements.courseSearch.value.toLowerCase().trim()
    : "";

  const category = App.elements.courseFilter
    ? App.elements.courseFilter.value
    : "all";

  return App.courses.filter((course) => {
    const text = [
      course.title,
      course.shortTitle,
      course.category,
      course.categoryLabel,
      course.level,
      course.duration,
      course.instructor,
      course.description,
      course.badge
    ].join(" ").toLowerCase();

    return text.includes(searchValue) && (category === "all" || course.category === category);
  });
}

function courseTemplate(course) {
  return `
    <article class="course-card" data-course-id="${escapeHTML(course.id)}">
      <div class="course-thumb" style="background:${escapeHTML(course.gradient)};">
        <span class="course-category">${escapeHTML(course.categoryLabel || course.category)}</span>

        <div style="position:absolute;inset:auto 1rem 1rem 1rem;z-index:2;">
          <strong style="display:block;max-width:78%;color:#fff;font-size:clamp(1.35rem,3vw,2rem);line-height:1.02;letter-spacing:-.04em;text-shadow:0 6px 18px rgba(0,0,0,.35);">
            ${escapeHTML(course.shortTitle || course.title)}
          </strong>

          <span style="display:inline-flex;margin-top:.55rem;padding:.28rem .62rem;border-radius:999px;color:#05122b;background:linear-gradient(135deg,#00afff,#39d8ff);font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em;">
            ${escapeHTML(course.badge || "NextGen")}
          </span>
        </div>
      </div>

      <h3 class="course-title">${escapeHTML(course.title)}</h3>
      <p class="course-desc">${escapeHTML(course.description)}</p>

      <div class="course-meta">
        <span>${escapeHTML(course.level)}</span>
        <span>${escapeHTML(course.duration)}</span>
        <span>${escapeHTML(course.instructor || "Shahzad Hassan")}</span>
      </div>

      <div class="course-pricing">
        <div class="price-tier">
          <small>Standard</small>
          <strong>${formatPrice(course.standardPrice)}</strong>
        </div>

        <div class="price-tier">
          <small>VIP</small>
          <strong>
            ${course.oldVipPrice ? `<del>${formatPrice(course.oldVipPrice)}</del> ` : ""}
            ${formatPrice(course.vipPrice)}
          </strong>
        </div>

        <div class="price-tier">
          <small>Mentorship</small>
          <strong>${formatPrice(course.mentorshipPrice)}</strong>
        </div>
      </div>

      <div class="discount-pill">${escapeHTML(course.discount)}</div>

      <a href="#contact" class="course-cta btn" data-course-enroll="${escapeHTML(course.id)}">
        Start Reading Free ▶
      </a>
    </article>
  `;
}

function renderCourses(resetLimit = false) {
  const grid = App.elements.courseGrid;
  if (!grid) return;

  if (resetLimit) {
    App.visibleCourseLimit = isMobileConnection() ? 6 : App.courses.length;
  }

  const filtered = getFilteredCourses();
  const visible = filtered.slice(0, App.visibleCourseLimit);

  if (!filtered.length) {
    grid.innerHTML = `<div class="course-empty">No courses found. Try another search or category.</div>`;
    return;
  }

  const cards = visible.map(courseTemplate).join("");
  const needsLoadMore = visible.length < filtered.length;

  grid.innerHTML = `
    ${cards}
    ${
      needsLoadMore
        ? `<div class="course-empty" style="padding:1rem;">
            <button type="button" class="btn btn-primary" id="loadMoreCourses">
              Load More Courses
            </button>
          </div>`
        : ""
    }
  `;
}

/* ---------- Blog Rendering ---------- */
function renderBlogs() {
  const grid = App.elements.blogGrid;
  if (!grid) return;

  if (!App.blogs.length) {
    grid.innerHTML = `<div class="course-empty">No insights published yet.</div>`;
    return;
  }

  grid.innerHTML = App.blogs.map((blog) => `
    <article class="blog-card ${blog.featured ? "featured" : ""}" data-blog-id="${escapeHTML(blog.id)}">
      <div>
        <div class="blog-meta">
          <span class="blog-tag">${escapeHTML(blog.tag)}</span>
          <span>${escapeHTML(blog.date)}</span>
          <span>${escapeHTML(blog.readTime)}</span>
        </div>

        <h3 class="blog-title">${escapeHTML(blog.title)}</h3>
        <p class="blog-excerpt">${escapeHTML(blog.excerpt)}</p>

        <a href="#comments" class="blog-read-more">Read Insight →</a>
      </div>
    </article>
  `).join("");
}

/* ---------- Comments ---------- */
function createComment(name, email, message) {
  return {
    id: `comment-${Date.now()}`,
    name,
    email,
    message,
    date: new Date().toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }),
    status: "pending",
    replies: []
  };
}

function renderComments() {
  const list = App.elements.commentList;
  if (!list) return;

  const approved = App.comments.filter((comment) => comment.status === "approved");

  const pinned = `
    <div class="comment-bubble approved">
      <div class="comment-topline">
        <p class="comment-author">NextGen Team</p>
        <span class="comment-date">Pinned</span>
      </div>
      <p class="comment-text">Welcome to the student discussion area. Approved comments will appear here after admin review.</p>
      <span class="comment-status approved">Approved</span>
    </div>
  `;

  const studentComments = approved.map((comment) => {
    const replies = Array.isArray(comment.replies)
      ? comment.replies
          .filter((reply) => reply.status === "approved")
          .map((reply) => `
            <div class="comment-bubble reply approved">
              <div class="comment-topline">
                <p class="comment-author">${escapeHTML(reply.name || "NextGen Team")}</p>
                <span class="comment-date">${escapeHTML(reply.date || "")}</span>
              </div>
              <p class="comment-text">${escapeHTML(reply.message)}</p>
              <span class="comment-status approved">Approved</span>
            </div>
          `)
          .join("")
      : "";

    return `
      <div class="comment-bubble approved">
        <div class="comment-topline">
          <p class="comment-author">${escapeHTML(comment.name)}</p>
          <span class="comment-date">${escapeHTML(comment.date)}</span>
        </div>
        <p class="comment-text">${escapeHTML(comment.message)}</p>
        <span class="comment-status approved">Approved</span>
      </div>
      ${replies}
    `;
  }).join("");

  list.innerHTML = pinned + studentComments;
}

/* ---------- Events ---------- */
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
  } = App.elements;

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  const rerenderCourses = debounce(() => renderCourses(true), 180);

  courseSearch?.addEventListener("input", rerenderCourses);
  courseFilter?.addEventListener("change", () => renderCourses(true));

  commentForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = commentName.value.trim();
    const email = commentEmail.value.trim();
    const message = commentMessage.value.trim();

    if (!name || !email || !message) {
      showToast("Please complete all comment fields.");
      return;
    }

    App.comments.unshift(createComment(name, email, message));
    writeJSON(NEXTGEN_KEYS.comments, App.comments);

    commentForm.reset();
    showToast("Comment submitted. It will appear after admin approval.");
  });

  document.addEventListener("click", (event) => {
    const loadMore = event.target.closest("#loadMoreCourses");
    if (loadMore) {
      App.visibleCourseLimit += 6;
      renderCourses(false);
      return;
    }

    const enrollButton = event.target.closest("[data-course-enroll]");
    if (enrollButton) {
      const courseId = enrollButton.getAttribute("data-course-enroll");
      const course = App.courses.find((item) => item.id === courseId);

      if (course) {
        showToast(`Selected: ${course.title}. Continue on WhatsApp to enroll.`);
      }
    }
  });

  window.addEventListener("storage", (event) => {
    if (!Object.values(NEXTGEN_KEYS).includes(event.key)) return;

    loadData();
    renderCourses(true);
    renderBlogs();
    renderComments();
  });
}

/* ---------- Init ---------- */
function init() {
  cacheElements();

  if (App.elements.year) {
    App.elements.year.textContent = new Date().getFullYear();
  }

  App.visibleCourseLimit = isMobileConnection() ? 6 : 99;

  loadData();
  bindEvents();

  renderCourses(true);
  renderBlogs();
  renderComments();
}

document.addEventListener("DOMContentLoaded", init);
