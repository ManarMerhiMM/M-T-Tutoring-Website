if (!localStorage.getItem("LoggedIn")) {
    localStorage.setItem("LoggedIn", "false");
}


if (localStorage.getItem("LoggedIn") == "false") {
    let NavList = document.getElementById("NAVLIST")
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

    liToBeRemoved.forEach(li => { navBurger2.removeChild(li); });

    let loginLi = document.createElement("li");
    let logina = document.createElement("a");
    logina.textContent = "Login";
    logina.href = "login.html";

    loginLi.appendChild(logina);

    navBurger2.appendChild(loginLi);
}
else {
    document.getElementById("accountInNav").addEventListener("click", (event) => {
        event.preventDefault();
        if (window.getComputedStyle(document.getElementById("nav-links-burger-1")).display == "none") {
            document.getElementById("nav-links-burger-1").style.display = "flex";
        } else {
            document.getElementById("nav-links-burger-1").style.display = "none";
        }
    });
}


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


fetch('JS/database.json')
  .then(response => response.json())
  .then(data => {
    const courses = data.courses;

    let categoriesMap = {};

    courses.forEach(course => {
      course.category.forEach(category => {
        if (!categoriesMap[category]) {
          categoriesMap[category] = [];
        }
        categoriesMap[category].push(course.name);
      });
    });

    const categoryImages = {
      "Tech and Development": "MEDIA/courseImages/TechAndDev.webp",
      "Mathematics": "MEDIA/courseImages/Mathematics.jpg",
      "Science and Engineering": "MEDIA/courseImages/ScienceAndEngineering.jpg",
      "Business and Management": "MEDIA/courseImages/BusinessAndManagement.webp",
      "Biology and Biomedical": "MEDIA/courseImages/BiologyAndBiomedical.jpg",
      "Health and Medicine": "MEDIA/courseImages/HealthAndMedicine.jpg"
    };

    let categorySlider = document.querySelector('.category-slider');

    for (const category in categoriesMap) {
      let categorySection = document.createElement("div");
      categorySection.classList.add("category-section");

      let categoryImage = document.createElement("img");
      categoryImage.src = categoryImages[category] || "defaultImage.jpg"; 
      categoryImage.alt = `${category} image`;
      categorySection.appendChild(categoryImage);

      let categoryTitle = document.createElement("h1");
      categoryTitle.textContent = category;
      categoryTitle.classList.add("hover-underline-category");
      categoryTitle.addEventListener("click", () => {
        categoryTitle.addEventListener("click", () => {
            const section = document.getElementById(category);
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
          
              
              section.classList.add("highlighted");
          
             
              setTimeout(() => {
                section.classList.remove("highlighted");
              }, 2000);
            }
          });
          
          
      });
      categorySection.appendChild(categoryTitle);

      let courseList = document.createElement("ul");
      categoriesMap[category].forEach(courseName => {
        let courseItem = document.createElement("li");
        courseItem.textContent = courseName;
        courseItem.classList.add("hover-underline");

        courseItem.addEventListener("click", () => {
          localStorage.setItem("curCourseName", courseName);
          window.location.href = "courseDetails.html";
        });
        courseList.appendChild(courseItem);
      });
      categorySection.appendChild(courseList);

      

      categorySlider.appendChild(categorySection);

      document.getElementById("search_input_category").addEventListener("input" , function(){
            const searchValueCategory = document.getElementById("search_input_category").value.toLowerCase();
            document.querySelectorAll(".category-section").forEach(function(section){
            section.style.display = section.querySelector("h1").textContent.toLowerCase().includes(searchValueCategory) ? "block" : "none";
            });
        })

        document.getElementById("search_input_course").addEventListener("input" , function(){
            const searchValueCourse = document.getElementById("search_input_course").value.toLowerCase();
            document.querySelectorAll(".hover-underline").forEach(function(course){
              course.style.display = course.textContent.toLowerCase().includes(searchValueCourse) ? "list-item" : "none";
            })
        })
        
        const certifiedCheck = document.getElementById("certifiedCheck");

        certifiedCheck.addEventListener("change", function() {
            if(certifiedCheck.checked){
                document.querySelectorAll(".hover-underline").forEach(function(course){
                    const courseNAME = course.textContent;
                    const foundCourse = courses.find(c => c.name === courseNAME);
                    if(foundCourse.certified){
                        course.style.display = "list-item";
                    } else {
                        course.style.display = "none";
                    }
                });
            } else {
                
                document.querySelectorAll(".hover-underline").forEach(function(course){
                    course.style.display = "list-item";
                });
            }
        });
        
    
    }
    
  })
  .catch(error => {
    console.error('Error loading the courses data:', error);
  });




























