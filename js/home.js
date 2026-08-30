// جاوااسکریپت صفحه اصلی (تغییر زبان، منوی موبایل و ...)document.addEventListener("DOMContentLoaded", ()
document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const path = window.location.pathname;
      const file = path.substring(path.lastIndexOf("/") + 1) || "home.html";

      if (file.includes("about")) {
        window.location.href = file.includes("-en")
          ? "about.html"
          : "about-en.html";
      } else if (file.includes("project-hess")) {
        window.location.href = file.includes("-en")
          ? "project-hess.html"
          : "project-hess-en.html";
      } else if (file.includes("project-sorena")) {
        window.location.href = file.includes("-en")
          ? "project-sorena.html"
          : "project-sorena-en.html";
      } else if (file.includes("project-chobkadeh")) {
        window.location.href = file.includes("-en")
          ? "project-chobkadeh.html"
          : "project-chobkadeh-en.html";
      } else if (file.includes("project-aftab")) {
        window.location.href = file.includes("-en")
          ? "project-aftab.html"
          : "project-aftab-en.html";
      } else if (file.includes("project-site")) {
        window.location.href = file.includes("-en")
          ? "project-site.html"
          : "project-site-en.html";
      } else if (file.includes("project-typography")) {
        window.location.href = file.includes("-en")
          ? "project-typography.html"
          : "project-typography-en.html";
      } else if (file.includes("project-daruit")) {
        window.location.href = file.includes("-en")
          ? "project-daruit.html"
          : "project-daruit-en.html";
      } else if (file.includes("project-magazine")) {
        window.location.href = file.includes("-en")
          ? "project-magazine.html"
          : "project-magazine-en.html";
      } else if (file.includes("contact")) {
        window.location.href = file.includes("-en")
          ? "contact.html"
          : "contact-en.html";
      } else if (file.includes("privacy")) {
        window.location.href = file.includes("-en")
          ? "privacy.html"
          : "privacy-en.html";
      } else if (file.includes("terms")) {
        window.location.href = file.includes("-en")
          ? "terms.html"
          : "terms-en.html";
      } else {
        window.location.href = file.includes("-en")
          ? "home.html"
          : "home-en.html";
      }
    });
  }

  // ... باقی کد همبرگر
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  // باز و بسته کردن منو با کلیک روی همبرگری
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-open");

    // جلوگیری از اسکرول صفحه وقتی منو باز است
    document.body.style.overflow = mobileMenu.classList.contains("is-open")
      ? "hidden"
      : "";
  });

  // بستن منو با کلیک روی پس‌زمینه تیره
  mobileOverlay.addEventListener("click", () => {
    hamburgerBtn.classList.remove("is-active");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  });
});
const filterBtns = document.querySelectorAll(".works-filter__btn");
const workItems = document.querySelectorAll(".works-item");

if (filterBtns.length && workItems.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");

      workItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.classList.remove("is-hidden");
        } else {
          item.classList.add("is-hidden");
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".hire-form");
  if (!form) return;

  // قوانین Regex
  const rules = {
    fullName: {
      // حروف فارسی یا انگلیسی + فاصله، حداقل ۲ کاراکتر
      regex: /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/,
      emptyMsg: "این قسمت باید تکمیل شود !",
      invalidMsg: "نام معتبر وارد کنید (فقط حروف)",
    },
    email: {
      useIsEmail: true,
      emptyMsg: "این قسمت باید تکمیل شود !",
      invalidMsg: "ایمیل معتبر وارد کنید",
    },
    projectType: {
      regex: /.+/, // نباید خالی باشد
      emptyMsg: "این قسمت باید تکمیل شود !",
      invalidMsg: "نوع پروژه را انتخاب کنید",
    },
    budget: {
      // اختیاری؛ اگر پر شد فقط عدد و جداکننده
      regex: /^[\d\s,،]+$/,
      optional: true,
      emptyMsg: "",
      invalidMsg: "مبلغ را به صورت عدد وارد کنید",
    },
    message: {
      // اختیاری؛ اگر پر شد حداقل ۱۰ کاراکتر
      regex: /^[\s\S]{10,1000}$/,
      optional: true,
      emptyMsg: "",
      invalidMsg: "توضیحات حداقل ۱۰ کاراکتر باشد",
    },
  };

  function setError(group, show, message) {
    if (!group) return;
    const textEl = group.querySelector(".hire-input-error-text");

    if (show) {
      group.classList.add("is-invalid");
      if (textEl && message) textEl.textContent = message;
    } else {
      group.classList.remove("is-invalid");
    }
  }

  function validateField(field) {
    const name = field.getAttribute("name");
    const rule = rules[name];
    const group = field.closest(".hire-form__group");
    if (!rule || !group) return true;

    const value = field.value.trim();

    // فیلد اختیاری و خالی → معتبر
    if (rule.optional && value === "") {
      setError(group, false);
      return true;
    }

    // خالی بودن فیلد اجباری
    if (!rule.optional && value === "") {
      setError(group, true, rule.emptyMsg);
      return false;
    }

    // بررسی Regex
    if (!rule.regex.test(value)) {
      setError(group, true, rule.invalidMsg);
      return false;
    }

    if (rule.useIsEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError(group, true, rule.invalidMsg);
        return false;
      }
      setError(group, false);
      return true;
    }

    setError(group, false);
    return true;
  }

  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  form.setAttribute("novalidate", "");
  form.addEventListener("submit", async (e) => {
    let ok = true;
    fields.forEach((field) => {
      if (rules[field.name] && !validateField(field)) ok = false;
    });
    if (!ok) e.preventDefault();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const EMAILJS_PUBLIC_KEY = "Ox4nqP-ulhk7xCzp4";
  const EMAILJS_SERVICE_ID = "service_gc6rvlr";
  const EMAILJS_TEMPLATE_HIRE = "template_nrnqxgc";
  const EMAILJS_TEMPLATE_CONTACT = "template_11ejwe6";

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.querySelector(".hire-form");
  if (!form) return; // فقط از اینجا به بعد مخصوص hire است

  const fields = form.querySelectorAll("input, select, textarea");

  function validateField(field) {
    const group = field.closest(".hire-form__group");
    if (!group) return true;

    if (!field.hasAttribute("required")) {
      group.classList.remove("is-invalid");
      return true;
    }

    const value = field.value.trim();
    const empty = field.tagName === "SELECT" ? !field.value : value === "";

    const isEnglish = document.documentElement.lang === "en";
    const requiredMsg = isEnglish
      ? "This field is required !"
      : "این قسمت باید تکمیل شود !";
    const emailMsg = isEnglish
      ? "Please enter a valid email"
      : "ایمیل معتبر وارد کنید";

    if (empty) {
      group.classList.add("is-invalid");
      const textEl = group.querySelector(".hire-input-error-text");
      if (textEl) textEl.textContent = requiredMsg;
      return false;
    }

    if (field.type === "email" || field.name === "email") {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailOk) {
        group.classList.add("is-invalid");
        const textEl = group.querySelector(".hire-input-error-text");
        if (textEl) textEl.textContent = emailMsg;
        return false;
      }
    }
    if (field.type === "checkbox" && field.name === "privacy") {
      const group = field.closest(".hire-form__group");
      if (!field.checked) {
        group.classList.add("is-invalid");
        return false;
      }
      group.classList.remove("is-invalid");
      return true;
    }
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let ok = true;
    fields.forEach((field) => {
      if (!validateField(field)) ok = false;
    });
    if (!ok) return;

    const submitBtn = form.querySelector(".hire-form__submit");
    if (submitBtn) {
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;
    }
    const isContact = form.classList.contains("contact-form");

    const templateId = isContact
      ? EMAILJS_TEMPLATE_CONTACT
      : EMAILJS_TEMPLATE_HIRE;

    const payload = isContact
      ? {
          from_name: form.fullName?.value?.trim() || "",
          subject: form.subject?.value?.trim() || "—",
          message: form.message?.value?.trim() || "",
        }
      : {
          from_name: form.fullName?.value?.trim() || "",
          from_email: form.email?.value?.trim() || "",
          project_type: form.projectType?.value || "",
          budget: form.budget?.value?.trim() || "—",
          message: form.message?.value?.trim() || "",
        };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, templateId, payload);
      form.reset();
      openSuccessModal();
    } catch (err) {
      console.error(err);
      openErrorModal();
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;
      }
    }
  });
});
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");

function openSuccessModal() {
  if (!successModal) {
    console.error("successModal پیدا نشد");
    return;
  }
  successModal.hidden = false;
  successModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function openErrorModal() {
  if (!errorModal) {
    console.error("errorModal پیدا نشد");
    return;
  }
  errorModal.hidden = false;
  errorModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeAllModals() {
  if (successModal) {
    successModal.hidden = true;
    successModal.classList.remove("is-open");
  }
  if (errorModal) {
    errorModal.hidden = true;
    errorModal.classList.remove("is-open");
  }
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeAllModals);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllModals();
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  });

  let ok = true;
  fields.forEach((field) => {
    if (!validateField(field)) ok = false;
  });
  if (!ok) return;

  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const file = window.location.pathname.split("/").pop() || "home.html";

      if (file.includes("hire")) {
        window.location.href = file.includes("-en")
          ? "hire.html"
          : "hire-en.html";
      } else if (file.includes("about")) {
        window.location.href = file.includes("-en")
          ? "about.html"
          : "about-en.html";
      } else {
        window.location.href = file.includes("-en")
          ? "home.html"
          : "home-en.html";
      }
    });
  }
});
