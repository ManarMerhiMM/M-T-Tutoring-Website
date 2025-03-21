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


document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let curTestimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    let testimonialToPush = {name: "", email: "", message: ""};
    testimonialToPush.name = name.value;
    testimonialToPush.email = email.value;
    testimonialToPush.message = message.value;

    curTestimonials.push(testimonialToPush);

    localStorage.setItem("testimonials", JSON.stringify(curTestimonials));

    alert("Success!");

    name.value = "";
    email.value = "";
    message.value = "";    
});


