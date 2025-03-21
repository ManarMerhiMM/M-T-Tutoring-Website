/* JS/main.js (Example) */

/**
 * Toggle the account dropdown in the top nav
 */
const accountLink = document.getElementById("accountInNav");
const accountDropdown = document.getElementById("nav-links-burger-1");

if (accountLink && accountDropdown) {
  accountLink.addEventListener("click", (event) => {
    event.preventDefault();
    // Toggle the dropdown’s display
    if (accountDropdown.style.display === "flex") {
      accountDropdown.style.display = "none";
      accountLink.textContent = "Account▼";
    } else {
      accountDropdown.style.display = "flex";
      accountLink.textContent = "Account▲";
    }
  });
}

/**
 * Toggle the mobile burger menu
 */
const burgerToggle = document.querySelector(".nav-toggle span");
const burgerMenu = document.getElementById("nav-links-burger-2");

if (burgerToggle && burgerMenu) {
  burgerToggle.addEventListener("click", () => {
    if (burgerMenu.style.display === "flex") {
      burgerMenu.style.display = "none";
      burgerToggle.textContent = "☰"; // Show burger icon
    } else {
      burgerMenu.style.display = "flex";
      burgerToggle.textContent = "X"; // Show close icon
    }
  });
}

/**
 * Signout logic (if using localStorage to track user state)
 * This example shows a confirm dialog and then resets localStorage
 */
document.querySelectorAll(".signoutInNav").forEach((signoutBtn) => {
  signoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const username = localStorage.getItem("curUsername") || "your account";
    if (confirm(`Are you sure you want to sign out of "${username}"?`)) {
      // Clear relevant localStorage items
      localStorage.removeItem("LoggedIn");
      localStorage.removeItem("curUsername");
      // ... any other keys you use

      // Redirect to a login or home page
      window.location.href = "login.html";
    }
  });
});

/**
 * Example: If you have a "Dashboard" link that should route users
 * to different dashboards based on their role (e.g. student/tutor)
 */
document.querySelectorAll(".dashBoardInNav").forEach((dashLink) => {
  dashLink.addEventListener("click", (event) => {
    event.preventDefault();
    // Suppose we store the user role in localStorage
    const userRole = localStorage.getItem("curAccountType");
    if (userRole === "student") {
      window.location.href = "studentDash.html";
    } else if (userRole === "tutor") {
      window.location.href = "tutorDash.html";
    } else {
      // fallback
      window.location.href = "index.html";
    }
  });
});
