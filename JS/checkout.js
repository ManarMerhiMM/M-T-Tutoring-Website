
if (!localStorage.getItem("LoggedIn") || localStorage.getItem("LoggedIn") === "false") {
    window.location.href = "index.html";
  } else if (localStorage.getItem("curAccountType") === "tutor") {
    window.location.href = "index.html";
  }

  document.getElementById("email").value = localStorage.getItem("curEmail");
  document.getElementById("fullName").value = localStorage.getItem("curUsername");
  document.getElementById("accountInNav").addEventListener("click", (event) => {
    event.preventDefault();
    let burger1 = document.getElementById("nav-links-burger-1");
    burger1.style.display = (burger1.style.display === "flex") ? "none" : "flex";
  });
  
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
  

  document.addEventListener("DOMContentLoaded", async () => {
    let listContainer = document.querySelector(".listContainer");
    let totalPriceLabel = document.querySelector(".totalPriceLabel");
    let clearAllBtn = document.getElementById("clearAll_btn");
    let buyBtn = document.getElementById("buy_btn");
  
    let cartCourses = JSON.parse(localStorage.getItem("cartCourses")) || [];
    let totalPrice = 0;
    let coursesData = [];
  
    async function fetchCourses() {
      try {
        let response = await fetch("JS/database.json");
        let data = await response.json();
        coursesData = data.courses;
        renderCart();
      } catch (error) {
        console.error("Error loading JSON:", error);
        listContainer.innerHTML = "<p>Error loading courses.</p>";
      }
    }
  
    function renderCart() {
      listContainer.innerHTML = "";
      totalPrice = 0;
  
      if (cartCourses.length === 0) {
        listContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceLabel.textContent = "Total Price: $0";
        return;
      }
  
      cartCourses.forEach((courseName) => {
        let course = coursesData.find((c) => c.name === courseName);
        if (!course) return;
  
        let courseItem = document.createElement("div");
        courseItem.classList.add("courseDetails");
  
        let titleLabel = document.createElement("label");
        titleLabel.classList.add("courseNames");
        titleLabel.textContent = course.name;
  
        let priceLabel = document.createElement("label");
        priceLabel.classList.add("priceLabel");
        priceLabel.textContent = `$${parseFloat(
          course.price.replace("$", "")
        ).toFixed(2)}`;
  
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove_btn");
        removeBtn.dataset.courseName = course.name;
  
        courseItem.appendChild(titleLabel);
        courseItem.appendChild(priceLabel);
        courseItem.appendChild(removeBtn);
        listContainer.appendChild(courseItem);
  
        totalPrice += parseFloat(course.price.replace("$", ""));
      });
  
      totalPriceLabel.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  
      document.querySelectorAll(".courseNames").forEach((course) =>
        course.addEventListener("click", (event) => {
          localStorage.setItem("curCourseName", event.target.textContent);
          window.location.href = "courseDetails.html";
        })
      );
    }
  
    listContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove_btn")) {
        let courseName = event.target.dataset.courseName;
        cartCourses = cartCourses.filter((c) => c !== courseName);
        localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
        renderCart();
      }
    });
  
    clearAllBtn.addEventListener("click", () => {
      cartCourses = [];
      localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
      renderCart();
    });
  

    buyBtn.addEventListener("click", (event) => {
      event.preventDefault();
  

      let fullName = document.getElementById("fullName");
      let email = document.getElementById("email");
      let phone = document.getElementById("phone");
      let address = document.getElementById("address");
  
      if (!fullName.value || !email.value || !phone.value || !address.value) {
        alert("Please fill out all required fields before buying!");
        return;
      }
  

      window.location.href = "https://apps.whish.money";
    });
  
    fetchCourses();
  });
  