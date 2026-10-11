const studentData = localStorage.getItem("student");

// Check whether student is logged in
if (!studentData) {

    window.location.href = "login.html";

} else {

    const student = JSON.parse(studentData);

    // Fill existing student details
    document.getElementById("editName").value =
        student.name || "";

    document.getElementById("editEmail").value =
        student.email || "";

    document.getElementById("editCourse").value =
        student.course || "";

    document.getElementById("editYear").value =
        student.year || "";

    document.getElementById("editSkills").value =
        student.skills || "";

}


// ===============================
// UPDATE PROFILE
// ===============================

document.getElementById("editProfileForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const student =
            JSON.parse(localStorage.getItem("student"));


        const updatedStudent = {

            name:
                document.getElementById("editName").value,

            course:
                document.getElementById("editCourse").value,

            year:
                document.getElementById("editYear").value,

            skills:
                document.getElementById("editSkills").value

        };


        try {

            const response = await fetch(
                `http://localhost:5000/student/${student.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedStudent)
                }
            );


            const data = await response.json();


            if (response.ok) {

                // Save updated student information
                localStorage.setItem(
                    "student",
                    JSON.stringify(data.student)
                );


                document.getElementById(
                    "updateMessage"
                ).textContent = data.message;


                // Go back to dashboard
                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 1000);

            } else {

                document.getElementById(
                    "updateMessage"
                ).textContent = data.message;

            }

        }

        catch (error) {

            console.error(error);

            document.getElementById(
                "updateMessage"
            ).textContent =
                "❌ Unable to connect to the backend.";

        }

    });


// ===============================
// BACK TO DASHBOARD
// ===============================

document.getElementById("backButton")
    .addEventListener("click", function() {

        window.location.href =
            "dashboard.html";

    });