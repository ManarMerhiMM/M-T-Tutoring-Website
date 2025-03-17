document.title = `M & T's ${localStorage.getItem("curCourseName")}`;

let courseName = localStorage.getItem("curCourseName");
let courseTutor;
let coursePrice;
let isCertified;
let courseDescription;
let studentsOfCourse;
let courseCategories;

let Courses;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
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
        if (event.target.textContent === "Account▼") {
            event.target.textContent = "Account▲";
            document.getElementById("nav-links-burger-1").style.display = "flex";
        } else {
            event.target.textContent = "Account▼";
            document.getElementById("nav-links-burger-1").style.display = "none";
        }
    });
}


async function prepCoursePageUsingJSON() {
    try {
        const response = await fetch('JS/database.json');
        const data = await response.json();
        Courses = data.courses;
    } catch (error) {
        console.error('Error loading JSON:', error);
    }

    for (let i = 0; i < Courses.length; i++) {
        if (Courses[i].name == courseName) {
            courseTutor = Courses[i].tutor;
            coursePrice = Courses[i].price;
            courseDescription = Courses[i].description;
            isCertified = Courses[i].certified;
            studentsOfCourse = Courses[i].takenBy;
            courseCategories = Courses[i].category;
            break;
        }
    }


    document.getElementById("courseDescription").textContent = courseDescription;
    document.getElementById("tutorName").textContent = courseTutor;
    document.getElementById("coursePrice").textContent = coursePrice;
    document.getElementById("courseTitle").textContent = courseName;

    if (isCertified) {
        document.getElementById("isCertified").textContent = "✔";
        document.getElementById("isCertified").style.color = "rgb(28, 218, 54)";
    }
    else {
        document.getElementById("isCertified").textContent = "✘";
        document.getElementById("isCertified").style.color = "rgb(218, 28, 28)";
    }



    if (courseCategories.includes("Tech and Development")) {
        document.getElementById("courseCard").style.backgroundImage = `url('MEDIA/courseImages/TechAndDev.webp')`;
    }
    else if (courseCategories.includes("Mathematics")) {
        document.getElementById("courseCard").style.backgroundImage = `url('MEDIA/courseImages/Mathematics.jpg')`;
    }
    else if (courseCategories.includes("Science and Engineering")) {
        document.getElementById("courseCard").style.backgroundImage = `url('MEDIA/courseImages/ScienceAndEngineering.jpg')`;
    }
    else if (courseCategories.includes("Business and Management")) {
        document.getElementById("courseCard").style.backgroundImage = `url('MEDIA/courseImages/BusinessAndManagement.webp')`;
    }
    else if (courseCategories.includes("Biology and Biomedical")) {
        document.getElementById("courseCard").style.backgroundImage = `url('MEDIA/courseImages/BiologyAndBiomedical.jpg')`;
    }
    else {
        document.getElementById("courseCard").style.backgroundImage = "url('MEDIA/courseImages/HealthAndMedicine.jpg')";
    }

    if (localStorage.getItem("LoggedIn") == "true") {
        if (localStorage.getItem("curAccountType") == "tutor") {
            if (localStorage.getItem("curUsername") == courseTutor) {
                document.getElementById("enrollBtn").textContent = "Taught ✔";
                document.getElementById("enrollBtn").disabled = true;
            }
            else {
                document.getElementById("enrollBtn").textContent = "Recommend";
            }

        }
        else {
            let enrolled = false;
            for (let i = 0; i < studentsOfCourse.length; i++) {
                if (studentsOfCourse[i] == localStorage.getItem("curUsername")) {
                    enrolled = true;
                    document.getElementById("enrollBtn").textContent = "Enrolled ✔";
                    document.getElementById("enrollBtn").disabled = true;
                    break;
                }
            }

            if (!enrolled) {
                if ((localStorage.getItem("cartCourses") && !JSON.parse(localStorage.getItem("cartCourses")).includes(courseName)) || !localStorage.getItem("cartCourses")) {
                    document.getElementById("enrollBtn").textContent = "Add to cart";
                }
                else {
                    document.getElementById("enrollBtn").textContent = "Remove from cart";
                }
            }
        }
    }
    let courseCounter = 0;
    let j = 0;
    while (courseCounter < 6 && j < courseCategories.length) {
        for (let i = 0; i < Courses.length; i++) {
            if (Courses[i].category.includes(courseCategories[j]) && Courses[i].name != courseName) {
                let courseToAdd = document.createElement("div");
                courseToAdd.classList.add("suggestedCourse");
                let courseImgtoAdd = document.createElement("img");
                let courseHeadertoAdd = document.createElement("h3");
                courseHeadertoAdd.textContent = Courses[i].name;
                let courseBtntoAdd = document.createElement("button");
                courseBtntoAdd.classList.add("viewBtns");
                courseBtntoAdd.textContent = "View Course";
                courseToAdd.appendChild(courseHeadertoAdd);
                courseToAdd.appendChild(courseImgtoAdd);
                courseToAdd.appendChild(courseBtntoAdd);

                if (Courses[i].category.includes("Tech and Development")) {
                    courseImgtoAdd.src = "MEDIA/courseImages/TechAndDev.webp";
                }
                else if (Courses[i].category.includes("Mathematics")) {
                    courseImgtoAdd.src = "MEDIA/courseImages/Mathematics.jpg";
                }
                else if (Courses[i].category.includes("Science and Engineering")) {
                    courseImgtoAdd.src = "MEDIA/courseImages/ScienceAndEngineering.jpg";
                }
                else if (Courses[i].category.includes("Business and Management")) {
                    courseImgtoAdd.src = "MEDIA/courseImages/BusinessAndManagement.webp";
                }
                else if (Courses[i].category.includes("Biology and Biomedical")) {
                    courseImgtoAdd.src = "MEDIA/courseImages/BiologyAndBiomedical.jpg";
                }
                else {
                    courseImgtoAdd.src = "MEDIA/courseImages/HealthAndMedicine.jpg";
                }

                document.getElementById("suggestedCoursesContainer").appendChild(courseToAdd);
                courseCounter++;
                if (courseCounter >= 6) {
                    break;
                }
            }
        }
        j++;
    }

    document.querySelectorAll(".viewBtns").forEach(btn => {
        btn.addEventListener("click", (event) => {
            localStorage.setItem("curCourseName", event.target.previousElementSibling.previousElementSibling.textContent);
            window.location.href = "courseDetails.html";
        });
    });
}

prepCoursePageUsingJSON();


document.getElementById("enrollBtn").addEventListener("click", (event) => {
    if (localStorage.getItem("LoggedIn") == "true") {
        if (localStorage.getItem("curAccountType") == "tutor") {
            alert(`Successfully recommended M & T's "${courseName}"!`);
        }
        else {
            if (event.target.textContent == "Add to cart") {
                let curCart;
                if (localStorage.getItem("cartCourses")) {
                    curCart = JSON.parse(localStorage.getItem("cartCourses"));
                }
                else {
                    curCart = [];
                }


                curCart.push(courseName);
                localStorage.setItem("cartCourses", JSON.stringify(curCart));

                alert(`Successfully added "${courseName}" to cart!`);
                window.location.href = "courseDetails.html";
            }
            else {
                let curCart = JSON.parse(localStorage.getItem("cartCourses"));
                curCart.splice(curCart.indexOf(courseName), 1);
                localStorage.setItem("cartCourses", JSON.stringify(curCart));

                alert(`Successfully removed "${courseName}" from cart!`);
                window.location.href = "courseDetails.html";
            }
        }
    }
    else {
        alert("A guest cannot shop, you must log in first!");
        window.location.href = "login.html";
    }
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