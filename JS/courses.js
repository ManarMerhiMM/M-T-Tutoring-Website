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
      course.category.forEach((cat) => {
        if (!categoriesMap[cat]) {
          categoriesMap[cat] = [];
        }
        categoriesMap[cat].push(course);
      });
    });
    let categoryImages = {
      "Tech and Development": "MEDIA/courseImages/TechAndDev.webp",
      Mathematics: "MEDIA/courseImages/Mathematics.jpg",
      "Science and Engineering": "MEDIA/courseImages/ScienceAndEngineering.jpg",
      "Business and Management": "MEDIA/courseImages/BusinessAndManagement.webp",
      "Biology and Biomedical": "MEDIA/courseImages/BiologyAndBiomedical.jpg",
      "Health & Medicine": "MEDIA/courseImages/HealthAndMedicine.jpg"
    };
    let MAX_VISIBLE = 3;
    let categorySlider = document.querySelector(".category-slider");
    let categorySections = {};
    Object.keys(categoriesMap).forEach((category) => {
      let allCourses = categoriesMap[category];
      let visible = MAX_VISIBLE;
      let section = document.createElement("div");
      section.classList.add("category-section");
      let img = document.createElement("img");
      img.src = categoryImages[category] || "MEDIA/courseImages/placeholder.jpg";
      img.alt = category + " image";
      section.appendChild(img);
      let h1 = document.createElement("h1");
      let titleLink = document.createElement("a");
      titleLink.classList.add("categoryTitles");
      titleLink.textContent = category;
      titleLink.href = "#" + encodeURIComponent(category);
      titleLink.addEventListener("click", (e) => {
        setTimeout(() => {
          let decodedId = decodeURIComponent(titleLink.getAttribute("href").substring(1));
          let targetHeading = document.getElementById(decodedId);
          if (targetHeading) {
            targetHeading.classList.add("section-highlight");
            setTimeout(() => {
              targetHeading.classList.remove("section-highlight");
            }, 500);
          }
        }, 300);
      });
      h1.appendChild(titleLink);
      section.appendChild(h1);
      let courseList = document.createElement("ul");
      courseList.classList.add("partial-course-list");
      section.appendChild(courseList);
      let showMoreBtn = document.createElement("button");
      showMoreBtn.classList.add("category-show-more-btn");
      section.appendChild(showMoreBtn);
      let updateCourseList = function(filterText) {
        filterText = filterText || "";
        let certifiedCheck = document.getElementById("certifiedCheck");
        let filtered = allCourses.filter(function(course) {
          return course.name.toLowerCase().indexOf(filterText) !== -1;
        });
        if (certifiedCheck && certifiedCheck.checked) {
          filtered = filtered.filter(function(course) {
            return course.certified;
          });
        }
        if (filtered.length === 0) {
          section.style.display = "none";
        } else {
          section.style.display = "";
        }
        if (visible > filtered.length) {
          visible = filtered.length;
        }
        courseList.innerHTML = "";
        filtered.slice(0, visible).forEach(function(course) {
          let li = document.createElement("li");
          li.textContent = course.name;
          li.classList.add("hover-underline");
          li.addEventListener("click", function() {
            localStorage.setItem("curCourseName", course.name);
            window.location.href = "courseDetails.html";
          });
          courseList.appendChild(li);
        });
        if (filtered.length > MAX_VISIBLE) {
          showMoreBtn.style.display = "block";
          showMoreBtn.textContent = visible >= filtered.length ? "Show Less" : "Show More";
        } else {
          showMoreBtn.style.display = "none";
        }
      };
      updateCourseList("");
      showMoreBtn.addEventListener("click", function() {
        let filterInput = document.getElementById("search_input_course");
        let filterText = filterInput ? filterInput.value.toLowerCase() : "";
        let certifiedCheck = document.getElementById("certifiedCheck");
        let filtered = allCourses.filter(function(course) {
          return course.name.toLowerCase().indexOf(filterText) !== -1;
        });
        if (certifiedCheck && certifiedCheck.checked) {
          filtered = filtered.filter(function(course) {
            return course.certified;
          });
        }
        if (visible >= filtered.length) {
          visible = MAX_VISIBLE;
        } else {
          visible = Math.min(visible + MAX_VISIBLE, filtered.length);
        }
        updateCourseList(filterText);
      });
      categorySlider.appendChild(section);
      categorySections[category] = {
        update: updateCourseList,
        section: section,
        reset: function() {
          visible = MAX_VISIBLE;
        }
      };
    });
    let applyFilters = function() {
      let courseFilterInput = document.getElementById("search_input_course");
      let catFilterInput = document.getElementById("search_input_category");
      let courseFilter = courseFilterInput ? courseFilterInput.value.toLowerCase() : "";
      let catFilter = catFilterInput ? catFilterInput.value.toLowerCase() : "";
      Object.keys(categorySections).forEach(function(catKey) {
        let cs = categorySections[catKey];
        cs.reset();
        cs.update(courseFilter);
        if (catFilter !== "" && catKey.toLowerCase().indexOf(catFilter) === -1) {
          cs.section.style.display = "none";
        }
      });
    };
    let searchInputCourse = document.getElementById("search_input_course");
    if (searchInputCourse) {
      searchInputCourse.addEventListener("input", applyFilters);
    }
    let searchInputCategory = document.getElementById("search_input_category");
    if (searchInputCategory) {
      searchInputCategory.addEventListener("input", applyFilters);
    }
    let certifiedCheck = document.getElementById("certifiedCheck");
    if (certifiedCheck) {
      certifiedCheck.addEventListener("change", applyFilters);
    }
  })
  .catch((error) => {
    console.error("Error loading the courses data:", error);
  });
