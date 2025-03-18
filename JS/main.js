if(!localStorage.getItem("LoggedIn")){
    localStorage.setItem("LoggedIn", "false");
}


if(localStorage.getItem("LoggedIn") == "false"){
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

    liToBeRemoved.forEach(li => {navBurger2.removeChild(li);});

    let loginLi = document.createElement("li");
    let logina = document.createElement("a");
    logina.textContent = "Login";
    logina.href = "login.html";

    loginLi.appendChild(logina);

    navBurger2.appendChild(loginLi);
}
else{
    document.getElementById("accountInNav").addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.textContent === "Account▼") {
            event.target.textContent = "Account▲";
            document.getElementById("nav-links-burger-1").style.display = "flex";
        } else {
            event.target.textContent = "Account▼";  
            document.getElementById("nav-links-burger-1").style.display = "none";
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});


const courseContainer = document.querySelector(".courses-grid");
if (courseContainer) {
    let scrollAmount = 0;
    function autoScrollCourses() {
        if (scrollAmount < courseContainer.scrollWidth - courseContainer.clientWidth) {
            scrollAmount += 2; // Adjust speed
        } else {
            scrollAmount = 0;
        }
        courseContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
    setInterval(autoScrollCourses, 100);
}

// Testimonials Slider (If Applicable)
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.style.display = i === index ? "block" : "none";
    });
}

if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000); // Change testimonial every 5 seconds
}

// Hero Section Animation on Scroll
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    if (hero && window.scrollY > 50) {
        hero.style.opacity = "0.8";
        hero.style.transition = "opacity 0.5s ease-in-out";
    } else if (hero) {
        hero.style.opacity = "1";
    }
});

// Future Enhancements: Dynamic content fetching, interactive elements, API integration for course updates.
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
            links.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
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

document.querySelectorAll(".signoutInNav").forEach(signout => {signout.addEventListener("click", (event)=>{
    event.preventDefault();
    let AccountType = localStorage.getItem("curAccountType");
    if(confirm(`Are you sure you want to sign out of "${localStorage.getItem("curUsername")}"?`)){
        localStorage.setItem("LoggedIn", "false");
        ["curEmail", "curAccountType", "curPassword", "curUsername"].forEach(item => localStorage.removeItem(item));
        if(AccountType == "student"){
            localStorage.removeItem("curMajor");
        }

        window.location.href = "login.html";
    }
});});

document.querySelectorAll(".dashBoardInNav").forEach(dashBoard=>{dashBoard.addEventListener("click", (event)=>{
    event.preventDefault();
    if(localStorage.getItem("curAccountType") == "student"){
        window.location.href = "studentDash.html";
    }
    else{
        window.location.href = "tutorDash.html";
    }
});});

let testimonialsSection = document.querySelector(".testimonials-section");
let currentTestimonials = JSON.parse(localStorage.getItem("testimonials")) || [];

if(currentTestimonials.length == 0){
    testimonialsSection.remove();
}
else if(currentTestimonials.length == 1){
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("testimonials-grid");
    
    testimonialsSection.appendChild(mainContainer);

    let theArticle = document.createElement("article");
    theArticle.classList.add("testimonial-card");

    mainContainer.appendChild(theArticle);

    let block = document.createElement("blockquote")
    theArticle.appendChild(block);

    let review = document.createElement("p");
    review.textContent = currentTestimonials[0].message;

    block.appendChild(review);

    let theCite = document.createElement("cite");
    theCite.textContent = `- ${currentTestimonials[0].name}`;

    theArticle.appendChild(theCite);
}
else{
    let firstIndex = Math.floor(Math.random() * currentTestimonials.length);
    let secondIndex;

    do {
        secondIndex = Math.floor(Math.random() * currentTestimonials.length);
    } while (secondIndex === firstIndex);

    let testimonialsToAppend = [currentTestimonials[firstIndex], currentTestimonials[secondIndex]];

    let mainContainer = document.createElement("div");
    mainContainer.classList.add("testimonials-grid");
    testimonialsSection.appendChild(mainContainer);

    for(let i = 0; i < 2; i++){
        let theArticle = document.createElement("article");
        theArticle.classList.add("testimonial-card");

        mainContainer.appendChild(theArticle);

        let block = document.createElement("blockquote")
        theArticle.appendChild(block);

        let review = document.createElement("p");
        review.textContent = testimonialsToAppend[i].message;

        block.appendChild(review);

        let theCite = document.createElement("cite");
        theCite.textContent = `- ${testimonialsToAppend[i].name}`;

        theArticle.appendChild(theCite);
    }
}


async function getRandomCoursesForDisplayUsingJSON() {
    let Courses;

    try {
        const response = await fetch('JS/database.json');
        const data = await response.json();
        Courses = data.courses;
    } catch (error) {
        console.error('Error loading JSON:', error);
    }


    let firstIndex = Math.floor(Math.random() * Courses.length);
    let secondIndex;
    let thirdIndex;

    do {
        secondIndex = Math.floor(Math.random() * Courses.length);
    } while (secondIndex === firstIndex);

    do {
        thirdIndex = Math.floor(Math.random() * Courses.length);
    } while (thirdIndex === firstIndex || thirdIndex === secondIndex);

    let coursesToDisplay = [Courses[firstIndex], Courses[secondIndex], Courses[thirdIndex]];
    let grid = document.querySelector(".course-grid");

    for(let i = 0; i < 3; i++){
        let article = document.createElement("article");
        article.classList.add("course-card");

        grid.appendChild(article);

        let courseThumbnail = document.createElement("div");
        courseThumbnail.classList.add("course-thumbnail");

        article.appendChild(courseThumbnail);

        let courseImg = document.createElement("img");
         
        if (coursesToDisplay[i].category.includes("Tech and Development")) {
            courseImg.src = `MEDIA/courseImages/TechAndDev.webp`;
            courseImg.alt = "Tech and development image";
        }
        else if (coursesToDisplay[i].category.includes("Mathematics")) {
            courseImg.src = `MEDIA/courseImages/Mathematics.jpg`;
            courseImg.alt = "Mathematics image";
        }
        else if (coursesToDisplay[i].category.includes("Science and Engineering")) {
            courseImg.src = `MEDIA/courseImages/ScienceAndEngineering.jpg`;
            courseImg.alt = "Science and Engineering image";
        }
        else if (coursesToDisplay[i].category.includes("Business and Management")) {
            courseImg.src = `MEDIA/courseImages/BusinessAndManagement.webp`;
            courseImg.alt = "Business and Management image";
        }
        else if (coursesToDisplay[i].category.includes("Biology and Biomedical")) {
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
        title.textContent = coursesToDisplay[i].name;
        contentContainer.appendChild(title);

        let viewCourseBtn = document.createElement("button");
        viewCourseBtn.dataset.courseName = coursesToDisplay[i].name;
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

getRandomCoursesForDisplayUsingJSON();