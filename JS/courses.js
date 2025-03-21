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
