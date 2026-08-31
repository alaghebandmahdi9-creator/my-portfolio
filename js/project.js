document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("page-project")) return;

  const currentId = body.getAttribute("data-project-id");
  const backBtn = document.getElementById("projectBackBtn");
  const worksBtn = document.getElementById("projectWorksBtn");
  const nextBtn = document.getElementById("projectNextBtn");
  const isEn = document.documentElement.lang === "en";

  const projects = [
    { id: "magazine", url: "project-magazine.html" },
    { id: "sorena", url: "project-sorena.html" },
    { id: "chobkadeh", url: "project-chobkadeh.html" },
    { id: "aftab", url: "project-aftab.html" },
    { id: "site", url: "project-site.html" },
    { id: "hess", url: "project-hess.html" },
    { id: "typography", url: "project-typography.html" },
    { id: "darvit", url: "project-daruit.html" },
  ];

  const KEY_FROM_NEXT = "projectNavFromNext";

  function toLangUrl(url) {
    if (!isEn) return url;
    return url.replace(".html", "-en.html");
  }

  const params = new URLSearchParams(window.location.search);
  const fromParam = params.get("from"); // "home" | "works"

  if (fromParam === "home" || fromParam === "works") {
    sessionStorage.setItem("projectBackTo", fromParam);
    sessionStorage.removeItem("projectNavFromNext");
  }

  const fromNext = sessionStorage.getItem("projectNavFromNext") === "1";
  const backTo = sessionStorage.getItem("projectBackTo") || "works";

  if (fromNext) {
    if (backBtn) backBtn.classList.add("is-hidden");
    if (worksBtn) worksBtn.hidden = false;
  } else {
    if (backBtn) {
      backBtn.classList.remove("is-hidden");
      const homePage = isEn ? "home-en.html" : "home.html";
      const worksPage = isEn ? "works-en.html" : "works.html";
      backBtn.href = backTo === "home" ? homePage : worksPage;
    }
    if (worksBtn) worksBtn.hidden = true;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      sessionStorage.setItem(KEY_FROM_NEXT, "1");

      const index = projects.findIndex((p) => p.id === currentId);
      const nextIndex = index === -1 ? 0 : (index + 1) % projects.length;
      const next = projects[nextIndex];

      window.location.href = toLangUrl(next.url);
    });
  }
});
