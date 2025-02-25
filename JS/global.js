// main.js - Global Scripts for M&T Tutoring Website

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Sticky Navbar Effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Course Card Hover Effect (Optional - Can Be Styled in CSS)
document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s ease-in-out";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});

// Future Enhancements: Additional scripts for user authentication, pop-ups, and interactivity can be added here.

