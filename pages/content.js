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

// ---- i18n content (WHEEL-ONLY for every pill) ----
const DB = {
  fr: {
    nav: { home: "Menu", about: "À propos", contact: "Contact", change: "Changer la langue" },
    topics: {
      "breast-cancer": {
        title: "Cancer du sein",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Comprendre", "Signes", "Facteurs de risque", "Diagnostic", "Stades", "Questions à poser"]
      },
      "treatment": {
        title: "Parcours de traitement",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Chirurgie", "Chimiothérapie", "Thérapie ciblée", "Hormonothérapie", "Immunothérapie", "Radiothérapie"]
      },
      "nutrition": {
        title: "Nutrition",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Conseils généraux", "Protéines", "Hydratation", "Hygiène alimentaire", "Perte d’appétit", "Questions à poser"]
      },
      "fertility": {
        title: "Fertilité",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Pourquoi important", "Quand en parler", "Options", "Questions", "Soutien", "Ressources"]
      },
      "screening": {
        title: "Dépistage",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Objectif", "Examens", "Préparation", "Résultats", "Quand consulter", "Questions"]
      },
      "media": {
        title: "Supports audio visuels éducatifs",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Vidéos", "Audios", "PDF", "FAQ", "Témoignages", "Liens utiles"]
      }
    }
  },

  en: {
    nav: { home: "Menu", about: "About", contact: "Contact", change: "Change language" },
    topics: {
      "breast-cancer": {
        title: "Breast Cancer",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Overview", "Signs", "Risk factors", "Diagnosis", "Stages", "Questions"]
      },
      "treatment": {
        title: "Treatment Journey",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Surgery", "Chemotherapy", "Targeted therapy", "Hormone therapy", "Immunotherapy", "Radiotherapy"]
      },
      "nutrition": {
        title: "Nutrition",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["General tips", "Protein", "Hydration", "Food safety", "Low appetite", "Questions"]
      },
      "fertility": {
        title: "Fertility",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Why it matters", "When to discuss", "Options", "Questions", "Support", "Resources"]
      },
      "screening": {
        title: "Screening",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Purpose", "Tests", "Preparation", "Results", "When to see a doctor", "Questions"]
      },
      "media": {
        title: "Educational Media",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["Videos", "Audio", "PDF", "FAQ", "Stories", "Useful links"]
      }
    }
  },

  ar: {
    nav: { home: "القائمة", about: "حول", contact: "اتصل بنا", change: "تغيير اللغة" },
    topics: {
      "breast-cancer": {
        title: "سرطان الثدي",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["نظرة عامة", "العلامات", "عوامل الخطورة", "التشخيص", "المراحل", "أسئلة للطبيب"]
      },
      "treatment": {
        title: "رحلة العلاج",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["الجراحة", "العلاج الكيميائي", "العلاج الموجه", "العلاج الهرموني", "العلاج المناعي", "العلاج الإشعاعي"]
      },
      "nutrition": {
        title: "التغذية",
        wheelCenter: "OncoGuide",
         
        wheelNodes: ["نصائح عامة", "البروتين", "الترطيب", "سلامة الغذاء", "فقدان الشهية", "أسئلة للطبيب"]
      },
      "fertility": {
        title: "الخصوبة",
        wheelCenter: "OncoGuide",
      
        wheelNodes: ["لماذا مهم؟", "متى أتحدث؟", "خيارات", "أسئلة", "الدعم", "موارد"]
      },
      "screening": {
        title: "الكشف المبكر",
        wheelCenter: "OncoGuide",
        
        wheelNodes: ["الهدف", "الفحوصات", "التحضير", "النتائج", "متى أراجع الطبيب؟", "أسئلة مهمة"]
      },
      "media": {
        title: "محتوى مرئي و مسموع",
        wheelCenter: "OncoGuide",
    
        wheelNodes: ["فيديوهات", "صوتيات", "PDF", "أسئلة وأجوبة", "قصص", "روابط مفيدة"]
      }
    }
  }
};

// ---- renderer (wheel) ----
function renderWheel(root, centerText, nodes, hintText, topic) {
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

  // 6 positions like your design
  const pos = ["n1","n2","n3","n4","n5","n6"];

  pos.forEach((p, i) => {
    const label = nodes[i] || "";
    const btn = el("button", `node ${p}`, label);
    btn.type = "button";

    // When click: open same content page but with subtopic (optional)
    // Example: content.html?topic=treatment&item=0
    btn.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.set("topic", topic);
      url.searchParams.set("item", String(i));
      window.location.href = url.toString();
    });

    wheel.appendChild(btn);
  });

  root.appendChild(wheel);
  root.appendChild(el("p", "hint", hintText));
}

// ---- navbar handlers ----
function initNav(langPack) {
  document.getElementById("navHome").textContent = langPack.nav.home;
  document.getElementById("navAbout").textContent = langPack.nav.about;
  document.getElementById("navContact").textContent = langPack.nav.contact;
  document.getElementById("btnChangeLang").textContent = langPack.nav.change;

  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", () => links.classList.toggle("open"));

  document.getElementById("btnChangeLang").addEventListener("click", () => {
    localStorage.removeItem("oncoguid_lang");
    window.location.href = "../index.html";
  });
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

  // Render wheel for ALL topics (no paragraphs)
  renderWheel(root, page.title, page.wheelNodes, page.wheelHint, topic);
})();
