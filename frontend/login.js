
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("message");

    try {

        const response = await fetch(
            "http://localhost:5000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            console.log("Login successful:", data);

            // Store student information
            localStorage.setItem(
                "student",
                JSON.stringify(data.student)
            );

            message.textContent =
                "✅ Login successful!";

            message.style.color = "green";

            // Open dashboard
            setTimeout(function () {
                window.location.href =
                    "dashboard.html";
            }, 500);

        } else {

            message.textContent =
                data.message || "❌ Login failed.";

            message.style.color = "red";
        }

    } catch (error) {

        console.error("Login error:", error);

        message.textContent =
            "❌ Unable to connect to the backend.";

        message.style.color = "red";
    }
});
