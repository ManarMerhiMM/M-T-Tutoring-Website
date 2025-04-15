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


document.getElementById("coursePrice").addEventListener("keydown", function (e) {
  if (e.key === "-" || e.keyCode === 189) {
    alert("Budget must be positive!");
    e.preventDefault();
  }
});

fetch("JS/database.json")
  .then((response) => response.json())
  .then((data) => {
    let courses = data.courses;

    let mathSlider = document.getElementById("mathContainer");
    let techSlider = document.getElementById("techContainer");
    let scienceSlider = document.getElementById("scienceContainer");
    let businessSlider = document.getElementById("businessContainer");
    let biologySlider = document.getElementById("biologyContainer");
    let healthSlider = document.getElementById("healthContainer");

    let mathH1 = document.getElementById("MathematicsH1");
    let mathP = document.getElementById("MathematicsP");
    let techH1 = document.getElementById("TechH1");
    let techP = document.getElementById("TechP");
    let scienceH1 = document.getElementById("ScienceH1");
    let scienceP = document.getElementById("ScienceP");
    let businessH1 = document.getElementById("BusinessH1");
    let businessP = document.getElementById("BusinessP");
    let biologyH1 = document.getElementById("BiologyH1");
    let biologyP = document.getElementById("BiologyP");
    let healthH1 = document.getElementById("HealthH1");
    let healthP = document.getElementById("HealthP");

    let mathFilter = document.getElementById("Math");
    let techFilter = document.getElementById("Tech");
    let scienceFilter = document.getElementById("Science");
    let businessFilter = document.getElementById("Business");
    let biologyFilter = document.getElementById("Biology");
    let healthFilter = document.getElementById("Health");


    function displayFiltered(name, certified, price) {
      mathSlider.style.display = "flex";
      mathH1.style.display = "block";
      mathP.style.display = "block";
      techSlider.style.display = "flex";
      techH1.style.display = "block";
      techP.style.display = "block";
      scienceSlider.style.display = "flex";
      scienceH1.style.display = "block";
      scienceP.style.display = "block";
      businessSlider.style.display = "flex";
      businessH1.style.display = "block";
      businessP.style.display = "block";
      biologySlider.style.display = "flex";
      biologyH1.style.display = "block";
      biologyP.style.display = "block";
      healthSlider.style.display = "flex";
      healthH1.style.display = "block";
      healthP.style.display = "block";

      if (mathFilter.checked || techFilter.checked || scienceFilter.checked || businessFilter.checked || biologyFilter.checked || healthFilter.checked) {
        if (!mathFilter.checked) {
          mathSlider.style.display = "none";
          mathH1.style.display = "none";
          mathP.style.display = "none";
        }

        if (!techFilter.checked) {
          techSlider.style.display = "none";
          techH1.style.display = "none";
          techP.style.display = "none";
        }

        if (!scienceFilter.checked) {
          scienceSlider.style.display = "none";
          scienceH1.style.display = "none";
          scienceP.style.display = "none";
        }

        if (!businessFilter.checked) {
          businessSlider.style.display = "none";
          businessH1.style.display = "none";
          businessP.style.display = "none";
        }

        if (!biologyFilter.checked) {
          biologySlider.style.display = "none";
          biologyH1.style.display = "none";
          biologyP.style.display = "none";
        }

        if (!healthFilter.checked) {
          healthSlider.style.display = "none";
          healthH1.style.display = "none";
          healthP.style.display = "none";
        }
      }

      document.querySelectorAll(".category-slider").forEach(slider => {
        if (window.getComputedStyle(slider).display === "none") {
          return;
        }

        let courseCount = 0;
        slider.innerHTML = "";

        for (let i = 0; i < courses.length; i++) {
          if (courses[i].category.includes(slider.dataset.category) && (price == "" || parseFloat(courses[i].price) <= price) && (!certified || courses[i].certified) && courses[i].name.toLowerCase().includes(name.toLowerCase())) {
            courseCount++;
            let article = document.createElement("article");
            article.classList.add("course-card");

            slider.appendChild(article);

            let courseThumbnail = document.createElement("div");
            courseThumbnail.classList.add("course-thumbnail");

            article.appendChild(courseThumbnail);

            let courseImg = document.createElement("img");

            if (courses[i].category.includes("Tech and Development")) {
              courseImg.src = `MEDIA/courseImages/TechAndDev.webp`;
              courseImg.alt = "Tech and development image";
            }
            else if (courses[i].category.includes("Mathematics")) {
              courseImg.src = `MEDIA/courseImages/Mathematics.jpg`;
              courseImg.alt = "Mathematics image";
            }
            else if (courses[i].category.includes("Science and Engineering")) {
              courseImg.src = `MEDIA/courseImages/ScienceAndEngineering.jpg`;
              courseImg.alt = "Science and Engineering image";
            }
            else if (courses[i].category.includes("Business and Management")) {
              courseImg.src = `MEDIA/courseImages/BusinessAndManagement.webp`;
              courseImg.alt = "Business and Management image";
            }
            else if (courses[i].category.includes("Biology and Biomedical")) {
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
            title.textContent = courses[i].name;
            contentContainer.appendChild(title);

            let viewCourseBtn = document.createElement("button");
            viewCourseBtn.dataset.courseName = courses[i].name;
            viewCourseBtn.classList.add("btn");
            viewCourseBtn.classList.add("btn-secondary");
            viewCourseBtn.classList.add("viewCourseBtn");
            viewCourseBtn.textContent = "View Course";
            contentContainer.appendChild(viewCourseBtn);
          }
        }


        if(courseCount == 0){
          slider.style.display = "none";
          document.getElementById(slider.dataset.h1).style.display = "none";
          document.getElementById(slider.dataset.p).style.display = "none";
        }
      });

      document.querySelectorAll(".viewCourseBtn").forEach(btn => btn.addEventListener("click", (event) => {
        localStorage.setItem("curCourseName", event.target.dataset.courseName);
        window.location.href = "courseDetails.html";
      }));
    }

    displayFiltered(document.getElementById("courseName").value, document.getElementById("certifiedCheck").checked, document.getElementById("coursePrice").value);

    document.querySelectorAll("#Math, #Tech, #Science, #Business, #Biology, #Health").forEach(category => category.addEventListener("change", () => {
      displayFiltered(document.getElementById("courseName").value, document.getElementById("certifiedCheck").checked, document.getElementById("coursePrice").value);
    }));

    document.getElementById("courseName").addEventListener("input", () => {
      displayFiltered(
        document.getElementById("courseName").value,
        document.getElementById("certifiedCheck").checked,
        document.getElementById("coursePrice").value
      );
    });

    document.getElementById("coursePrice").addEventListener("input", () => {
      displayFiltered(
        document.getElementById("courseName").value,
        document.getElementById("certifiedCheck").checked,
        document.getElementById("coursePrice").value
      );
    });

    document.getElementById("certifiedCheck").addEventListener("change", () => {
      displayFiltered(document.getElementById("courseName").value, document.getElementById("certifiedCheck").checked, document.getElementById("coursePrice").value);
    });

  })
  .catch((error) => {
    console.error("Error loading the courses data:", error);
  });
