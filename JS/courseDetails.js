document.title = `M & T's ${localStorage.getItem("curCourseName")}`;

let courseName = localStorage.getItem("curCourseName");
let courseTutor;
let coursePrice;
let isCertified;
let courseDescription;
let studentsOfCourse;
let courseCategories;
let lastPagePath = localStorage.getItem("lastPage");

let Courses;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
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
            for (let i = 0; i < studentsOfCourse.length; i++) {
                if (studentsOfCourse[i] == localStorage.getItem("curUsername")) {
                    document.getElementById("enrollBtn").textContent = "Enrolled ✔";
                    document.getElementById("enrollBtn").disabled = true;
                    break;
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



document.getElementById("backAnchor").addEventListener("click", (event) => {
    event.preventDefault();

    window.location.href = lastPagePath;
});


document.getElementById("enrollBtn").addEventListener("click", () => {
    if (localStorage.getItem("LoggedIn") == "true") {
        if (localStorage.getItem("curAccountType") == "tutor") {
            alert(`Successfully recommended M & T's ${courseName}!`);
            window.location.href = lastPagePath;
        }
        else {
            if (confirm(`Are you sure you want to enroll in M & T's ${courseName}?`)) {
                window.location.href = "checkout.html";
            }
        }
    }
    else {
        alert("A guest cannot enroll in a course, you must log in first!");
        window.location.href = "login.html";
    }
});




