// i18n
const lang = localStorage.getItem("oncoguid_lang") || "ar";

const TXT = {
  ar: {
    title: "رحلة العلاج",
    hint: "اضغط على أي خيار لعرض معلوماته.",
    centerNote: "رحمة أمحج",
    navHome: "الرئيسية",
    navAbout: "حول",
    navContact: "اتصل بنا",
    change: "تغيير اللغة",
    nodes: ["الجراحة", "العلاج الكيميائي", "العلاج الموجه", "العلاج الهرموني", "العلاج المناعي", "العلاج الإشعاعي"]
  },
  fr: {
    title: "Parcours de traitement",
    hint: "Clique sur un élément pour afficher ses informations.",
    centerNote: "OncoGuide",
    navHome: "Accueil",
    navAbout: "À propos",
    navContact: "Contact",
    change: "Changer la langue",
    nodes: ["Chirurgie", "Chimiothérapie", "Thérapie ciblée", "Hormonothérapie", "Immunothérapie", "Radiothérapie"]
  },
  en: {
    title: "Treatment Journey",
    hint: "Click an item to see its information.",
    centerNote: "OncoGuide",
    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    change: "Change language",
    nodes: ["Surgery", "Chemotherapy", "Targeted therapy", "Hormone therapy", "Immunotherapy", "Radiotherapy"]
  }
};

const t = TXT[lang] || TXT.ar;

// Apply html lang/dir
document.documentElement.lang = lang;
document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

// Navbar text
document.getElementById("navHome").textContent = t.navHome;
document.getElementById("navAbout").textContent = t.navAbout;
document.getElementById("navContact").textContent = t.navContact;
document.getElementById("btnChangeLang").textContent = t.change;

// Page text
document.getElementById("title").textContent = t.title;
document.getElementById("hint").textContent = t.hint;
document.getElementById("centerNote").textContent = t.centerNote;

// Nodes
["n1","n2","n3","n4","n5","n6"].forEach((id, i) => {
  const el = document.getElementById(id);
  el.textContent = t.nodes[i];
  el.addEventListener("click", () => {
    alert(t.nodes[i]);
  });
});

// Burger
const burger = document.getElementById("navBurger");
const links = document.getElementById("navLinks");
burger.addEventListener("click", () => links.classList.toggle("open"));

// Change language
document.getElementById("btnChangeLang").addEventListener("click", () => {
  localStorage.removeItem("oncoguid_lang");
  window.location.href = "../index.html"; // adapte si besoin
});
