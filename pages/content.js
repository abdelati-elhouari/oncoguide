// ---- helpers ----
function getLang() {
  return localStorage.getItem("oncoguid_lang") || "fr";
}

function getTopic() {
  const p = new URLSearchParams(window.location.search);
  return p.get("topic") || "treatment";
}

function setHtmlLangDir(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

// ---- i18n content (WHEEL-ONLY) ----
const DB = {
  fr: {
    nav: { home: "Menu", about: "À propos", contact: "Contact", change: "Changer la langue" },
    topics: {
      "breast-cancer": {
        title: "Cancer du sein",
         
         
        wheelNodes: ["Comprendre", "Signes", "Facteurs de risque", "Diagnostic", "Stades", "Questions à poser"]
      },
      "treatment": {
        title: "Parcours de traitement",
         
         
        wheelNodes: ["Chirurgie", "Chimiothérapie", "Thérapie ciblée", "Hormonothérapie", "Immunothérapie", "Radiothérapie"]
      },
      "nutrition": {
        title: "Nutrition",
         
         
        wheelNodes: ["Conseils généraux", "Protéines", "Hydratation", "Hygiène alimentaire", "Perte d’appétit", "Questions à poser"]
      },
      "fertility": {
        title: "Fertilité",
         
         
        wheelNodes: ["Pourquoi important", "Quand en parler", "Options", "Questions", "Soutien", "Ressources"]
      },
      "screening": {
        title: "Dépistage",
         
         
        wheelNodes: ["Objectif", "Examens", "Préparation", "Résultats", "Quand consulter", "Questions"]
      },
      "media": {
        title: "Supports audio visuels éducatifs",
         
         
        wheelNodes: ["Vidéos", "Audios", "PDF", "FAQ", "Témoignages", "Liens utiles"]
      }
    }
  },

  en: {
    nav: { home: "Menu", about: "About", contact: "Contact", change: "Change language" },
    topics: {
      "breast-cancer": {
        title: "Breast Cancer",
         
         
        wheelNodes: ["Overview", "Signs", "Risk factors", "Diagnosis", "Stages", "Questions"]
      },
      "treatment": {
        title: "Treatment Journey",
         
         
        wheelNodes: ["Surgery", "Chemotherapy", "Targeted therapy", "Hormone therapy", "Immunotherapy", "Radiotherapy"]
      },
      "nutrition": {
        title: "Nutrition",
         
         
        wheelNodes: ["General tips", "Protein", "Hydration", "Food safety", "Low appetite", "Questions"]
      },
      "fertility": {
        title: "Fertility",
         
         
        wheelNodes: ["Why it matters", "When to discuss", "Options", "Questions", "Support", "Resources"]
      },
      "screening": {
        title: "Screening",
         
         
        wheelNodes: ["Purpose", "Tests", "Preparation", "Results", "When to see a doctor", "Questions"]
      },
      "media": {
        title: "Educational Media",
         
         
        wheelNodes: ["Videos", "Audio", "PDF", "FAQ", "Stories", "Useful links"]
      }
    }
  },

  ar: {
    nav: { home: "القائمة", about: "حول", contact: "اتصل بنا", change: "تغيير اللغة" },
    topics: {
      "breast-cancer": {
        title: "سرطان الثدي",
         
         
        wheelNodes: ["نظرة عامة", "العلامات", "عوامل الخطورة", "التشخيص", "المراحل", "أسئلة للطبيب"]
      },
      "treatment": {
        title: "رحلة العلاج",
         
         
        wheelNodes: ["الجراحة", "العلاج الكيميائي", "العلاج الموجه", "العلاج الهرموني", "العلاج المناعي", "العلاج الإشعاعي"]
      },
      "nutrition": {
        title: "التغذية",
         
         
        wheelNodes: ["نصائح عامة", "البروتين", "الترطيب", "سلامة الغذاء", "فقدان الشهية", "أسئلة للطبيب"]
      },
      "fertility": {
        title: "الخصوبة",
         
         
        wheelNodes: ["لماذا مهم؟", "متى أتحدث؟", "خيارات", "أسئلة", "الدعم", "موارد"]
      },
      "screening": {
        title: "الكشف المبكر",
         
         
        wheelNodes: ["الهدف", "الفحوصات", "التحضير", "النتائج", "متى أراجع الطبيب؟", "أسئلة مهمة"]
      },
      "media": {
        title: "محتوى مرئي و مسموع",
         
         
        wheelNodes: ["فيديوهات", "صوتيات", "PDF", "أسئلة وأجوبة", "قصص", "روابط مفيدة"]
      }
    }
  }
};

// ---- Modal ----
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(title, text){
  modalTitle.textContent = title;
  modalBody.textContent = text;
  modal.classList.add("open");
}
function closeModal(){
  modal.classList.remove("open");
}
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

// ---- Navbar handlers ----
function initNav(langPack) {
  document.getElementById("navHome").textContent = langPack.nav.home;
  document.getElementById("navAbout").textContent = langPack.nav.about;
  document.getElementById("navContact").textContent = langPack.nav.contact;
  document.getElementById("btnChangeLang").textContent = langPack.nav.change;

  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  burger?.addEventListener("click", () => links.classList.toggle("open"));

  document.getElementById("btnChangeLang")?.addEventListener("click", () => {
    localStorage.removeItem("oncoguid_lang");
    window.location.href = "../index.html";
  });
}

// ---- Wheel renderer ----
function renderWheel(root, centerText, nodes, hintText) {
  const wheel = el("section", "wheel");
  const ring = el("div", "ring");
  wheel.appendChild(ring);

  const center = el("div", "center");
  const img = el("img", "ribbon");
  img.src = "../images/logo.jpeg";
  img.alt = "Ribbon";
  center.appendChild(img);
  center.appendChild(el("div", "center-note", centerText));
  wheel.appendChild(center);

  const pos = ["n1","n2","n3","n4","n5","n6"];

  pos.forEach((p, i) => {
    const label = nodes[i] || "";
    const btn = el("button", `node ${p}`, label);
    btn.type = "button";

    // ✅ CLICK works (mobile + desktop): opens modal
    btn.addEventListener("click", () => {
      openModal(label, "Tu peux mettre ici le contenu de ce chapitre plus tard (ou le charger depuis Excel).");
    });

    wheel.appendChild(btn);
  });

  root.appendChild(wheel);
  root.appendChild(el("p", "hint", hintText));
}

// ---- main ----
(function main(){
  const lang = getLang();
  const topic = getTopic();
  const pack = DB[lang] || DB.fr;

  setHtmlLangDir(lang);
  initNav(pack);

  const page = pack.topics[topic] || pack.topics["treatment"];
  document.getElementById("title").textContent = page.title;

  const root = document.getElementById("contentRoot");
  root.innerHTML = "";

  renderWheel(root, page.title, page.wheelNodes, page.wheelHint);
})();
function initNav(langPack)
{
  document.getElementById("navHome").textContent = langPack.nav.home;
  document.getElementById("navAbout").textContent = langPack.nav.about;
  document.getElementById("navContact").textContent = langPack.nav.contact;

  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  burger?.addEventListener("click", () => links.classList.toggle("open"));

  const sel = document.getElementById("langSelect");
  const current = localStorage.getItem("oncoguid_lang") || "fr";
  sel.value = current;

  sel.addEventListener("change", () => {
    localStorage.setItem("oncoguid_lang", sel.value);
    window.location.reload();
  });
}
