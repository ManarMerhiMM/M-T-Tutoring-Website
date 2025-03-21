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

        

    } catch (error) {
        console.error("Error loading courses:", error);
    }
}
