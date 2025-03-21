let Accounts;

async function updateAccountsFromDB() {
    try {
        const response = await fetch('JS/database.json');
        const data = await response.json();
        Accounts = data.accounts;
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

document.getElementById("hidePass").addEventListener("click", () => {
    document.getElementById("hidePass").style.display = "none";
    document.getElementById("showPass").style.display = "inline";

    document.getElementById("passwordInput").type = "text";
});

document.getElementById("showPass").addEventListener("click", () => {
    document.getElementById("hidePass").style.display = "inline";
    document.getElementById("showPass").style.display = "none";

    document.getElementById("passwordInput").type = "password";
});


document.getElementById("hidePass2").addEventListener("click", () => {
    document.getElementById("hidePass2").style.display = "none";
    document.getElementById("showPass2").style.display = "inline";

    document.getElementById("passwordInput2").type = "text";
});

document.getElementById("showPass2").addEventListener("click", () => {
    document.getElementById("hidePass2").style.display = "inline";
    document.getElementById("showPass2").style.display = "none";

    document.getElementById("passwordInput2").type = "password";
});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (document.getElementById("usernameInput").value != "" && document.getElementById("passwordInput").value != "") {
        if (confirm(`Are you sure you want to proceed ${document.getElementById("usernameInput").value}?`)) {
            await updateAccountsFromDB();
            let isFound = false;
            let UsernameIdx = -1;
            for (let i = 0; i < Accounts.length; i++) {
                if (Accounts[i].Username == document.getElementById("usernameInput").value) {
                    isFound = true;
                    UsernameIdx = i;
                    break;
                }
            }

            if (isFound) {
                if (Accounts[UsernameIdx].Password == document.getElementById("passwordInput").value) {
                    if (Accounts[UsernameIdx].Banned) {
                        alert("This account has been banned.");
                        document.querySelectorAll("input").forEach(input => { input.value = "" });
                    }
                    else {
                        alert(`Success! Welcome ${document.getElementById("usernameInput").value}!`);
                        localStorage.setItem("curUsername", `${Accounts[UsernameIdx].Username}`);
                        localStorage.setItem("curPassword", `${Accounts[UsernameIdx].Password}`);
                        localStorage.setItem("curEmail", `${Accounts[UsernameIdx].Email}`);
                        localStorage.setItem("curAccountType", `${Accounts[UsernameIdx].AccountType}`);
                        if (Accounts[UsernameIdx].AccountType == "student") {
                            localStorage.setItem("curMajor", `${Accounts[UsernameIdx].major}`);
                        }
                        else {
                            localStorage.removeItem("curMajor");
                        }
                        localStorage.setItem("LoggedIn", "true");
                        window.location.href = "index.html";
                    }

                }
                else {
                    alert("Incorrect username or password!");
                    document.querySelectorAll("input").forEach(input => { input.value = "" });
                }
            }
            else {
                alert("This account does not exist!");
                document.querySelectorAll("input").forEach(input => { input.value = "" });
            }
        }
        else {
            document.querySelectorAll("input").forEach(input => { input.value = "" });
        }


    }
    else {
        alert("Please enter both a username and a password!");
    }
});

document.getElementById("signupInstead").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "flex";

    document.querySelectorAll("input").forEach(input => { input.value = ""; });
});

document.getElementById("loginInstead").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("signupForm").style.display = "none";
    document.querySelectorAll("input").forEach(input => { input.value = ""; });
});

document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (document.getElementById("usernameInput2").value != "" && document.getElementById("passwordInput2").value != "" && document.getElementById("passwordInput3").value != "" && document.getElementById("emailInput").value != "") {
        if (document.getElementById("passwordInput2").value === document.getElementById("passwordInput3").value) {
            if (confirm(`Are you sure you want to create ${document.getElementById("usernameInput2").value}?`)) {
                await updateAccountsFromDB();
                let isFoundUsername = false;
                let isFoundEmail = false;
                for (let i = 0; i < Accounts.length; i++) {
                    if (Accounts[i].Username == document.getElementById("usernameInput2").value) {
                        isFoundUsername = true;
                        break;
                    }

                    if (Accounts[i].Email == document.getElementById("emailInput").value) {
                        isFoundEmail = true;
                        break;
                    }
                }

                if (isFoundEmail || isFoundUsername) {
                    alert("This account already exists, try a different email/username!");
                    document.querySelectorAll("input").forEach(input => { input.value = ""; });
                }
                else {
                    alert("Success!");
                    document.getElementById("loginForm").style.display = "flex";
                    document.getElementById("signupForm").style.display = "none";
                    document.querySelectorAll("input").forEach(input => { input.value = ""; });
                }
            }
            else {
                document.querySelectorAll("input").forEach(input => { input.value = ""; });
            }
        }
        else {
            alert("Your password must match!");
            document.querySelectorAll("input").forEach(input => { input.value = ""; });
        }
    }
    else {
        alert("All fields are mandatory!");
    }
});



document.getElementById("backBtn1").addEventListener("click", () => {
    window.location.href = "index.html";
});


document.getElementById("backBtn2").addEventListener("click", () => {
    window.location.href = "index.html";
});
