// main.js - Home Page Scripts for M&T Tutoring

// Auto-Scroll Featured Courses (Carousel Effect)

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

// Ensure this script runs after your DOM content loads
// document.addEventListener('DOMContentLoaded', () => {
//     const navToggle = document.querySelector('.nav-toggle');
//     const navLinks = document.querySelector('.nav-links');
  
//     navToggle.addEventListener('click', () => {
//       navToggle.classList.toggle('active');
//       navLinks.classList.toggle('active');
//     });
//   });


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