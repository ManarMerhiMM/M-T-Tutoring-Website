if (!localStorage.getItem("LoggedIn") || localStorage.getItem("LoggedIn") === "false") {
  window.location.href = "index.html";
} else if (localStorage.getItem("curAccountType") !== "student") {
  window.location.href = "tutorDash.html";
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


  let firstIndex;
  let secondIndex;
  let thirdIndex;
  let fourthIndex;
  let fifthIndex;
  let sixthIndex;




  let myCoursesSection = document.getElementById("courseList");
  let suggestedCoursesSection = document.getElementById("upcomingSessions");
  let studentMajor = localStorage.getItem("curMajor");

  let myCourses = [];
  let suggestedCourses = [];

  for(let i = 0; i < Courses.length; i++){
    if(Courses[i].takenBy.includes(localStorage.getItem("curUsername"))){
      myCourses.push(Courses[i]);
      continue;
    }

    if(studentMajor == "CCE" || studentMajor == "MECH"){
      if(Courses[i].category.includes("Tech and Development") || Courses[i].category.includes("Mathematics") || Courses[i].category.includes("Science and Engineering")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "BUSI"){
      if(Courses[i].category.includes("Mathematics") || Courses[i].category.includes("Business and Management")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "ELECT"){
      if(Courses[i].category.includes("Mathematics") || Courses[i].category.includes("Science and Engineering")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "CS"){
      if(Courses[i].category.includes("Tech and Development") || Courses[i].category.includes("Mathematics")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "MANAGE"){
      if(Courses[i].category.includes("Business and Management")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "BIOM"){
      if(Courses[i].category.includes("Tech and Development") || Courses[i].category.includes("Biology and Biomedical") || Courses[i].category.includes("Science and Engineering")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "BIO"){
      if(Courses[i].category.includes("Biology and Biomedical") || Courses[i].category.includes("Health & Medicine")){
        suggestedCourses.push(Courses[i]);
      }
    }
    else if(studentMajor == "PSYCH"){
      if(Courses[i].category.includes("Health & Medicine")){
        suggestedCourses.push(Courses[i]);
      }
    }
  }




if(suggestedCourses.length > 6){
  firstIndex = Math.floor(Math.random() * suggestedCourses.length);

    do {
      secondIndex = Math.floor(Math.random() * suggestedCourses.length);
  } while (secondIndex === firstIndex);

  do {
    thirdIndex = Math.floor(Math.random() * suggestedCourses.length);
  } while (thirdIndex === firstIndex || thirdIndex === secondIndex);

  do {
    fourthIndex = Math.floor(Math.random() * suggestedCourses.length);
  } while (fourthIndex === firstIndex || fourthIndex === secondIndex || fourthIndex === thirdIndex);

  do {
    fifthIndex = Math.floor(Math.random() * suggestedCourses.length);
  } while (fifthIndex === firstIndex || fifthIndex === secondIndex || fifthIndex === thirdIndex || fifthIndex === fourthIndex);

  do {
    sixthIndex = Math.floor(Math.random() * suggestedCourses.length);
  } while (sixthIndex === firstIndex || sixthIndex === secondIndex || sixthIndex === thirdIndex || sixthIndex === fourthIndex || sixthIndex === fifthIndex);


  suggestedCourses = [suggestedCourses[firstIndex], suggestedCourses[secondIndex], suggestedCourses[thirdIndex], suggestedCourses[fourthIndex], suggestedCourses[fifthIndex], suggestedCourses[sixthIndex]];
}


  


  for (let i = 0; i < myCourses.length; i++) {
      let article = document.createElement("article");
      article.classList.add("course-card");

      myCoursesSection.appendChild(article);

      let courseThumbnail = document.createElement("div");
      courseThumbnail.classList.add("course-thumbnail");

      article.appendChild(courseThumbnail);

      let courseImg = document.createElement("img");

      if (myCourses[i].category.includes("Tech and Development")) {
          courseImg.src = `MEDIA/courseImages/TechAndDev.webp`;
          courseImg.alt = "Tech and development image";
      }
      else if (myCourses[i].category.includes("Mathematics")) {
          courseImg.src = `MEDIA/courseImages/Mathematics.jpg`;
          courseImg.alt = "Mathematics image";
      }
      else if (myCourses[i].category.includes("Science and Engineering")) {
          courseImg.src = `MEDIA/courseImages/ScienceAndEngineering.jpg`;
          courseImg.alt = "Science and Engineering image";
      }
      else if (myCourses[i].category.includes("Business and Management")) {
          courseImg.src = `MEDIA/courseImages/BusinessAndManagement.webp`;
          courseImg.alt = "Business and Management image";
      }
      else if (myCourses[i].category.includes("Biology and Biomedical")) {
          courseImg.src = `MEDIA/courseImages/BiologyAndBiomedical.jpg`;
          courseImg.alt = "Biology and Biomedical image";
      }
      else {
          courseImg.src = "MEDIA/courseImages/HealthAndMedicine.jpg";
          courseImg.alt = "Health and Medicine image";
      }

      courseThumbnail.appendChild(courseImg);

      let contentContainer = document.createElement("div");
      contentContainer.classList.add("course-content");

      article.appendChild(contentContainer);


      let title = document.createElement("h3");
      title.textContent = myCourses[i].name;
      contentContainer.appendChild(title);

      let viewCourseBtn = document.createElement("button");
      viewCourseBtn.dataset.courseName = myCourses[i].name;
      viewCourseBtn.classList.add("btn");
      viewCourseBtn.classList.add("btn-secondary");
      viewCourseBtn.classList.add("viewCourseBtn");
      viewCourseBtn.textContent = "View Course";
      contentContainer.appendChild(viewCourseBtn);

  }

  for (let i = 0; i < suggestedCourses.length; i++) {
    let article = document.createElement("article");
    article.classList.add("course-card");

    suggestedCoursesSection.appendChild(article);

    let courseThumbnail = document.createElement("div");
    courseThumbnail.classList.add("course-thumbnail");

    article.appendChild(courseThumbnail);

    let courseImg = document.createElement("img");

    if (suggestedCourses[i].category.includes("Tech and Development")) {
        courseImg.src = `MEDIA/courseImages/TechAndDev.webp`;
        courseImg.alt = "Tech and development image";
    }
    else if (suggestedCourses[i].category.includes("Mathematics")) {
        courseImg.src = `MEDIA/courseImages/Mathematics.jpg`;
        courseImg.alt = "Mathematics image";
    }
    else if (suggestedCourses[i].category.includes("Science and Engineering")) {
        courseImg.src = `MEDIA/courseImages/ScienceAndEngineering.jpg`;
        courseImg.alt = "Science and Engineering image";
    }
    else if (suggestedCourses[i].category.includes("Business and Management")) {
        courseImg.src = `MEDIA/courseImages/BusinessAndManagement.webp`;
        courseImg.alt = "Business and Management image";
    }
    else if (suggestedCourses[i].category.includes("Biology and Biomedical")) {
        courseImg.src = `MEDIA/courseImages/BiologyAndBiomedical.jpg`;
        courseImg.alt = "Biology and Biomedical image";
    }
    else {
        courseImg.src = "MEDIA/courseImages/HealthAndMedicine.jpg";
        courseImg.alt = "Health and Medicine image";
    }

    courseThumbnail.appendChild(courseImg);

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("course-content");

    article.appendChild(contentContainer);


    let title = document.createElement("h3");
    title.textContent = suggestedCourses[i].name;
    contentContainer.appendChild(title);

    let viewCourseBtn = document.createElement("button");
    viewCourseBtn.dataset.courseName = suggestedCourses[i].name;
    viewCourseBtn.classList.add("btn");
    viewCourseBtn.classList.add("btn-secondary");
    viewCourseBtn.classList.add("viewCourseBtn");
    viewCourseBtn.textContent = "View Course";
    contentContainer.appendChild(viewCourseBtn);

}

  document.querySelectorAll(".viewCourseBtn").forEach(btn => btn.addEventListener("click", (event) => {
      localStorage.setItem("curCourseName", event.target.dataset.courseName);
      window.location.href = "courseDetails.html";
  }));

}


fillCourses();
