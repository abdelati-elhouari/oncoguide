const T = {
  fr: {
    slogan: "Chaque pas est une victoire",
    navHome: "Accueil",
    navAbout: "À propos",
    navContact: "Contact",
    change: "Changer la langue",
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
    change: "Change language",
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
    change: "تغيير اللغة",
    btn1: "سرطان الثدي",
    btn2: "رحلة العلاج",
    btn3: "التغذية",
    btn4: "خيارات الخصوبة بكل طمأنينة",
    btn5: "الكشف المبكر",
    btn6: "محتوى مرئي و مسموع لدعمك",
    foot: "محتوى مبني على توصيات ESMO / NCCN"
  }
};

const lang = localStorage.getItem("oncoguid_lang") || "fr";
const t = T[lang] || T.fr;

// Apply lang + dir
document.documentElement.lang = lang;
document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

// Texts
document.getElementById("slogan").textContent = t.slogan;

document.getElementById("navHome").textContent = t.navHome;
document.getElementById("navAbout").textContent = t.navAbout;
document.getElementById("navContact").textContent = t.navContact;
document.getElementById("btnChangeLang").textContent = t.change;

document.getElementById("btn1").textContent = t.btn1;
document.getElementById("btn2").textContent = t.btn2;
document.getElementById("btn3").textContent = t.btn3;
document.getElementById("btn4").textContent = t.btn4;
document.getElementById("btn5").textContent = t.btn5;
document.getElementById("btn6").textContent = t.btn6;

document.getElementById("foot").textContent = t.foot;

// Burger menu
const burger = document.getElementById("navBurger");
const links = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  links.classList.toggle("open");
});

// Change language
document.getElementById("btnChangeLang").addEventListener("click", () => {
  localStorage.removeItem("oncoguid_lang");
  window.location.href = "../index.html"; // adapte si ton index est ailleurs
});
