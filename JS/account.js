if(localStorage.getItem("LoggedIn") == "false"){
    window.location.href = "index.html";
}

let Username = localStorage.getItem("curUsername");
let Password = localStorage.getItem("curPassword");
let AccountType = localStorage.getItem("curAccountType");
let Email = localStorage.getItem("curEmail");
let Major = null;

document.title = `${Username}'s Account`;

document.getElementById("usernameInput").value = Username;
document.getElementById("passwordInput").value = Password;
document.getElementById("emailInput").value = Email;
document.getElementById("accountTypeInput").value = AccountType;

if(AccountType == "student"){
    Major = localStorage.getItem("curMajor");

    let newDiv = document.createElement("div");
    newDiv.classList.add("passDiv");

    let MajorLabel = document.createElement("label");
    MajorLabel.for = "majorInput";
    MajorLabel.innerHTML = "Major:";

    let MajorField = document.createElement("input");
    MajorField.type = "text";
    MajorField.id = "majorInput";
    MajorField.readOnly = true;
    MajorField.placeholder = "Enter your major...";
    MajorField.value = Major;

    newDiv.appendChild(MajorLabel);
    newDiv.appendChild(MajorField);

    let btnDiv = document.getElementById("btnDiv");
    document.getElementById("accountDetailsForm").removeChild(btnDiv);
    document.getElementById("accountDetailsForm").appendChild(newDiv);
    document.getElementById("accountDetailsForm").append(btnDiv);
}




document.getElementById("hidePass").addEventListener("click", ()=>{
    document.getElementById("hidePass").style.display = "none";
    document.getElementById("showPass").style.display = "inline";

    document.getElementById("passwordInput").type = "text";
});

document.getElementById("showPass").addEventListener("click", ()=>{
    document.getElementById("hidePass").style.display = "inline";
    document.getElementById("showPass").style.display = "none";

    document.getElementById("passwordInput").type = "password";
});


document.getElementById("backToDashboard").addEventListener("click", ()=>{
    if(AccountType == "student"){
        window.location.href = "studentDash.html";
    }
    else{
        window.location.href = "tutorDash.html";
    }
});


document.getElementById("signout").addEventListener("click", ()=>{
    if(confirm(`Are you sure you want to sign out of "${document.getElementById("usernameInput").value}"?`)){
        localStorage.setItem("LoggedIn", "false");
        ["curEmail", "curAccountType", "curPassword", "curUsername"].forEach(item => localStorage.removeItem(item));
        if(AccountType == "student"){
            localStorage.removeItem("curMajor");
        }

        window.location.href = "login.html";
    }

});

document.querySelector(".nav-toggle span").addEventListener("click", (event) => {
    if (event.target.textContent === "☰") {
        event.target.textContent = "X";
        document.querySelector(".nav-links-burger").style.display = "flex";
    } else {
        event.target.textContent = "☰";  
        document.querySelector(".nav-links-burger").style.display = "none";
    }
});
