const T = {
  fr: {
    slogan: "Chaque pas est une victoire",
    navHome: "Accueil",
    navAbout: "À propos",
    navContact: "Contact",
    btn1: "Cancer du sein",
    btn2: "Traitement",
    btn3: "Nutrition",
    btn4: "Fertilité",
    btn5: "Dépistage",
    btn6: "Supports audio visuels éducatifs",
    foot: "Contenu basé sur les recommandations ESMO / NCCN"
  },
  en: {
    slogan: "Every step is a victory",
    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    btn1: "Breast Cancer",
    btn2: "Treatment",
    btn3: "Nutrition",
    btn4: "Fertility",
    btn5: "Screening",
    btn6: "Educational audio-visual resources",
    foot: "Content based on ESMO / NCCN recommendations"
  },
  ar: {
    slogan: "كل خطوة شفاء، وكل يوم أمل",
    navHome: "الرئيسية",
    navAbout: "حول",
    navContact: "اتصل بنا",
    btn1: "سرطان الثدي",
    btn2: "رحلة العلاج",
    btn3: "التغذية",
    btn4: "خيارات الخصوبة بكل طمأنينة",
    btn5: "الكشف المبكر",
    btn6: "محتوى مرئي و مسموع لدعمك",
    foot: "محتوى مبني على توصيات ESMO / NCCN"
  }
};

function getLang() {
  return localStorage.getItem("oncoguid_lang") || "fr";
}

function applyLang() {
  const lang = getLang();
  const t = T[lang] || T.fr;

  // Apply lang + dir
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

  // Texts
  const slogan = document.getElementById("slogan");
  if (slogan) slogan.textContent = t.slogan;

  const navHome = document.getElementById("navHome");
  const navAbout = document.getElementById("navAbout");
  const navContact = document.getElementById("navContact");

  if (navHome) navHome.textContent = t.navHome;
  if (navAbout) navAbout.textContent = t.navAbout;
  if (navContact) navContact.textContent = t.navContact;

  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  const btn4 = document.getElementById("btn4");
  const btn5 = document.getElementById("btn5");
  const btn6 = document.getElementById("btn6");

  if (btn1) btn1.textContent = t.btn1;
  if (btn2) btn2.textContent = t.btn2;
  if (btn3) btn3.textContent = t.btn3;
  if (btn4) btn4.textContent = t.btn4;
  if (btn5) btn5.textContent = t.btn5;
  if (btn6) btn6.textContent = t.btn6;

  const foot = document.getElementById("foot");
  if (foot) foot.textContent = t.foot;

  // Dropdown language select
  const sel = document.getElementById("langSelect");
  if (sel) {
    sel.value = lang;
    sel.onchange = () => {
      localStorage.setItem("oncoguid_lang", sel.value);
      window.location.reload();
    };
  }
}

function initBurger() {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  if (!burger || !links) return;
  burger.addEventListener("click", () => links.classList.toggle("open"));
}

// Run
initBurger();
applyLang();
