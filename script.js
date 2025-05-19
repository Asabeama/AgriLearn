document.addEventListener("DOMContentLoaded", function () {
	// Previous functionality remains

	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	function updateCartDisplay() {
		const cartCount = document.getElementById("cartCount");
		const cartItems = document.getElementById("cartItems");
		const cartTotal = document.getElementById("cartTotal");
		let total = 0;

		cartCount.textContent = cart.length;
		cartItems.innerHTML = "";
		cart.forEach((item, index) => {
			total += parseFloat(item.price);
			cartItems.innerHTML += `
                <div class="d-flex justify-content-between">
                    <span>${item.title} - $${item.price}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </div>`;
		});
		cartTotal.textContent = total.toFixed(2);
	}

	// Enhanced Login
	document.getElementById("loginForm")?.addEventListener("submit", function (e) {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		if (email && password.length >= 8) {
			localStorage.setItem("isLoggedIn", "true");
			localStorage.setItem("userEmail", email);
			alert("Login successful! Welcome back to AgriLearn.");
			window.location.href = "index.html";
		} else {
			alert("Please enter valid credentials (password 8+ characters)");
		}
	});

	// Password Reset
	document.getElementById("resetForm")?.addEventListener("submit", function (e) {
		e.preventDefault();
		const email = document.getElementById("resetEmail").value;
		if (email) {
			alert(email);
			bootstrap.Modal.getInstance(document.getElementById("resetModal")).hide();
		}
	});

	// Enhanced Signup
	document.getElementById("signupForm")?.addEventListener("submit", function (e) {
		e.preventDefault();
		const email = document.getElementById("signupEmail").value;
		const password = document.getElementById("signupPassword").value;
		const confirmPassword = document.getElementById("confirmPassword").value;
		const userType = document.getElementById("userType").value;
		const farmSize = document.getElementById("farmSize").value;

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		if (email && password.length >= 8 && userType) {
			localStorage.setItem("isLoggedIn", "true");
			localStorage.setItem("userEmail", email);
			localStorage.setItem("userType", userType);
			if (farmSize) localStorage.setItem("farmSize", farmSize);
			alert(email);
			window.location.href = "index.html";
		} else {
			alert("Please complete all required fields correctly");
		}
	});

	// Webinar Filters
	const webinarSearch = document.getElementById("webinarSearch");
	const dateFilter = document.getElementById("dateFilter");
	const categoryFilter = document.getElementById("categoryFilter");

	function filterWebinars() {
		const searchTerm = webinarSearch?.value.toLowerCase() || "";
		const dateVal = dateFilter?.value || "";
		const categoryVal = categoryFilter?.value || "";

		document.querySelectorAll(".card").forEach((card) => {
			const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
			const isVisible = title.includes(searchTerm) && (!dateVal || card.dataset.date === dateVal) && (!categoryVal || card.dataset.category === categoryVal);
			card.style.display = isVisible ? "" : "none";
		});
	}

	webinarSearch?.addEventListener("input", filterWebinars);
	dateFilter?.addEventListener("change", filterWebinars);
	categoryFilter?.addEventListener("change", filterWebinars);

	// Video Filters and Categories
	const videoSearch = document.getElementById("videoSearch");
	const videoFilter = document.getElementById("videoFilter");
	const categoryLinks = document.querySelectorAll(".list-group-item-action");

	function filterVideos() {
		const searchTerm = videoSearch?.value.toLowerCase() || "";
		const level = videoFilter?.value || "";
		const activeCategory = document.querySelector(".list-group-item-action.active")?.dataset.category || "all";

		document.querySelectorAll(".card").forEach((card) => {
			const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
			const cardLevel = card.dataset.level || "";
			const cardCategory = card.dataset.category || "all";
			const isVisible = title.includes(searchTerm) && (!level || cardLevel === level) && (activeCategory === "all" || cardCategory === activeCategory);
			card.style.display = isVisible ? "" : "none";
		});
	}

	videoSearch?.addEventListener("input", filterVideos);
	videoFilter?.addEventListener("change", filterVideos);
	categoryLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			categoryLinks.forEach((l) => l.classList.remove("active"));
			link.classList.add("active");
			filterVideos();
		});
	});

	// Add data attributes to cards (example)
	document.querySelectorAll(".card").forEach((card) => {
		card.dataset.level = card.dataset.level || "beginner"; // Set default level
		card.dataset.category = card.dataset.category || "crop"; // Set default category
		card.dataset.date = card.dataset.date || "month"; // Set default date
	});

	// Add to Cart
	document.querySelectorAll(".add-to-cart").forEach((button) => {
		button.addEventListener("click", () => {
			const item = {
				id: button.dataset.id,
				title: button.dataset.title,
				price: button.dataset.price,
			};
			cart.push(item);
			localStorage.setItem("cart", JSON.stringify(cart));
			updateCartDisplay();
			button.textContent = "Added!";
			button.disabled = true;
			setTimeout(() => {
				button.textContent = "Add to Cart";
				button.disabled = false;
			}, 2000);
		});
	});

	// Remove from Cart
	window.removeFromCart = function (index) {
		cart.splice(index, 1);
		localStorage.setItem("cart", JSON.stringify(cart));
		updateCartDisplay();
	};

	updateCartDisplay();

	// Checkout
	document.getElementById("checkout")?.addEventListener("click", () => {
		if (cart.length === 0) {
			alert("Your cart is empty!");
			return;
		}

		// Display order summary on thank you page
		localStorage.setItem("order", JSON.stringify(cart));
		cart = [];
		localStorage.setItem("cart", JSON.stringify(cart));
		updateCartDisplay();
		window.location.href = "thankyou.html";
	});

	// Thank You Page
	if (window.location.pathname.includes("thankyou.html")) {
		const order = JSON.parse(localStorage.getItem("order")) || [];
		const orderSummary = document.getElementById("orderSummary");
		const orderTotal = document.getElementById("orderTotal");
		let total = 0;

		order.forEach((item) => {
			total += parseFloat(item.price);
			orderSummary.innerHTML += `<p>${item.title} - $${item.price}</p>`;
		});
		orderTotal.textContent = total.toFixed(2);
	}
});

document.addEventListener("DOMContentLoaded", function () {
	// Previous functionality remains

	// Course Filters
	const courseSearch = document.getElementById("courseSearch");
	const levelFilter = document.getElementById("levelFilter");
	const categoryFilter = document.getElementById("categoryFilter");
	const categoryButtons = document.querySelectorAll(".card .btn-outline-success");

	function filterCourses() {
		const searchTerm = courseSearch?.value.toLowerCase() || "";
		const levelVal = levelFilter?.value || "";
		const categoryVal = categoryFilter?.value || "";

		document.querySelectorAll(".card").forEach((card) => {
			const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
			const cardLevel = card.dataset.level || "";
			const cardCategory = card.dataset.category || "";
			const isVisible = title.includes(searchTerm) && (!levelVal || cardLevel === levelVal) && (!categoryVal || cardCategory === categoryVal);
			card.style.display = isVisible ? "" : "none";
		});
	}

	courseSearch?.addEventListener("input", filterCourses);
	levelFilter?.addEventListener("change", filterCourses);
	categoryFilter?.addEventListener("change", filterCourses);

	categoryButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			const category = button.dataset.category;
			categoryFilter.value = category;
			filterCourses();
		});
	});

	// Enroll Button Feedback
	document.querySelectorAll(".btn-success").forEach((btn) => {
		if (btn.textContent.includes("Enroll")) {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				if (localStorage.getItem("isLoggedIn") !== "true") {
					alert("Please login to enroll in this course");
					window.location.href = "login.html";
				} else {
					btn.textContent = "Enrolled!";
					btn.disabled = true;
					btn.classList.add("btn-secondary");
					btn.classList.remove("btn-success");
				}
			});
		}
	});

	// Get all link with class="nav-link" inside the container
	var links = document.getElementsByClassName("nav-link");

	// Loop through the links and add the active class to the current/clicked link
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener("click", function () {
			var current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace(" active", "");
			this.className += " active";
		});
	}
});
// Previous webinar, video, login, signup functionality remains
