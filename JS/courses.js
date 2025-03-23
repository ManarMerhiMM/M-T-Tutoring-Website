if (!localStorage.getItem("LoggedIn")) {
    localStorage.setItem("LoggedIn", "false");
  }
  
  if (localStorage.getItem("LoggedIn") === "false") {
    let NavList = document.getElementById("NAVLIST");
    NavList.removeChild(document.getElementById("accountDiv"));
    NavList.removeChild(document.getElementById("cartLI"));
  
    let lastLi = document.createElement("li");
    let lasta = document.createElement("a");
    lasta.href = "login.html";
    lasta.textContent = "Login";
    lastLi.appendChild(lasta);
    NavList.appendChild(lastLi);
  
    let liToBeRemoved = document.querySelectorAll(".toRemoveWhenNotLoggedIn");
    let navBurger2 = document.getElementById("nav-links-burger-2");
  
    liToBeRemoved.forEach((li) => {
      navBurger2.removeChild(li);
    });
  
    let loginLi = document.createElement("li");
    let logina = document.createElement("a");
    logina.textContent = "Login";
    logina.href = "login.html";
  
    loginLi.appendChild(logina);
    navBurger2.appendChild(loginLi);
  } else {
    document.getElementById("accountInNav").addEventListener("click", (event) => {
      event.preventDefault();
      let burger1 = document.getElementById("nav-links-burger-1");
      burger1.style.display = burger1.style.display === "flex" ? "none" : "flex";
    });
  }
  
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
  
  document.querySelectorAll(".signoutInNav").forEach((signout) => {
    signout.addEventListener("click", (event) => {
      event.preventDefault();
      let AccountType = localStorage.getItem("curAccountType");
      if (
        confirm(`Are you sure you want to sign out of "${localStorage.getItem("curUsername")}"?`)
      ) {
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
  
  fetch("JS/database.json")
    .then((response) => response.json())
    .then((data) => {
      let courses = data.courses;
      let categoriesMap = {};
  
      
      courses.forEach((course) => {
        course.category.forEach((category) => {
          if (!categoriesMap[category]) {
            categoriesMap[category] = [];
          }
          categoriesMap[category].push(course.name);
        });
      });
  

      let categoryImages = {
        "Tech and Development": "MEDIA/courseImages/TechAndDev.webp",
        Mathematics: "MEDIA/courseImages/Mathematics.jpg",
        "Science and Engineering": "MEDIA/courseImages/ScienceAndEngineering.jpg",
        "Business and Management": "MEDIA/courseImages/BusinessAndManagement.webp",
        "Biology and Biomedical": "MEDIA/courseImages/BiologyAndBiomedical.jpg",
        "Health & Medicine": "MEDIA/courseImages/HealthAndMedicine.jpg",
      };
  
      let categorySlider = document.querySelector(".category-slider");
  
     
      for (let category in categoriesMap) {

        let categorySection = document.createElement("div");
        categorySection.classList.add("category-section");
  

        let categoryImage = document.createElement("img");
        categoryImage.src = categoryImages[category] || "MEDIA/courseImages/placeholder.jpg";
        categoryImage.alt = `${category} image`;
        categorySection.appendChild(categoryImage);
  

        let categoryTitle = document.createElement("h1");
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        let MAX_VISIBLE = 3;
        let allCoursesInCategory = categoriesMap[category];
        let partialCourses = allCoursesInCategory.slice(0, MAX_VISIBLE);
        let hiddenCourses = allCoursesInCategory.slice(MAX_VISIBLE);
  

        let partialUl = document.createElement("ul");
        partialUl.classList.add("partial-course-list");
        partialCourses.forEach((courseName) => {
          let courseItem = document.createElement("li");
          courseItem.textContent = courseName;
          courseItem.classList.add("hover-underline");
          courseItem.addEventListener("click", () => {
            localStorage.setItem("curCourseName", courseName);
            window.location.href = "courseDetails.html";
          });
          partialUl.appendChild(courseItem);
        });
        categorySection.appendChild(partialUl);
  

        let hiddenUl = document.createElement("ul");
        hiddenUl.classList.add("hidden-course-list");
        hiddenCourses.forEach((courseName) => {
          let courseItem = document.createElement("li");
          courseItem.textContent = courseName;
          courseItem.classList.add("hover-underline");
          courseItem.addEventListener("click", () => {
            localStorage.setItem("curCourseName", courseName);
            window.location.href = "courseDetails.html";
          });
          hiddenUl.appendChild(courseItem);
        });
        categorySection.appendChild(hiddenUl);
  

        if (hiddenCourses.length > 0) {
          let showMoreBtn = document.createElement("button");
          showMoreBtn.classList.add("category-show-more-btn");
          showMoreBtn.textContent = "Show More";
  
          showMoreBtn.addEventListener("click", () => {
            if (hiddenUl.style.display === "none" || hiddenUl.style.display === "") {
              hiddenUl.style.display = "block";
              showMoreBtn.textContent = "Show Less";
            } else {
              hiddenUl.style.display = "none";
              showMoreBtn.textContent = "Show More";
            }
          });
  
          categorySection.appendChild(showMoreBtn);
        }
  
        categorySlider.appendChild(categorySection);
      }


      document.getElementById("search_input_category").addEventListener("input", function () {
        let searchValueCategory = this.value.toLowerCase();
        document.querySelectorAll(".category-section").forEach(function (section) {
          let title = section.querySelector("h1").textContent.toLowerCase();
          section.style.display = title.includes(searchValueCategory) ? "block" : "none";
        });
      });

      document.getElementById("search_input_course").addEventListener("input", function () {
        let searchValueCourse = this.value.toLowerCase();
        document.querySelectorAll(".hover-underline").forEach(function (course) {
          course.style.display = course.textContent.toLowerCase().includes(searchValueCourse)
            ? "list-item"
            : "none";
        });
      });
  

      let certifiedCheck = document.getElementById("certifiedCheck");
      certifiedCheck.addEventListener("change", function () {
        if (certifiedCheck.checked) {

          document.querySelectorAll(".hover-underline").forEach(function (course) {
            let courseNAME = course.textContent;
            let foundCourse = courses.find((c) => c.name === courseNAME);
            if (foundCourse && foundCourse.certified) {
              course.style.display = "list-item";
            } else {
              course.style.display = "none";
            }
          });
        } else {

          document.querySelectorAll(".hover-underline").forEach(function (course) {
            course.style.display = "list-item";
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error loading the courses data:", error);
    });
  


















