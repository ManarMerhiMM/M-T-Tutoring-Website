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












// Fetch the data from the external JSON file
fetch('JS/database.json')
  .then(response => response.json())  // Parse the JSON data
  .then(data => {
    const courses = data.courses;  // Access the courses array from the JSON data

    // Create an object to store courses by categories
    let categoriesMap = {};

    // Loop through the courses and group them by category
    courses.forEach(course => {
      // Loop through each category in the course (it can have multiple categories)
      course.category.forEach(category => {
        if (!categoriesMap[category]) {
          categoriesMap[category] = [];
        }
        categoriesMap[category].push(course.name);
      });
    });

    // Object to hold category images (adjust the images as needed)
    const categoryImages = {
      "Tech and Development": "MEDIA/courseImages/TechAndDev.webp",
      "Mathematics": "MEDIA/courseImages/Mathematics.jpg",
      "Science and Engineering": "MEDIA/courseImages/ScienceAndEngineering.jpg",
      "Business and Management": "MEDIA/courseImages/BusinessAndManagement.webp",
      "Biology and Biomedical": "MEDIA/courseImages/BiologyAndBiomedical.jpg",
      "Health and Medicine": "MEDIA/courseImages/HealthAndMedicine.jpg"
    };

    // Get the category slider container
    let categorySlider = document.querySelector('.category-slider');

    // Loop through each category in the categoriesMap and create a section for it
    for (const category in categoriesMap) {
      // Create a category section
      let categorySection = document.createElement("div");
      categorySection.classList.add("category-section");

      // Add category image (if it exists in the categoryImages map)
      let categoryImage = document.createElement("img");
      categoryImage.src = categoryImages[category] || "defaultImage.jpg";  // Default if no image is found
      categoryImage.alt = `${category} image`;
      categorySection.appendChild(categoryImage);

      // Add category name as a title
      let categoryTitle = document.createElement("h2");
      categoryTitle.textContent = category;
      categorySection.appendChild(categoryTitle);

      // Create a list to display course names
      let courseList = document.createElement("ul");
      categoriesMap[category].forEach(courseName => {
        let courseItem = document.createElement("li");
        courseItem.textContent = courseName;
        courseList.appendChild(courseItem);
      });
      categorySection.appendChild(courseList);

      // Create a view courses button (optional)
      let viewCourseBtn = document.createElement("button");
      viewCourseBtn.textContent = "View Courses";
      categorySection.appendChild(viewCourseBtn);

      // Append the category section to the slider
      categorySlider.appendChild(categorySection);
    }
  })
  .catch(error => {
    console.error('Error loading the courses data:', error);
  });















//let myCoursesSection = document.querySelector("main");

// Fetch JSON file
/*          fetch("JS/database.json")
  .then(response => response.json())
  .then(data => {
      let myCourses = data.courses; // Extract courses array

      for (let i = 0; i < myCourses.length; i++) {
          let article = document.createElement("article");
          article.classList.add("course-card");

          myCoursesSection.appendChild(article);

          let contentContainer = document.createElement("div");
          contentContainer.classList.add("course-content");
          article.appendChild(contentContainer);

          // Course Name
          let title = document.createElement("h3");
          title.textContent = myCourses[i].name;
          contentContainer.appendChild(title);

          // Course Category
          let category = document.createElement("p");
          category.innerHTML = `<strong>Category:</strong> ${myCourses[i].category.join(", ")}`;
          contentContainer.appendChild(category);
      }
  })
  .catch(error => console.error("Error loading courses:", error));
  */
