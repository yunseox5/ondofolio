const toggler = document.querySelector(".toggler");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");
const projectTabBtns = document.querySelectorAll(".project-tab-item");
const projectGridItems = document.querySelectorAll(".project-grid-item");

toggler.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.remove("nav-item-active"));
    this.classList.add("nav-item-active");
    navLinks.classList.toggle("active");
  });
});

projectTabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    projectTabBtns.forEach((btn) =>
      btn.classList.remove("project-tab-item-active")
    );
    this.classList.add("project-tab-item-active");

    projectGridItems.forEach((item) => {
      if (item.classList.contains(btn.id)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});
