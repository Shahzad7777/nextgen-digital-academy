/* =========================================================
   NextGen Digital Academy — Phase 5 Admin Command Center
   Login Gate + Course CRUD + Blog CRUD + Comment Approval
   Export / Import / Reset Controls
========================================================= */

"use strict";

/*
  IMPORTANT:
  This is a front-end LocalStorage admin gate for Vercel/static hosting.
  For real production security, move authentication and data writes to
  Firebase Auth, Supabase Auth, or a protected backend API.
*/

const NEXTGEN_ADMIN_PASSWORD = "NextGen@2025";
const NEXTGEN_ADMIN_SESSION_KEY = "nextgen_admin_authenticated";

/* ---------- Shared Storage Keys ---------- */
const NEXTGEN_KEYS = {
  courses: "nextgen_courses",
  blogs: "nextgen_blogs",
  comments: "nextgen_comments",
  dbVersion: "nextgen_db_version"
};

/* ---------- Default Database ---------- */
const NEXTGEN_ADMIN_DEFAULT_DB = {
  version: "5.0.0",

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

/* ---------- Admin State ---------- */
const AdminState = {
  courses: [],
  blogs: [],
  comments: [],
  activeTab: "overview",
  elements: {}
};

/* ---------- DOM Cache ---------- */
function cacheAdminElements() {
  AdminState.elements = {
    loginScreen: document.getElementById("adminLoginScreen"),
    dashboard: document.getElementById("adminDashboard"),
    loginForm: document.getElementById("adminLoginForm"),
    adminPassword: document.getElementById("adminPassword"),
    loginError: document.getElementById("loginError"),
    logoutBtn: document.getElementById("adminLogoutBtn"),

    navButtons: document.querySelectorAll("[data-admin-tab]"),
    tabTriggers: document.querySelectorAll("[data-admin-tab-trigger]"),
    tabPanels: document.querySelectorAll(".admin-tab-panel"),

    overviewCourseCount: document.getElementById("overviewCourseCount"),
    overviewBlogCount: document.getElementById("overviewBlogCount"),
    overviewPendingCount: document.getElementById("overviewPendingCount"),

    courseForm: document.getElementById("courseForm"),
    newCourseBtn: document.getElementById("newCourseBtn"),
    clearCourseFormBtn: document.getElementById("clearCourseFormBtn"),
    courseTableBody: document.getElementById("courseTableBody"),

    courseId: document.getElementById("courseId"),
    courseTitle: document.getElementById("courseTitle"),
    courseShortTitle: document.getElementById("courseShortTitle"),
    courseCategory: document.getElementById("courseCategory"),
    courseBadge: document.getElementById("courseBadge"),
    courseLevel: document.getElementById("courseLevel"),
    courseDuration: document.getElementById("courseDuration"),
    courseDescription: document.getElementById("courseDescription"),
    courseStandardPrice: document.getElementById("courseStandardPrice"),
    courseVipPrice: document.getElementById("courseVipPrice"),
    courseOldVipPrice: document.getElementById("courseOldVipPrice"),
    courseMentorshipPrice: document.getElementById("courseMentorshipPrice"),
    courseDiscount: document.getElementById("courseDiscount"),
    courseGradient: document.getElementById("courseGradient"),
    courseFeatured: document.getElementById("courseFeatured"),

    blogForm: document.getElementById("blogForm"),
    newBlogBtn: document.getElementById("newBlogBtn"),
    clearBlogFormBtn: document.getElementById("clearBlogFormBtn"),
    blogTableBody: document.getElementById("blogTableBody"),

    blogId: document.getElementById("blogId"),
    blogTitle: document.getElementById("blogTitle"),
    blogTag: document.getElementById("blogTag"),
    blogDate: document.getElementById("blogDate"),
    blogReadTime: document.getElementById("blogReadTime"),
    blogExcerpt: document.getElementById("blogExcerpt"),
    blogFeatured: document.getElementById("blogFeatured"),

    commentTableBody: document.getElementById("commentTableBody"),

    exportDataBtn: document.getElementById("exportDataBtn"),
    importDataBtn: document.getElementById("importDataBtn"),
    resetDataBtn: document.getElementById("resetDataBtn"),
    jsonDataBox: document.getElementById("jsonDataBox"),

    toast: document.getElementById("adminToast")
  };
}

/* ---------- Storage Layer ---------- */
function readJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Failed to read ${key}`, error);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write ${key}`, error);
    showAdminToast("Browser storage failed. Please check permissions.");
  }
}

function seedAdminDefaults() {
  if (!localStorage.getItem(NEXTGEN_KEYS.courses)) {
    writeJSON(NEXTGEN_KEYS.courses, NEXTGEN_ADMIN_DEFAULT_DB.courses);
  }

  if (!localStorage.getItem(NEXTGEN_KEYS.blogs)) {
    writeJSON(NEXTGEN_KEYS.blogs, NEXTGEN_ADMIN_DEFAULT_DB.blogs);
  }

  if (!localStorage.getItem(NEXTGEN_KEYS.comments)) {
    writeJSON(NEXTGEN_KEYS.comments, NEXTGEN_ADMIN_DEFAULT_DB.comments);
  }

  if (!localStorage.getItem(NEXTGEN_KEYS.dbVersion)) {
    localStorage.setItem(NEXTGEN_KEYS.dbVersion, NEXTGEN_ADMIN_DEFAULT_DB.version);
  }
}

function loadAdminData() {
  AdminState.courses = readJSON(
    NEXTGEN_KEYS.courses,
    NEXTGEN_ADMIN_DEFAULT_DB.courses
  );

  AdminState.blogs = readJSON(
    NEXTGEN_KEYS.blogs,
    NEXTGEN_ADMIN_DEFAULT_DB.blogs
  );

  AdminState.comments = readJSON(
    NEXTGEN_KEYS.comments,
    NEXTGEN_ADMIN_DEFAULT_DB.comments
  );
}

function saveCourses() {
  writeJSON(NEXTGEN_KEYS.courses, AdminState.courses);
}

function saveBlogs() {
  writeJSON(NEXTGEN_KEYS.blogs, AdminState.blogs);
}

function saveComments() {
  writeJSON(NEXTGEN_KEYS.comments, AdminState.comments);
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

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function generateId(prefix, title) {
  const base = slugify(title || prefix);
  return `${base || prefix}-${Date.now().toString(36)}`;
}

function categoryLabel(category) {
  const labels = {
    ads: "Paid Ads",
    funnels: "Funnels",
    mentorship: "Mentorship",
    business: "Online Business"
  };

  return labels[category] || category;
}

function numberValue(input, fallback = 0) {
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function showAdminToast(message) {
  const { toast } = AdminState.elements;

  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

/* ---------- Auth ---------- */
function isAuthenticated() {
  return sessionStorage.getItem(NEXTGEN_ADMIN_SESSION_KEY) === "true";
}

function showLogin() {
  const { loginScreen, dashboard } = AdminState.elements;

  loginScreen?.classList.remove("hidden");
  dashboard?.classList.add("hidden");
}

function showDashboard() {
  const { loginScreen, dashboard } = AdminState.elements;

  loginScreen?.classList.add("hidden");
  dashboard?.classList.remove("hidden");

  loadAdminData();
  renderAdmin();
}

function handleLogin(event) {
  event.preventDefault();

  const { adminPassword, loginError } = AdminState.elements;
  const password = adminPassword.value.trim();

  if (password !== NEXTGEN_ADMIN_PASSWORD) {
    if (loginError) loginError.style.display = "block";
    adminPassword.value = "";
    adminPassword.focus();
    return;
  }

  sessionStorage.setItem(NEXTGEN_ADMIN_SESSION_KEY, "true");

  if (loginError) loginError.style.display = "none";

  adminPassword.value = "";
  showDashboard();
  showAdminToast("Dashboard unlocked.");
}

function handleLogout() {
  sessionStorage.removeItem(NEXTGEN_ADMIN_SESSION_KEY);
  showLogin();
  showAdminToast("Logged out.");
}

/* ---------- Tabs ---------- */
function switchAdminTab(tabName) {
  AdminState.activeTab = tabName;

  AdminState.elements.navButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.getAttribute("data-admin-tab") === tabName
    );
  });

  AdminState.elements.tabPanels.forEach((panel) => {
    panel.classList.add("hidden");
  });

  const activePanel = document.getElementById(`tab-${tabName}`);
  activePanel?.classList.remove("hidden");

  renderAdmin();
}

/* ---------- Overview Render ---------- */
function renderOverview() {
  const {
    overviewCourseCount,
    overviewBlogCount,
    overviewPendingCount
  } = AdminState.elements;

  const pendingCount = AdminState.comments.filter(
    (comment) => comment.status === "pending"
  ).length;

  if (overviewCourseCount) {
    overviewCourseCount.textContent = String(AdminState.courses.length);
  }

  if (overviewBlogCount) {
    overviewBlogCount.textContent = String(AdminState.blogs.length);
  }

  if (overviewPendingCount) {
    overviewPendingCount.textContent = String(pendingCount);
  }
}

/* ---------- Course CRUD ---------- */
function clearCourseForm() {
  const elements = AdminState.elements;

  elements.courseForm?.reset();

  if (elements.courseId) {
    elements.courseId.value = "";
  }

  if (elements.courseGradient) {
    elements.courseGradient.value =
      "linear-gradient(135deg, #102f5f, #05122b 58%, #0a2144)";
  }

  elements.courseTitle?.focus();
}

function getCourseFormData() {
  const elements = AdminState.elements;
  const selectedCategory = elements.courseCategory.value;

  const existingId = elements.courseId.value.trim();

  return {
    id: existingId || generateId("course", elements.courseTitle.value),
    title: elements.courseTitle.value.trim(),
    shortTitle: elements.courseShortTitle.value.trim(),
    category: selectedCategory,
    categoryLabel: categoryLabel(selectedCategory),
    level: elements.courseLevel.value.trim(),
    duration: elements.courseDuration.value.trim(),
    instructor: "Shahzad Hassan",
    description: elements.courseDescription.value.trim(),
    standardPrice: numberValue(elements.courseStandardPrice),
    vipPrice: numberValue(elements.courseVipPrice),
    oldVipPrice: numberValue(elements.courseOldVipPrice),
    mentorshipPrice: numberValue(elements.courseMentorshipPrice),
    discount: elements.courseDiscount.value.trim(),
    badge: elements.courseBadge.value.trim(),
    featured: elements.courseFeatured.checked,
    gradient:
      elements.courseGradient.value.trim() ||
      "linear-gradient(135deg, #102f5f, #05122b 58%, #0a2144)"
  };
}

function handleCourseSubmit(event) {
  event.preventDefault();

  const course = getCourseFormData();

  if (
    !course.title ||
    !course.shortTitle ||
    !course.category ||
    !course.description ||
    !course.badge
  ) {
    showAdminToast("Please complete all required course fields.");
    return;
  }

  const index = AdminState.courses.findIndex((item) => item.id === course.id);

  if (index >= 0) {
    AdminState.courses[index] = course;
    showAdminToast("Course updated.");
  } else {
    AdminState.courses.unshift(course);
    showAdminToast("Course created.");
  }

  saveCourses();
  clearCourseForm();
  renderAdmin();
}

function editCourse(courseId) {
  const course = AdminState.courses.find((item) => item.id === courseId);

  if (!course) {
    showAdminToast("Course not found.");
    return;
  }

  const elements = AdminState.elements;

  elements.courseId.value = course.id;
  elements.courseTitle.value = course.title || "";
  elements.courseShortTitle.value = course.shortTitle || "";
  elements.courseCategory.value = course.category || "";
  elements.courseBadge.value = course.badge || "";
  elements.courseLevel.value = course.level || "";
  elements.courseDuration.value = course.duration || "";
  elements.courseDescription.value = course.description || "";
  elements.courseStandardPrice.value = course.standardPrice ?? "";
  elements.courseVipPrice.value = course.vipPrice ?? "";
  elements.courseOldVipPrice.value = course.oldVipPrice ?? "";
  elements.courseMentorshipPrice.value = course.mentorshipPrice ?? "";
  elements.courseDiscount.value = course.discount || "";
  elements.courseGradient.value = course.gradient || "";
  elements.courseFeatured.checked = Boolean(course.featured);

  switchAdminTab("courses");
  elements.courseTitle.focus();

  showAdminToast("Course loaded for editing.");
}

function deleteCourse(courseId) {
  const course = AdminState.courses.find((item) => item.id === courseId);

  if (!course) {
    showAdminToast("Course not found.");
    return;
  }

  const confirmed = window.confirm(
    `Delete "${course.title}"? This cannot be undone.`
  );

  if (!confirmed) return;

  AdminState.courses = AdminState.courses.filter((item) => item.id !== courseId);
  saveCourses();
  renderAdmin();

  showAdminToast("Course deleted.");
}

function renderCourseTable() {
  const { courseTableBody } = AdminState.elements;

  if (!courseTableBody) return;

  if (!AdminState.courses.length) {
    courseTableBody.innerHTML = `
      <tr>
        <td colspan="5">No courses found. Create your first course above.</td>
      </tr>
    `;
    return;
  }

  courseTableBody.innerHTML = AdminState.courses
    .map((course) => {
      return `
        <tr>
          <td>
            <strong>${escapeHTML(course.title)}</strong>
            <br />
            <span style="color:rgba(255,255,255,.58);font-size:.84rem;">
              ${escapeHTML(course.shortTitle || "")}
            </span>
          </td>

          <td>${escapeHTML(course.categoryLabel || categoryLabel(course.category))}</td>

          <td>
            Standard: $${escapeHTML(course.standardPrice)}
            <br />
            VIP: $${escapeHTML(course.vipPrice)}
            <br />
            Mentorship: $${escapeHTML(course.mentorshipPrice)}
          </td>

          <td>
            ${
              course.featured
                ? `<span class="status-pill live">Featured</span>`
                : `<span class="status-pill draft">Live</span>`
            }
          </td>

          <td>
            <div style="display:flex;gap:.45rem;flex-wrap:wrap;">
              <button
                type="button"
                class="btn btn-outline btn-small"
                data-course-edit="${escapeHTML(course.id)}"
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-dark btn-small"
                data-course-delete="${escapeHTML(course.id)}"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

/* ---------- Blog CRUD ---------- */
function clearBlogForm() {
  const elements = AdminState.elements;

  elements.blogForm?.reset();

  if (elements.blogId) {
    elements.blogId.value = "";
  }

  elements.blogTitle?.focus();
}

function getBlogFormData() {
  const elements = AdminState.elements;
  const existingId = elements.blogId.value.trim();

  return {
    id: existingId || generateId("blog", elements.blogTitle.value),
    title: elements.blogTitle.value.trim(),
    tag: elements.blogTag.value.trim(),
    date: elements.blogDate.value.trim(),
    readTime: elements.blogReadTime.value.trim(),
    excerpt: elements.blogExcerpt.value.trim(),
    featured: elements.blogFeatured.checked
  };
}

function handleBlogSubmit(event) {
  event.preventDefault();

  const blog = getBlogFormData();

  if (!blog.title || !blog.tag || !blog.date || !blog.readTime || !blog.excerpt) {
    showAdminToast("Please complete all required blog fields.");
    return;
  }

  const index = AdminState.blogs.findIndex((item) => item.id === blog.id);

  if (index >= 0) {
    AdminState.blogs[index] = blog;
    showAdminToast("Blog updated.");
  } else {
    AdminState.blogs.unshift(blog);
    showAdminToast("Blog created.");
  }

  saveBlogs();
  clearBlogForm();
  renderAdmin();
}

function editBlog(blogId) {
  const blog = AdminState.blogs.find((item) => item.id === blogId);

  if (!blog) {
    showAdminToast("Blog not found.");
    return;
  }

  const elements = AdminState.elements;

  elements.blogId.value = blog.id;
  elements.blogTitle.value = blog.title || "";
  elements.blogTag.value = blog.tag || "";
  elements.blogDate.value = blog.date || "";
  elements.blogReadTime.value = blog.readTime || "";
  elements.blogExcerpt.value = blog.excerpt || "";
  elements.blogFeatured.checked = Boolean(blog.featured);

  switchAdminTab("blogs");
  elements.blogTitle.focus();

  showAdminToast("Blog loaded for editing.");
}

function deleteBlog(blogId) {
  const blog = AdminState.blogs.find((item) => item.id === blogId);

  if (!blog) {
    showAdminToast("Blog not found.");
    return;
  }

  const confirmed = window.confirm(
    `Delete "${blog.title}"? This cannot be undone.`
  );

  if (!confirmed) return;

  AdminState.blogs = AdminState.blogs.filter((item) => item.id !== blogId);
  saveBlogs();
  renderAdmin();

  showAdminToast("Blog deleted.");
}

function renderBlogTable() {
  const { blogTableBody } = AdminState.elements;

  if (!blogTableBody) return;

  if (!AdminState.blogs.length) {
    blogTableBody.innerHTML = `
      <tr>
        <td colspan="5">No blogs found. Create your first blog above.</td>
      </tr>
    `;
    return;
  }

  blogTableBody.innerHTML = AdminState.blogs
    .map((blog) => {
      return `
        <tr>
          <td>
            <strong>${escapeHTML(blog.title)}</strong>
            <br />
            <span style="color:rgba(255,255,255,.58);font-size:.84rem;">
              ${escapeHTML(blog.excerpt).slice(0, 90)}...
            </span>
          </td>

          <td>${escapeHTML(blog.tag)}</td>

          <td>${escapeHTML(blog.readTime)}</td>

          <td>
            ${
              blog.featured
                ? `<span class="status-pill live">Featured</span>`
                : `<span class="status-pill draft">Live</span>`
            }
          </td>

          <td>
            <div style="display:flex;gap:.45rem;flex-wrap:wrap;">
              <button
                type="button"
                class="btn btn-outline btn-small"
                data-blog-edit="${escapeHTML(blog.id)}"
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-dark btn-small"
                data-blog-delete="${escapeHTML(blog.id)}"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

/* ---------- Comment Approval ---------- */
function updateCommentStatus(commentId, status) {
  const comment = AdminState.comments.find((item) => item.id === commentId);

  if (!comment) {
    showAdminToast("Comment not found.");
    return;
  }

  comment.status = status;
  saveComments();
  renderAdmin();

  const label = status.charAt(0).toUpperCase() + status.slice(1);
  showAdminToast(`Comment marked as ${label}.`);
}

function deleteComment(commentId) {
  const comment = AdminState.comments.find((item) => item.id === commentId);

  if (!comment) {
    showAdminToast("Comment not found.");
    return;
  }

  const confirmed = window.confirm(
    `Delete comment by "${comment.name}"? This cannot be undone.`
  );

  if (!confirmed) return;

  AdminState.comments = AdminState.comments.filter(
    (item) => item.id !== commentId
  );

  saveComments();
  renderAdmin();

  showAdminToast("Comment deleted.");
}

function addAdminReply(commentId) {
  const comment = AdminState.comments.find((item) => item.id === commentId);

  if (!comment) {
    showAdminToast("Comment not found.");
    return;
  }

  const message = window.prompt("Write admin reply:");

  if (!message || !message.trim()) return;

  if (!Array.isArray(comment.replies)) {
    comment.replies = [];
  }

  comment.replies.push({
    id: `reply-${Date.now()}`,
    name: "NextGen Team",
    message: message.trim(),
    date: new Date().toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }),
    status: "approved"
  });

  saveComments();
  renderAdmin();

  showAdminToast("Admin reply added.");
}

function renderCommentTable() {
  const { commentTableBody } = AdminState.elements;

  if (!commentTableBody) return;

  if (!AdminState.comments.length) {
    commentTableBody.innerHTML = `
      <tr>
        <td colspan="4">No student comments yet.</td>
      </tr>
    `;
    return;
  }

  commentTableBody.innerHTML = AdminState.comments
    .map((comment) => {
      const status = comment.status || "pending";
      const replies = Array.isArray(comment.replies) ? comment.replies.length : 0;

      return `
        <tr>
          <td>
            <strong>${escapeHTML(comment.name)}</strong>
            <br />
            <span style="color:rgba(255,255,255,.58);font-size:.84rem;">
              ${escapeHTML(comment.email || "No email")}
            </span>
            <br />
            <span style="color:rgba(255,255,255,.48);font-size:.78rem;">
              ${escapeHTML(comment.date || "")}
            </span>
          </td>

          <td>
            ${escapeHTML(comment.message)}
            ${
              replies
                ? `<br /><span style="color:#39d8ff;font-size:.82rem;">${replies} admin reply</span>`
                : ""
            }
          </td>

          <td>
            <span class="status-pill ${escapeHTML(status)}">
              ${escapeHTML(status)}
            </span>
          </td>

          <td>
            <div style="display:flex;gap:.45rem;flex-wrap:wrap;">
              <button
                type="button"
                class="btn btn-outline btn-small"
                data-comment-approve="${escapeHTML(comment.id)}"
              >
                Approve
              </button>

              <button
                type="button"
                class="btn btn-dark btn-small"
                data-comment-reject="${escapeHTML(comment.id)}"
              >
                Reject
              </button>

              <button
                type="button"
                class="btn btn-outline btn-small"
                data-comment-reply="${escapeHTML(comment.id)}"
              >
                Reply
              </button>

              <button
                type="button"
                class="btn btn-dark btn-small"
                data-comment-delete="${escapeHTML(comment.id)}"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

/* ---------- Export / Import / Reset ---------- */
function exportData() {
  const { jsonDataBox } = AdminState.elements;

  const payload = {
    exportedAt: new Date().toISOString(),
    version: NEXTGEN_ADMIN_DEFAULT_DB.version,
    courses: AdminState.courses,
    blogs: AdminState.blogs,
    comments: AdminState.comments
  };

  jsonDataBox.value = JSON.stringify(payload, null, 2);
  showAdminToast("JSON export generated.");
}

function importData() {
  const { jsonDataBox } = AdminState.elements;

  if (!jsonDataBox.value.trim()) {
    showAdminToast("Paste exported JSON before importing.");
    return;
  }

  let parsed;

  try {
    parsed = JSON.parse(jsonDataBox.value);
  } catch (error) {
    showAdminToast("Invalid JSON. Please check formatting.");
    return;
  }

  if (
    !Array.isArray(parsed.courses) ||
    !Array.isArray(parsed.blogs) ||
    !Array.isArray(parsed.comments)
  ) {
    showAdminToast("JSON must include courses, blogs, and comments arrays.");
    return;
  }

  const confirmed = window.confirm(
    "Import this JSON and replace current admin data?"
  );

  if (!confirmed) return;

  AdminState.courses = parsed.courses;
  AdminState.blogs = parsed.blogs;
  AdminState.comments = parsed.comments;

  saveCourses();
  saveBlogs();
  saveComments();

  localStorage.setItem(
    NEXTGEN_KEYS.dbVersion,
    parsed.version || NEXTGEN_ADMIN_DEFAULT_DB.version
  );

  renderAdmin();
  showAdminToast("JSON imported successfully.");
}

function resetData() {
  const confirmed = window.confirm(
    "Reset courses, blogs, and comments to default data? This cannot be undone."
  );

  if (!confirmed) return;

  AdminState.courses = structuredClone(NEXTGEN_ADMIN_DEFAULT_DB.courses);
  AdminState.blogs = structuredClone(NEXTGEN_ADMIN_DEFAULT_DB.blogs);
  AdminState.comments = structuredClone(NEXTGEN_ADMIN_DEFAULT_DB.comments);

  saveCourses();
  saveBlogs();
  saveComments();

  localStorage.setItem(NEXTGEN_KEYS.dbVersion, NEXTGEN_ADMIN_DEFAULT_DB.version);

  renderAdmin();

  if (AdminState.elements.jsonDataBox) {
    AdminState.elements.jsonDataBox.value = "";
  }

  showAdminToast("Default data restored.");
}

/* ---------- Main Render ---------- */
function renderAdmin() {
  renderOverview();
  renderCourseTable();
  renderBlogTable();
  renderCommentTable();
}

/* ---------- Event Binding ---------- */
function bindAdminEvents() {
  const elements = AdminState.elements;

  elements.loginForm?.addEventListener("submit", handleLogin);
  elements.logoutBtn?.addEventListener("click", handleLogout);

  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchAdminTab(button.getAttribute("data-admin-tab"));
    });
  });

  elements.tabTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      switchAdminTab(button.getAttribute("data-admin-tab-trigger"));
    });
  });

  elements.newCourseBtn?.addEventListener("click", clearCourseForm);
  elements.clearCourseFormBtn?.addEventListener("click", clearCourseForm);
  elements.courseForm?.addEventListener("submit", handleCourseSubmit);

  elements.newBlogBtn?.addEventListener("click", clearBlogForm);
  elements.clearBlogFormBtn?.addEventListener("click", clearBlogForm);
  elements.blogForm?.addEventListener("submit", handleBlogSubmit);

  elements.exportDataBtn?.addEventListener("click", exportData);
  elements.importDataBtn?.addEventListener("click", importData);
  elements.resetDataBtn?.addEventListener("click", resetData);

  document.addEventListener("click", (event) => {
    const courseEdit = event.target.closest("[data-course-edit]");
    const courseDelete = event.target.closest("[data-course-delete]");
    const blogEdit = event.target.closest("[data-blog-edit]");
    const blogDelete = event.target.closest("[data-blog-delete]");
    const commentApprove = event.target.closest("[data-comment-approve]");
    const commentReject = event.target.closest("[data-comment-reject]");
    const commentReply = event.target.closest("[data-comment-reply]");
    const commentDelete = event.target.closest("[data-comment-delete]");

    if (courseEdit) {
      editCourse(courseEdit.getAttribute("data-course-edit"));
      return;
    }

    if (courseDelete) {
      deleteCourse(courseDelete.getAttribute("data-course-delete"));
      return;
    }

    if (blogEdit) {
      editBlog(blogEdit.getAttribute("data-blog-edit"));
      return;
    }

    if (blogDelete) {
      deleteBlog(blogDelete.getAttribute("data-blog-delete"));
      return;
    }

    if (commentApprove) {
      updateCommentStatus(
        commentApprove.getAttribute("data-comment-approve"),
        "approved"
      );
      return;
    }

    if (commentReject) {
      updateCommentStatus(
        commentReject.getAttribute("data-comment-reject"),
        "rejected"
      );
      return;
    }

    if (commentReply) {
      addAdminReply(commentReply.getAttribute("data-comment-reply"));
      return;
    }

    if (commentDelete) {
      deleteComment(commentDelete.getAttribute("data-comment-delete"));
    }
  });
}

/* ---------- Init ---------- */
function initAdmin() {
  cacheAdminElements();
  seedAdminDefaults();
  loadAdminData();
  bindAdminEvents();

  clearCourseForm();

  if (isAuthenticated()) {
    showDashboard();
  } else {
    showLogin();
  }
}

document.addEventListener("DOMContentLoaded", initAdmin);
