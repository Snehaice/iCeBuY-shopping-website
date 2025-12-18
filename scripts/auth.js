// Form Elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showLoginBtn = document.getElementById("showLogin");
const showSignupBtn = document.getElementById("showSignup");

const toSignup = document.getElementById("toSignup");
const toLogin = document.getElementById("toLogin");

// Toggle Forms
function showLogin() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    showLoginBtn.classList.add("active");
    showSignupBtn.classList.remove("active");
}
function showSignup() {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    showSignupBtn.classList.add("active");
    showLoginBtn.classList.remove("active");
}

showLoginBtn.addEventListener("click", showLogin);
showSignupBtn.addEventListener("click", showSignup);
toSignup.addEventListener("click", showSignup);
toLogin.addEventListener("click", showLogin);

// Password Toggle
function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// ================= SIGNUP =================
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirmPassword").value;

    // Basic Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){ alert("Invalid email"); return; }
    if(password.length < 8){ alert("Password must be 8+ characters"); return; }
    if(password !== confirm){ alert("Passwords do not match"); return; }

    // Save User
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.some(u=>u.email===email)){ alert("Email already registered"); return; }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    showLogin();
});

// ================= LOGIN =================
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email===email && u.password===password);

    if(user){
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert(`Welcome, ${user.name}!`);
        window.location.href = "index.html"; // Redirect to home
    } else {
        alert("Invalid email or password");
    }
});
