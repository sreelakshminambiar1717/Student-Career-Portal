
// ==========================================
// CHECK LOGIN
// ==========================================

const studentData = localStorage.getItem("student");

if (!studentData) {

    // If student is not logged in
    window.location.href = "login.html";

} else {

    // Convert stored JSON into JavaScript object
    const student = JSON.parse(studentData);

    console.log("Logged-in student:", student);


    // ==========================================
    // DISPLAY STUDENT NAME
    // ==========================================

    const studentName =
        document.getElementById("studentName");

    if (studentName) {

        studentName.textContent =
            student.name || "Student";

    }


    // ==========================================
    // DISPLAY PROFILE NAME
    // ==========================================

    const profileName =
        document.getElementById("profileName");

    if (profileName) {

        profileName.textContent =
            student.name || "Not available";

    }


    // ==========================================
    // DISPLAY PROFILE EMAIL
    // ==========================================

    const profileEmail =
        document.getElementById("profileEmail");

    if (profileEmail) {

        profileEmail.textContent =
            student.email || "Not available";

    }


    // ==========================================
    // DISPLAY PROFILE COURSE
    // ==========================================

    const profileCourse =
        document.getElementById("profileCourse");

    if (profileCourse) {

        profileCourse.textContent =
            student.course || "Not available";

    }


    // ==========================================
    // DISPLAY PROFILE YEAR
    // ==========================================

    const profileYear =
        document.getElementById("profileYear");

    if (profileYear) {

        profileYear.textContent =
            student.year || "Not available";

    }


    // ==========================================
    // DISPLAY PROFILE SKILLS
    // ==========================================

    const profileSkills =
        document.getElementById("profileSkills");

    if (profileSkills) {

        profileSkills.textContent =
            student.skills || "Not available";

    }

}


// ==========================================
// EDIT PROFILE
// ==========================================

const editProfileButton =
    document.getElementById("editProfileButton");

if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        function () {

            console.log("Edit Profile clicked");

            window.location.href =
                "./edit-profile.html";

        }
    );

}


// ==========================================
// EXPLORE JOBS
// ==========================================

const jobsButton =
    document.getElementById("jobsButton");

if (jobsButton) {

    jobsButton.addEventListener(
        "click",
        function () {

            console.log("Jobs button clicked");

            window.location.href =
                "./jobs.html";

        }
    );

}


// ==========================================
// INTERNSHIPS
// ==========================================

// ==========================================
// INTERNSHIPS
// ==========================================

const internshipsButton =
    document.getElementById("internshipsButton");

if (internshipsButton) {

    internshipsButton.addEventListener(
        "click",
        function () {

            console.log(
                "Internships button clicked"
            );

            window.location.href =
                "./internships.html";

        }
    );

}


// ==========================================
// MY APPLICATIONS
// ==========================================

const applicationsButton =
    document.getElementById("applicationsButton");

if (applicationsButton) {

    applicationsButton.addEventListener(
        "click",
        function () {

            console.log(
                "My Applications clicked"
            );

            window.location.href =
                "./applications.html";

        }
    );

}

// ==========================================
// AI CAREER RECOMMENDATION
// ==========================================

const recommendationButton =
    document.getElementById("recommendationButton");

if (recommendationButton) {

    recommendationButton.addEventListener(
        "click",
        function () {

            console.log(
                "Career Recommendation clicked"
            );

            window.location.href =
                "./recommendation.html";

        }
    );

}



// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            console.log("Logging out...");

            // Remove logged-in student
            localStorage.removeItem("student");

            // Redirect to login
            window.location.href =
                "./login.html";

        }
    );

}
