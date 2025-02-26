// localStorage.setItem("curCourseName", "Linear Algebra"); set the course
// localStorage.setItem("lastPage", "index.html"); set the last page over here so you can test the functionality of the back button or to see that the tutor is taken to the last page after bumping
document.title = `M & T's ${localStorage.getItem("curCourseName")}`;

let courseName = localStorage.getItem("curCourseName");
let courseTutor;
let coursePrice;
let isCertified;
let courseDescription;
let studentsOfCourse;
let lastPagePath = localStorage.getItem("lastPage");

let Courses;

async function updateCoursesFromDB() {
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

    if(localStorage.getItem("LoggedIn") == "true"){
        if(localStorage.getItem("curAccountType") == "tutor"){
            if(localStorage.getItem("curUsername") == courseTutor){
                document.getElementById("enrollBtn").textContent = "Taught ✔";
                document.getElementById("enrollBtn").disabled = true;
            }
            else{
                document.getElementById("enrollBtn").textContent = "Recommend";
            }
            
        }
        else{
            for(let i = 0; i < studentsOfCourse.length; i++){
                if(studentsOfCourse[i] == localStorage.getItem("curUsername")){
                    document.getElementById("enrollBtn").textContent = "Enrolled ✔";
                    document.getElementById("enrollBtn").disabled = true;
                    break;
                }
            }
        }
    }
}

updateCoursesFromDB();



document.getElementById("backAnchor").addEventListener("click", (event) => {
    event.preventDefault();

    window.location.href = lastPagePath;
});


document.getElementById("enrollBtn").addEventListener("click", ()=>{
    if(localStorage.getItem("LoggedIn") == "true"){
        if(localStorage.getItem("curAccountType") == "tutor"){
            alert(`Successfully recommended M & T's ${courseName}!`);
            window.location.href = lastPagePath;
        }
        else{
            if(confirm(`Are you sure you want to enroll in M & T's ${courseName}?`)){
                window.location.href = "checkout.html";
            }
        }
    }
    else{
        alert("A guest cannot enroll in a course, you must log in first!");
        window.location.href = "login.html";
    }
});