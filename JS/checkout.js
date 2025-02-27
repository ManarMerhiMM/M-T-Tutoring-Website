// Course data object
if(localStorage.getItem("LoggedIn") == "false"){
    window.location.href = "index.html";
}

const courseData = {
    name: "Machine Learning",
    category: ["Science and Engineering", "Tech and Development"],
    tutor: "MoonlightEcho77",
    price: "459$",
    takenBy: ["Himynameis88"],
    certified: false,
    description: "The Machine Learning course explores the fundamentals of machine learning, covering key concepts such as supervised and unsupervised learning, neural networks, decision trees, and model evaluation. Students will gain hands-on experience with real-world applications using Python and frameworks like TensorFlow and Scikit-Learn."
};

// Select elements to update
const courseBox = document.querySelector(".course-box");
const labels = courseBox.querySelectorAll("label");

// Update labels with course data
labels[0].textContent = courseData.name;
labels[1].textContent = courseData.price;
labels[2].textContent = courseData.certified ? "Yes" : "No";

// Description Button Functionality
document.getElementById("Description_btn").addEventListener("click", function () {
    courseBox.style.display = "none";

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("course-description-box");

    descriptionDiv.innerHTML = `
        <p><strong>Course Name:</strong> ${courseData.name}</p>
        <p><strong>Category:</strong> ${courseData.category.join(", ")}</p>
        <p><strong>Tutor:</strong> ${courseData.tutor}</p>
        <p><strong>Description:</strong> ${courseData.description}</p>
        <button id="Back_btn">Back</button>
    `;

    document.querySelector(".container").appendChild(descriptionDiv);

    document.getElementById("Back_btn").addEventListener("click", function () {
        descriptionDiv.remove();
        courseBox.style.display = "block";
    });
});

// Buy Button Functionality
document.getElementById("Buy_btn").addEventListener("click", function () {
    courseBox.style.display = "none";

    const buyDiv = document.createElement("div");
    buyDiv.classList.add("course-description-box"); // Same styling as description box

    buyDiv.innerHTML = `
        <p><strong>Are you sure you want to buy this course?</strong></p>
        <p><strong>Course Name:</strong> ${courseData.name}</p>
        <p><strong>Price:</strong> ${courseData.price}</p>
        <p><strong>Certified:</strong> ${courseData.certified ? "Yes" : "No"}</p>
        <button id="ConfirmBuy">Confirm</button>
        <button id="Back_btn">Back</button>
    `;

    document.querySelector(".container").appendChild(buyDiv);

    document.getElementById("Back_btn").addEventListener("click", function () {
        buyDiv.remove();
        courseBox.style.display = "block";
    });

    document.getElementById("ConfirmBuy").addEventListener("click", function () {
        alert("Course purchased successfully!");
        buyDiv.remove();
        courseBox.style.display = "block";
    });
});
