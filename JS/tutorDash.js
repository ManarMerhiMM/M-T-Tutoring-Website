// tutorDash.js

// Redirect if user is not logged in or not a tutor
if (!localStorage.getItem("LoggedIn") || localStorage.getItem("LoggedIn") === "false") {
    window.location.href = "index.html";
  } else if (localStorage.getItem("curAccountType") !== "tutor") {
    window.location.href = "studentDash.html";
  }
  
  // Toggle account dropdown
  const accountLink = document.getElementById("accountInNav");
  const accountDropdown = document.getElementById("nav-links-burger-1");
  if (accountLink && accountDropdown) {
    accountLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (accountDropdown.style.display === "flex") {
        accountDropdown.style.display = "none";
      } else {
        accountDropdown.style.display = "flex";
      }
    });
  }
  
  // Toggle mobile nav
  const navToggleSpan = document.querySelector(".nav-toggle span");
  const navBurger2 = document.getElementById("nav-links-burger-2");
  if (navToggleSpan && navBurger2) {
    navToggleSpan.addEventListener("click", (event) => {
      if (navBurger2.style.display === "flex") {
        navBurger2.style.display = "none";
        event.target.textContent = "☰";
      } else {
        navBurger2.style.display = "flex";
        event.target.textContent = "X";
      }
    });
  }
  
  // Sign out logic
  document.querySelectorAll(".signoutInNav").forEach((signout) => {
    signout.addEventListener("click", (event) => {
      event.preventDefault();
      const username = localStorage.getItem("curUsername") || "your account";
      if (confirm(`Are you sure you want to sign out of "${username}"?`)) {
        localStorage.setItem("LoggedIn", "false");
        ["curEmail", "curAccountType", "curPassword", "curUsername"].forEach((item) =>
          localStorage.removeItem(item)
        );
        window.location.href = "login.html";
      }
    });
  });
  
  // Dashboard logic for tutor
  document.addEventListener("DOMContentLoaded", () => {
    const classList = document.getElementById("classList");
    const requestsList = document.getElementById("requestsList");
  
    // Example data (replace with real fetch calls)
    const tutorClasses = [
      { name: "Advanced Java Programming", enrolled: 10 },
      { name: "Data Science with Python", enrolled: 7 },
    ];
  
    const studentRequests = [
      { student: "Alice", course: "Intro to C++" },
      { student: "Bob", course: "Machine Learning" },
    ];
  
    // Render tutor classes
    if (tutorClasses.length === 0) {
      classList.innerHTML = "<p>No courses to display.</p>";
    } else {
      tutorClasses.forEach((course) => {
        const item = document.createElement("div");
        item.classList.add("dashboard-item");
        item.textContent = `${course.name} - ${course.enrolled} enrolled`;
        classList.appendChild(item);
      });
    }
  
    // Render student requests
    if (studentRequests.length === 0) {
      requestsList.innerHTML = "<p>No student requests at the moment.</p>";
    } else {
      studentRequests.forEach((req) => {
        const item = document.createElement("div");
        item.classList.add("dashboard-item");
        item.textContent = `${req.student} requests help with ${req.course}`;
        requestsList.appendChild(item);
      });
    }
  });
  