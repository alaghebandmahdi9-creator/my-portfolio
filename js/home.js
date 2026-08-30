// جاوااسکریپت صفحه اصلی (تغییر زبان، منوی موبایل و ...)document.addEventListener("DOMContentLoaded", ()
document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const path = window.location.pathname;
      const file = path.substring(path.lastIndexOf("/") + 1) || "index.html";
      const isEn = file.includes("-en");

      const pairs = [
        ["hire", "hire.html", "hire-en.html"],
        ["about", "about.html", "about-en.html"],
        ["contact", "contact.html", "contact-en.html"],
        ["privacy", "privacy.html", "privacy-en.html"],
        ["terms", "terms.html", "terms-en.html"],
        ["works", "works.html", "works-en.html"],
        ["project-hess", "project-hess.html", "project-hess-en.html"],
        ["project-sorena", "project-sorena.html", "project-sorena-en.html"],
        [
          "project-chobkadeh",
          "project-chobkadeh.html",
          "project-chobkadeh-en.html",
        ],
        ["project-aftab", "project-aftab.html", "project-aftab-en.html"],
        ["project-site", "project-site.html", "project-site-en.html"],
        [
          "project-typography",
          "project-typography.html",
          "project-typography-en.html",
        ],
        ["project-daruit", "project-daruit.html", "project-daruit-en.html"],
        [
          "project-magazine",
          "project-magazine.html",
          "project-magazine-en.html",
        ],
        ["home", "home.html", "home-en.html"],
        ["index", "index.html", "home-en.html"],
      ];

      const match = pairs.find(([key]) => file.includes(key));
      if (match) {
        window.location.href = isEn ? match[1] : match[2];
      } else {
        window.location.href = isEn ? "home.html" : "home-en.html";
      }
    });
  }

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("is-active");
      mobileMenu.classList.toggle("is-open");
      document.body.style.overflow = mobileMenu.classList.contains("is-open")
        ? "hidden"
        : "";
    });
  }

  if (mobileOverlay && hamburgerBtn && mobileMenu) {
    mobileOverlay.addEventListener("click", () => {
      hamburgerBtn.classList.remove("is-active");
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  }

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

  const EMAILJS_PUBLIC_KEY = "Ox4nqP-ulhk7xCzp4";
  const EMAILJS_SERVICE_ID = "service_gc6rvlr";
  const EMAILJS_TEMPLATE_HIRE = "template_nrnqxgc";
  const EMAILJS_TEMPLATE_CONTACT = "template_11ejwe6";

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.querySelector(".hire-form");
  if (form) {
    const fields = form.querySelectorAll("input, select, textarea");
    const isEnglish = document.documentElement.lang === "en";
    const requiredMsg = isEnglish
      ? "This field is required !"
      : "این قسمت باید تکمیل شود !";
    const emailMsg = isEnglish
      ? "Please enter a valid email"
      : "ایمیل معتبر وارد کنید";

    function validateField(field) {
      const group = field.closest(".hire-form__group");
      if (!group) return true;

      if (field.type === "checkbox" && field.name === "privacy") {
        if (field.hasAttribute("required") && !field.checked) {
          group.classList.add("is-invalid");
          return false;
        }
        group.classList.remove("is-invalid");
        return true;
      }

      if (!field.hasAttribute("required")) {
        group.classList.remove("is-invalid");
        return true;
      }

      const value = field.value.trim();
      const empty = field.tagName === "SELECT" ? !field.value : value === "";

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

      group.classList.remove("is-invalid");
      return true;
    }

    fields.forEach((field) => {
      field.addEventListener("input", () => validateField(field));
      field.addEventListener("change", () => validateField(field));
      field.addEventListener("blur", () => validateField(field));
    });

    const successModal = document.getElementById("successModal");
    const errorModal = document.getElementById("errorModal");

    function openSuccessModal() {
      if (!successModal) return;
      successModal.hidden = false;
      successModal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function openErrorModal() {
      if (!errorModal) return;
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
    });

    form.setAttribute("novalidate", "");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (typeof emailjs === "undefined") {
        console.error("EmailJS لود نشده است");
        openErrorModal();
        return;
      }

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
            from_email: form.email?.value?.trim() || "",
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
        console.error("EmailJS Error:", err);
        openErrorModal();
      } finally {
        if (submitBtn) {
          submitBtn.classList.remove("is-loading");
          submitBtn.disabled = false;
        }
      }
    });
  }
});
