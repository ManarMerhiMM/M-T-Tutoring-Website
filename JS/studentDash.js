document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".sidebar-menu li a");

  // Scroll smoothly to the section when clicking a menu item
  menuItems.forEach(item => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth"
        });

        // Highlight the active menu item
        menuItems.forEach(menu => menu.parentElement.classList.remove("active"));
        this.parentElement.classList.add("active");
      }
    });
  });
});
