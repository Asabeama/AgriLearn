import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCyv-j76TI1QXWTqeYFH1F5WA83axx1hUI",
	authDomain: "agrilean-b9bc0.firebaseapp.com",
	projectId: "agrilean-b9bc0",
	storageBucket: "agrilean-b9bc0.firebasestorage.app",
	messagingSenderId: "240144089166",
	appId: "1:240144089166:web:3ef3b8332855ab195a431f",
	measurementId: "G-BM99L1DF56",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Signup
// const userType = document.getElementById("userType").value;
// const farmSize = document.getElementById("farmSize").value;

document.getElementById("signupButton")?.addEventListener("click", () => {
	const email = document.getElementById("signupEmail").value;
	const password = document.getElementById("signupPassword").value;
	const confirmPassword = document.getElementById("confirmPassword").value;

	if (email === "") {
		alert("Email is required");
		return;
	}
	if (password === "") {
		alert("Password is required");
		return;
	}

	if (password !== confirmPassword) {
		alert("Passwords do not match");
		return;
	}

	if (password.length < 8) {
		alert("Password should be more than 8 characters long");
	}

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// User signed in
			const user = userCredential.user;
			console.log("user =>", user);
			alert("User account created successfully, please login!");
			window.location.href = "login.html";
		})
		.catch((error) => {
			// Handle errors
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("Error =>", errorMessage, errorCode);
			alert(errorMessage);
		});
});

document.getElementById("loginButton")?.addEventListener("click", () => {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	if (email === "") {
		alert("Email is required");
		return;
	}
	if (password === "") {
		alert("Password is required");
		return;
	}

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// User signed in
			const user = userCredential.user;
			console.log(user);
			localStorage.setItem("accessToken", user?.accessToken);
			localStorage.setItem("userId", user?.uid);
			localStorage.setItem("userName", user?.displayName);
			localStorage.setItem("email", user?.email);
			alert("Hello, welcome");
			window.location.href = "index.html";
		})
		.catch((error) => {
			// Handle errors
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);
		});
});
