
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    // Stop the browser from refreshing/submitting the form normally
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value.trim();
    const year = document.getElementById("year").value;
    const skills = document.getElementById("skills").value.trim();

    const message = document.getElementById("message");

    try {

        const response = await fetch(
            "http://localhost:5000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    course: course,
                    year: year,
                    skills: skills
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            message.textContent = data.message;
            message.style.color = "green";

            alert("✅ Registration successful!");

            // Go to login page
            window.location.href = "login.html";

        } else {

            message.textContent = data.message;
            message.style.color = "red";

        }

    } catch (error) {

        console.error("Registration error:", error);

        message.textContent =
            "❌ Unable to connect to the backend.";

        message.style.color = "red";

        alert(
            "❌ Backend is not connected. Please make sure node server.js is running."
        );
    }
});
