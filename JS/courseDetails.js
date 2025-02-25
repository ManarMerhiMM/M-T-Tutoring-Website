let courseName = localStorage.getItem("curCourseName");
let courseTutor = localStorage.getItem("curCourseTutor");
let coursePrice = localStorage.getItem("curCoursePrice");
let isCertifiedCourse = localStorage.getItem("curCourseCertified");
let courseDescription = localStorage.getItem("curCourseDescription");
let lastPagePath = localStorage.getItem("lastPage");

document.title = `M & T's ${courseName}`;

document.getElementById("backAnchor").addEventListener("click", (event)=>{
    event.preventDefault();

    window.location.href = lastPagePath;
})