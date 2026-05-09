/* =========================================================
   NextGen Digital Academy — Phase 3 Dynamic Engine
   10+ Course Database + Blog Engine + Comment Approval Flow
   LocalStorage Ready / Firebase Ready Architecture
========================================================= */

"use strict";

/* ---------- Central App Database ---------- */
const NEXTGEN_DEFAULT_DB = {
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
      description:
        "Launch profitable Google Search campaigns for leads, calls, sales, and local service businesses.",
      standardPrice: 99,
      vipPrice: 199,
      mentorshipPrice: 199,
      oldVipPrice: 199,
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
      description:
        "Build Facebook ad funnels that convert cold Pakistani traffic into qualified leads and buyers.",
      standardPrice: 99,
      vipPrice: 149,
      mentorshipPrice: 199,
      oldVipPrice: 149,
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
      description:
        "Create premium coaching and mentorship funnels with strong trust, proof, and closing systems.",
      standardPrice: 99,
      vipPrice: 199,
      mentorshipPrice: 199,
      oldVipPrice: 199,
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
      description:
        "Use TikTok ads and short-form creatives to generate attention, leads, and direct-response sales.",
      standardPrice: 79,
      vipPrice: 129,
      mentorshipPrice: 179,
      oldVipPrice: 179,
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
      description:
        "Design landing pages with strong hooks, social proof, urgency, and WhatsApp conversion flow.",
      standardPrice: 89,
      vipPrice: 149,
      mentorshipPrice: 199,
      oldVipPrice: 199,
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
      description:
        "Turn WhatsApp chats into paid enrollments using scripts, follow-ups, proof, and objection handling.",
      standardPrice: 49,
      vipPrice: 99,
      mentorshipPrice: 149,
      oldVipPrice: 149,
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
      description:
        "Build long-term search visibility with authority blogs, topic clusters, and conversion-focused SEO.",
      standardPrice: 89,
      vipPrice: 159,
      mentorshipPrice: 199,
      oldVipPrice: 199,
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
      description:
        "Start a digital marketing agency with service offers, pricing, client outreach, and delivery systems.",
      standardPrice: 129,
      vipPrice: 199,
      mentorshipPrice: 299,
      oldVipPrice: 299,
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
      description:
        "Create automated nurture sequences that educate leads, build trust, and recover missed sales.",
      standardPrice: 69,
      vipPrice: 129,
      mentorshipPrice: 179,
      oldVipPrice: 179,
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
      description:
        "Write hooks, offers, ad copy, landing page copy, and WhatsApp scripts that move people to action.",
      standardPrice: 79,
      vipPrice: 139,
      mentorshipPrice: 199,
      oldVipPrice: 199,
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
      description:
        "Plan content, thumbnails, titles, and funnels that turn YouTube attention into business growth.",
      standardPrice: 89,
      vipPrice: 159,
      mentorshipPrice: 219,
      oldVipPrice: 219,
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
      description:
        "Find clients, pitch services, create proof, close deals, and build repeat income as a freelancer.",
      standardPrice: 79,
      vipPrice: 149,
      mentorshipPrice: 249,
      oldVipPrice: 249,
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
      excerpt:
        "Pakistan’s online business economy is growing fast, but only skilled marketers can convert attention into income.",
      featured: true
    },
    {
      id: "funnels-vs-websites",
      title: "Funnels vs Websites: What Actually Converts?",
      tag: "Funnels",
      date: "Guide",
      readTime: "4 min read",
      excerpt:
        "A beautiful website is not enough. Conversion comes from a guided path: hook, offer, trust, proof, and action.",
      featured: false
    },
    {
      id: "google-ads-buyer-intent",
      title: "Google Ads and Buyer Intent",
      tag: "Paid Ads",
      date: "Strategy",
      readTime: "6 min read",
      excerpt:
        "Google Ads works because people are already searching. The skill is knowing which searches deserve your money.",
      featured: false
    },
    {
      id: "pakistani-student-online-income",
      title: "The Real Online Income Path for Pakistani Students",
      tag: "Students",
      date: "Mentorship",
      readTime: "7 min read",
      excerpt:
        "Avoid random shortcuts. Build one monetizable skill, one offer, one audience, and one repeatable sales system.",
      featured: false
    },
    {
      id: "whatsapp-sales-proof",
      title: "Why WhatsApp Proof Increases Course Sales",
      tag: "Sales Psychology",
      date: "Conversion",
      readTime: "4 min read",
      excerpt:
        "For Pakistani buyers, trust often happens inside WhatsApp. Screenshots, replies, and payment proof reduce hesitation.",
      featured: false
    },
    {
      id: "mentor-vs-course",
      title: "Course or Mentor: What Do You Actually Need?",
      tag: "Mentorship",
      date: "Advice",
      readTime: "5 min read",
      excerpt:
        "Courses teach frameworks. Mentorship corrects execution. The best students use both at the right stage.",
      featured: false
    }
  ],

  comments: []
};

/* ---------- App State ---------- */
const NextGenApp = {
  version: "3.0.0",

  storageKeys: {
    courses: "nextgen_courses",
    blogs: "nextgen_blogs",
    comments: "nextgen_comments",
    dbVersion: "nextgen_db_version"
  },

  courses: [],
  blogs: [],
  comments: [],
  elements: {}
};

/* ---------- Element Cache ---------- */
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

/* ---------- Storage Layer ---------- */
function getFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`NextGen storage read failed: ${key}`, error);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`NextGen storage save failed: ${key}`, error);
  }
}

function seedDefaultData() {
  const savedVersion = localStorage.getItem(NextGenApp.storageKeys.dbVersion);

  if (!savedVersion) {
    saveToStorage(NextGenApp.storageKeys.courses, NEXTGEN_DEFAULT_DB.courses);
    saveToStorage(NextGenApp.storageKeys.blogs, NEXTGEN_DEFAULT_DB.blogs);
    saveToStorage(NextGenApp.storageKeys.comments, NEXTGEN_DEFAULT_DB.comments);
    localStorage.setItem(NextGenApp.storageKeys.dbVersion, NextGenApp.version);
  }

  NextGenApp.courses = getFromStorage(
    NextGenApp.storageKeys.courses,
    NEXTGEN_DEFAULT_DB.courses
  );

  NextGenApp.blogs = getFromStorage(
    NextGenApp.storageKeys.blogs,
    NEXTGEN_DEFAULT_DB.blogs
  );

  NextGenApp.comments = getFromStorage(
    NextGenApp.storageKeys.comments,
    NEXTGEN_DEFAULT_DB.comments
  );
}

/* ---------- Utilities ---------- */
function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(price) {
  return `$${Number(price).toLocaleString("en-US")}`;
}

function formatCategory(value) {
  const labels = {
    ads: "Paid Ads",
    funnels: "Funnels",
    mentorship: "Mentorship",
    business: "Online Business"
  };

  return labels[value] || value;
}

function showToast(message) {
  const { toast } = NextGenApp.elements;

  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

/* ---------- Course Engine ---------- */
function getFilteredCourses() {
  const { courseSearch, courseFilter } = NextGenApp.elements;

  const searchValue = courseSearch
    ? courseSearch.value.toLowerCase().trim()
    : "";

  const selectedCategory = courseFilter ? courseFilter.value : "all";

  return NextGenApp.courses.filter((course) => {
    const searchableText = [
      course.title,
      course.shortTitle,
      course.category,
      course.categoryLabel,
      course.level,
      course.duration,
      course.instructor,
      course.description,
      course.badge
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchValue);
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function renderCourseThumbnail(course) {
  const title = escapeHTML(course.shortTitle || course.title);
  const badge = escapeHTML(course.badge || "NextGen");

  return `
    <div
      class="course-thumb"
      style="background:${escapeHTML(course.gradient)};"
    >
      <span class="course-category">${escapeHTML(course.categoryLabel || formatCategory(course.category))}</span>

      <div style="
        position:absolute;
        inset:auto 1rem 1rem 1rem;
        z-index:2;
      ">
        <strong style="
          display:block;
          max-width:78%;
          color:#ffffff;
          font-size:clamp(1.35rem, 3vw, 2rem);
          line-height:1.02;
          letter-spacing:-0.04em;
          text-shadow:0 6px 18px rgba(0,0,0,.35);
        ">
          ${title}
        </strong>

        <span style="
          display:inline-flex;
          margin-top:.55rem;
          padding:.28rem .62rem;
          border-radius:999px;
          color:#05122b;
          background:linear-gradient(135deg, #00afff, #39d8ff);
          font-size:.72rem;
          font-weight:900;
          text-transform:uppercase;
          letter-spacing:.04em;
        ">
          ${badge}
        </span>
      </div>

      <div style="
        position:absolute;
        right:1rem;
        bottom:.7rem;
        width:82px;
        height:82px;
        border-radius:999px;
        background:
          radial-gradient(circle at 35% 28%, rgba(255,255,255,.45), transparent 18%),
          linear-gradient(145deg, rgba(0,175,255,.85), rgba(255,255,255,.16));
        box-shadow:0 0 28px rgba(0,175,255,.38);
        opacity:.9;
      "></div>
    </div>
  `;
}

function renderCourses() {
  const { courseGrid } = NextGenApp.elements;

  if (!courseGrid) return;

  const filteredCourses = getFilteredCourses();

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
        <article class="course-card" data-course-id="${escapeHTML(course.id)}">
          ${renderCourseThumbnail(course)}

          <h3 class="course-title">${escapeHTML(course.title)}</h3>

          <p class="course-desc">${escapeHTML(course.description)}</p>

          <div class="course-meta">
            <span>${escapeHTML(course.level)}</span>
            <span>${escapeHTML(course.duration)}</span>
            <span>${escapeHTML(course.instructor)}</span>
          </div>

          <div class="course-pricing">
            <div class="price-tier">
              <small>Standard</small>
              <strong>${formatPrice(course.standardPrice)}</strong>
            </div>

            <div class="price-tier">
              <small>VIP</small>
              <strong>
                ${
                  course.oldVipPrice
                    ? `<del>${formatPrice(course.oldVipPrice)}</del> `
                    : ""
                }
                ${formatPrice(course.vipPrice)}
              </strong>
            </div>

            <div class="price-tier">
              <small>Mentorship</small>
              <strong>${formatPrice(course.mentorshipPrice)}</strong>
            </div>
          </div>

          <div class="discount-pill">${escapeHTML(course.discount)}</div>

          <a
            href="#contact"
            class="course-cta btn"
            data-course-enroll="${escapeHTML(course.id)}"
          >
            Start Reading Free ▶
          </a>
        </article>
      `;
    })
    .join("");
}

/* ---------- Blog Engine ---------- */
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
        <article class="blog-card ${featuredClass}" data-blog-id="${escapeHTML(blog.id)}">
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

/* ---------- Comment Engine ---------- */
function createComment({ name, email, message }) {
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
        Welcome to the student discussion area. Approved student comments will appear here after admin review.
      </p>

      <span class="comment-status approved">Approved</span>
    </div>
  `;

  const renderedComments = approvedComments
    .map((comment) => {
      const replies = Array.isArray(comment.replies)
        ? comment.replies
            .filter((reply) => reply.status === "approved")
            .map((reply) => {
              return `
                <div class="comment-bubble reply approved">
                  <div class="comment-topline">
                    <p class="comment-author">${escapeHTML(reply.name || "NextGen Team")}</p>
                    <span class="comment-date">${escapeHTML(reply.date || "")}</span>
                  </div>

                  <p class="comment-text">${escapeHTML(reply.message)}</p>

                  <span class="comment-status approved">Approved</span>
                </div>
              `;
            })
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
    })
    .join("");

  commentList.innerHTML = defaultComment + renderedComments;
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

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
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

      const name = commentName.value.trim();
      const email = commentEmail.value.trim();
      const message = commentMessage.value.trim();

      if (!name || !email || !message) {
        showToast("Please complete all comment fields.");
        return;
      }

      const newComment = createComment({ name, email, message });

      NextGenApp.comments.unshift(newComment);
      saveToStorage(NextGenApp.storageKeys.comments, NextGenApp.comments);

      commentForm.reset();

      showToast("Comment submitted. It will appear after admin approval.");
    });
  }

  document.addEventListener("click", (event) => {
    const enrollButton = event.target.closest("[data-course-enroll]");

    if (!enrollButton) return;

    const courseId = enrollButton.getAttribute("data-course-enroll");
    const course = NextGenApp.courses.find((item) => item.id === courseId);

    if (course) {
      showToast(`Selected: ${course.title}. Continue on WhatsApp to enroll.`);
    }
  });

  window.addEventListener("storage", (event) => {
    const watchedKeys = Object.values(NextGenApp.storageKeys);

    if (!watchedKeys.includes(event.key)) return;

    seedDefaultData();
    renderCourses();
    renderBlogs();
    renderComments();
  });
}

/* ---------- Firebase Ready Adapter Placeholder ---------- */
const NextGenDataAdapter = {
  async getCourses() {
    return getFromStorage(NextGenApp.storageKeys.courses, NEXTGEN_DEFAULT_DB.courses);
  },

  async getBlogs() {
    return getFromStorage(NextGenApp.storageKeys.blogs, NEXTGEN_DEFAULT_DB.blogs);
  },

  async getComments() {
    return getFromStorage(NextGenApp.storageKeys.comments, []);
  },

  async saveCourses(courses) {
    saveToStorage(NextGenApp.storageKeys.courses, courses);
  },

  async saveBlogs(blogs) {
    saveToStorage(NextGenApp.storageKeys.blogs, blogs);
  },

  async saveComments(comments) {
    saveToStorage(NextGenApp.storageKeys.comments, comments);
  }
};

/* ---------- Public Debug / Admin Bridge ---------- */
window.NextGenStore = {
  app: NextGenApp,
  defaults: NEXTGEN_DEFAULT_DB,
  adapter: NextGenDataAdapter,

  resetToDefaults() {
    saveToStorage(NextGenApp.storageKeys.courses, NEXTGEN_DEFAULT_DB.courses);
    saveToStorage(NextGenApp.storageKeys.blogs, NEXTGEN_DEFAULT_DB.blogs);
    saveToStorage(NextGenApp.storageKeys.comments, NEXTGEN_DEFAULT_DB.comments);
    localStorage.setItem(NextGenApp.storageKeys.dbVersion, NextGenApp.version);

    seedDefaultData();
    renderCourses();
    renderBlogs();
    renderComments();

    showToast("NextGen data reset to default.");
  }
};

/* ---------- Init ---------- */
function initApp() {
  cacheElements();

  if (NextGenApp.elements.year) {
    NextGenApp.elements.year.textContent = new Date().getFullYear();
  }

  seedDefaultData();
  bindEvents();

  renderCourses();
  renderBlogs();
  renderComments();
}

document.addEventListener("DOMContentLoaded", initApp);
