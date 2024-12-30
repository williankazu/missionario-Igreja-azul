// Countdown Timer
function updateTimer() {
	try {
		const eventDate = new Date("2025-01-04T07:00:00").getTime();
		const now = new Date().getTime();
		const distance = eventDate - now;

		if (distance < 0) {
			const countdownElement = document.getElementById("countdown");
			if (countdownElement) {
				countdownElement.innerHTML = "<h3>O evento já começou!</h3>";
			}
			return;
		}

		// Time calculations
		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Update elements safely
		const elements = {
			days: document.getElementById("days"),
			hours: document.getElementById("hours"),
			minutes: document.getElementById("minutes"),
			seconds: document.getElementById("seconds"),
		};

		if (elements.days)
			elements.days.innerHTML = days.toString().padStart(2, "0");
		if (elements.hours)
			elements.hours.innerHTML = hours.toString().padStart(2, "0");
		if (elements.minutes)
			elements.minutes.innerHTML = minutes.toString().padStart(2, "0");
		if (elements.seconds)
			elements.seconds.innerHTML = seconds.toString().padStart(2, "0");
	} catch (error) {
		console.error("Error updating timer:", error);
	}
}

// Initialize timer
let timerInterval;

function startTimer() {
	updateTimer(); // Initial call
	timerInterval = setInterval(updateTimer, 1000);
}

// Smooth scroll
function initSmoothScroll() {
	// biome-ignore lint/complexity/noForEach: <explanation>
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href");
			const target = document.querySelector(targetId);

			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
				});
			}
		});
	});
}

// Mobile menu
function initMobileMenu() {
	const navLinks = document.querySelectorAll(".nav-link");
	const menuToggle = document.getElementById("navbarNav");

	if (menuToggle) {
		const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

		// biome-ignore lint/complexity/noForEach: <explanation>
		navLinks.forEach((link) => {
			link.addEventListener("click", () => {
				if (menuToggle.classList.contains("show")) {
					bsCollapse.hide();
				}
			});
		});
	}
}

// Initialize all features when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	startTimer();
	initSmoothScroll();
	initMobileMenu();
});

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
	if (timerInterval) {
		clearInterval(timerInterval);
	}
});
