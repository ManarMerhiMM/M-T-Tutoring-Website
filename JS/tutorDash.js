// tutorDash.js

let studentRequests = [
    { student: "Alice", course: "Intro to C++" },
    { student: "Bob", course: "Machine Learning" },
    { student: "Charlie", course: "Data Structures" },
    { student: "David", course: "Cybersecurity" },
    { student: "Emma", course: "Cloud Computing" },
    { student: "Frank", course: "Intro to Python" },
    { student: "Grace", course: "Artificial Intelligence" },
    { student: "Hannah", course: "Database Systems" },
    { student: "Ivan", course: "Operating Systems" },
    { student: "Jack", course: "Computer Networks" },
    { student: "Kelly", course: "Software Engineering" },
    { student: "Liam", course: "Ethical Hacking" },
    { student: "Mia", course: "Web Development" },
    { student: "Noah", course: "Game Development" }
  ];
  
  // Redirect if user is not logged in or not a tutor
  if (!localStorage.getItem("LoggedIn") || localStorage.getItem("LoggedIn") === "false") {
    window.location.href = "index.html";
  } else if (localStorage.getItem("curAccountType") !== "tutor") {
    window.location.href = "studentDash.html";
  }
  
  // Toggle account dropdown
  document.getElementById("accountInNav").addEventListener("click", (event) => {
    event.preventDefault();
    let burger1 = document.getElementById("nav-links-burger-1");
    burger1.style.display = (burger1.style.display === "flex") ? "none" : "flex";
  });
  
  // Toggle mobile nav
  document.querySelector(".nav-toggle span").addEventListener("click", (event) => {
    let navBurger2 = document.getElementById("nav-links-burger-2");
    if (event.target.textContent === "☰") {
      event.target.textContent = "X";
      navBurger2.style.display = "flex";
    } else {
      event.target.textContent = "☰";
      navBurger2.style.display = "none";
    }
  });
  
  // Sign out logic
  document.querySelectorAll(".signoutInNav").forEach((signout) => {
    signout.addEventListener("click", (event) => {
      event.preventDefault();
      let AccountType = localStorage.getItem("curAccountType");
      if (confirm(`Are you sure you want to sign out of "${localStorage.getItem("curUsername")}"?`)) {
        localStorage.setItem("LoggedIn", "false");
        ["curEmail", "curAccountType", "curPassword", "curUsername"].forEach((item) =>
          localStorage.removeItem(item)
        );
        if (AccountType === "student") {
          localStorage.removeItem("curMajor");
        }
        window.location.href = "login.html";
      }
    });
  });
  
  // Dashboard or not
  document.querySelectorAll(".dashBoardInNav").forEach((dashBoard) => {
    dashBoard.addEventListener("click", (event) => {
      event.preventDefault();
      if (localStorage.getItem("curAccountType") === "student") {
        window.location.href = "studentDash.html";
      } else {
        window.location.href = "tutorDash.html";
      }
    });
  });
  
  let Courses;
  
  // Load courses from database.json
  async function fillCourses() {
    try {
      let response = await fetch("JS/database.json");
      let data = await response.json();
      Courses = data.courses;
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  
    let classList = document.getElementById("classList");
    let requestsList = document.getElementById("requestsList");
  
    // Identify tutor's classes
    let tutorClasses = [];
    let userName = localStorage.getItem("curUsername");
    if (Courses && Array.isArray(Courses)) {
      for (let i = 0; i < Courses.length; i++) {
        if (Courses[i].tutor === userName) {
          tutorClasses.push(Courses[i]);
        }
      }
    }
  
    // Render tutor classes
    if (tutorClasses.length === 0) {
      classList.innerHTML = "<p>No courses to display.</p>";
    } else {
      tutorClasses.forEach((course) => {
        let item = document.createElement("div");
        item.classList.add("dashboard-item", "coursesGiven");
        item.dataset.courseName = course.name;
        item.textContent = `${course.name} - ${course.takenBy.length} enrolled`;
        classList.appendChild(item);
      });
    }
  
    // Render student requests
    if (studentRequests.length === 0) {
      requestsList.innerHTML = "<p>No student requests at the moment.</p>";
    } else {
      studentRequests.forEach((req) => {
        let item = document.createElement("div");
        item.classList.add("dashboard-item");
        item.textContent = `${req.student} requests help with ${req.course}`;
        requestsList.appendChild(item);
      });
    }
  
    // On click of a course in "My Courses", go to courseDetails
    document.querySelectorAll(".coursesGiven").forEach((item) => {
      item.addEventListener("click", (event) => {
        localStorage.setItem("curCourseName", event.target.dataset.courseName);
        window.location.href = "courseDetails.html";
      });
    });
  }
  
  fillCourses();
  