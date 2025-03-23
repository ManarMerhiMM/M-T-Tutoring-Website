


let navToggle = document.querySelector(".nav-toggle");
let navLinks = document.querySelector(".nav-links");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        let target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


window.addEventListener("scroll", () => {
    let navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s ease-in-out";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});



