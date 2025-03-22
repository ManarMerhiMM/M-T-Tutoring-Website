// tutorDash.js
let studentRequests = [
  { "student": "Alice", "course": "Intro to C++" },
  { "student": "Bob", "course": "Machine Learning" },
  { "student": "Charlie", "course": "Data Structures" },
  { "student": "David", "course": "Cybersecurity" },
  { "student": "Emma", "course": "Cloud Computing" },
  { "student": "Frank", "course": "Intro to Python" },
  { "student": "Grace", "course": "Artificial Intelligence" },
  { "student": "Hannah", "course": "Database Systems" },
  { "student": "Ivan", "course": "Operating Systems" },
  { "student": "Jack", "course": "Computer Networks" },
  { "student": "Kelly", "course": "Software Engineering" },
  { "student": "Liam", "course": "Ethical Hacking" },
  { "student": "Mia", "course": "Web Development" },
  { "student": "Noah", "course": "Game Development" }
];

// Redirect if user is not logged in or not a tutor
if (!localStorage.getItem("LoggedIn") || localStorage.getItem("LoggedIn") === "false") {
    window.location.href = "index.html";
  } else if (localStorage.getItem("curAccountType") !== "tutor") {
    window.location.href = "studentDash.html";
  }
  
  document.getElementById("accountInNav").addEventListener("click", (event) => {
    event.preventDefault();
    if (window.getComputedStyle(document.getElementById("nav-links-burger-1")).display == "none") {
        document.getElementById("nav-links-burger-1").style.display = "flex";
    } else {
        document.getElementById("nav-links-burger-1").style.display = "none";
    }
});

document.querySelector(".nav-toggle span").addEventListener("click", (event) => {
  if (event.target.textContent === "☰") {
      event.target.textContent = "X";
      document.getElementById("nav-links-burger-2").style.display = "flex";
  } else {
      event.target.textContent = "☰";
      document.getElementById("nav-links-burger-2").style.display = "none";
  }
});

document.querySelectorAll(".signoutInNav").forEach(signout => {
  signout.addEventListener("click", (event) => {
      event.preventDefault();
      let AccountType = localStorage.getItem("curAccountType");
      if (confirm(`Are you sure you want to sign out of "${localStorage.getItem("curUsername")}"?`)) {
          localStorage.setItem("LoggedIn", "false");
          ["curEmail", "curAccountType", "curPassword", "curUsername"].forEach(item => localStorage.removeItem(item));
          if (AccountType == "student") {
              localStorage.removeItem("curMajor");
          }

          window.location.href = "login.html";
      }
  });
});

document.querySelectorAll(".dashBoardInNav").forEach(dashBoard => {
  dashBoard.addEventListener("click", (event) => {
      event.preventDefault();
      if (localStorage.getItem("curAccountType") == "student") {
          window.location.href = "studentDash.html";
      }
      else {
          window.location.href = "tutorDash.html";
      }
  });
});
  


let Courses;

async function fillCourses() {
  try {
      let response = await fetch('JS/database.json');
      let data = await response.json();
      Courses = data.courses;
  } catch (error) {
      console.error('Error loading JSON:', error);
  }

  let classList = document.getElementById("classList");
  let requestsList = document.getElementById("requestsList");

  // Example data (replace with real fetch calls)
  let tutorClasses = [];
  let userName = localStorage.getItem("curUsername");
  for(let i = 0; i < Courses.length; i++){
    if(Courses[i].tutor == userName){
      tutorClasses.push(Courses[i]);
    }
  }

  if (tutorClasses.length === 0) {
    classList.innerHTML = "<p>No courses to display.</p>";
  } else {
    tutorClasses.forEach((course) => {
      let item = document.createElement("div");
      item.classList.add("dashboard-item");
      item.classList.add("coursesGiven");
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


  document.querySelectorAll(".coursesGiven").forEach(item => item.addEventListener("click", (event)=>{
    localStorage.setItem("curCourseName", event.target.dataset.courseName);
    window.location.href = "courseDetails.html";
  }));
}


fillCourses();

    

  