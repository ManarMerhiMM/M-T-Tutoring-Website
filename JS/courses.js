document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
    try {
        const response = await fetch('JS/database.json'); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const courses = data.courses;
        const tableBody = document.querySelector("#coursesTable tbody");
        tableBody.innerHTML = ""; 

        courses.forEach(course => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.category.join(", ")}</td>
                <td>${course.tutor}</td>
                <td>${course.price}</td>
                <td>${course.takenBy.length}</td>
                <td class="${course.certified ? 'certified-yes' : 'certified-no'}">
                    ${course.certified ? "✅ Yes" : "❌ No"}
                </td>
                <td>${course.description}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading courses:", error);
    }
}


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