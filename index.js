// Burger menu
const burger = document.getElementById("navBurger");
const links = document.getElementById("navLinks");
burger?.addEventListener("click", () => links.classList.toggle("open"));

// Change language button (force return to language selection page)
document.getElementById("btnChangeLang")?.addEventListener("click", () => {
  localStorage.removeItem("oncoguid_lang");
  // si tu es déjà sur la page langue, juste refresh
  window.location.href = "./index.html";
});

// Language select buttons
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    localStorage.setItem("oncoguid_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    // redirection vers menu
    window.location.href = "./pages/menu.html";
  });
});
