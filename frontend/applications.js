
// ==========================================
// CHECK LOGIN
// ==========================================

const studentData =
    localStorage.getItem("student");


if (!studentData) {

    window.location.href =
        "login.html";

} else {

    const student =
        JSON.parse(studentData);

    console.log(
        "Logged-in student:",
        student
    );

    loadApplications(student.id);
}


// ==========================================
// LOAD APPLICATIONS
// ==========================================

async function loadApplications(studentId) {

    const applicationList =
        document.getElementById(
            "applicationList"
        );

    const applicationCount =
        document.getElementById(
            "applicationCount"
        );


    try {

        const response =
            await fetch(
                `http://localhost:5000/applications/${studentId}`
            );


        const data =
            await response.json();


        console.log(
            "Applications:",
            data
        );


        // ==================================
        // ERROR RESPONSE
        // ==================================

        if (!response.ok) {

            applicationList.innerHTML = `
                <div class="no-applications">

                    <h2>
                        ❌ Unable to load applications
                    </h2>

                    <p>
                        Please make sure the backend server is running.
                    </p>

                </div>
            `;

            return;
        }


        // ==================================
        // NO APPLICATIONS
        // ==================================

        if (
            !data.applications ||
            data.applications.length === 0
        ) {

            applicationCount.textContent = "0";


            applicationList.innerHTML = `
                <div class="no-applications">

                    <h2>
                        📭 No Applications Yet
                    </h2>

                    <p>
                        You haven't applied for any jobs yet.
                    </p>

                    <br>

                    <button
                        onclick="goToJobs()"
                        style="
                            padding: 10px 18px;
                            border: none;
                            border-radius: 8px;
                            background: #2563eb;
                            color: white;
                            cursor: pointer;
                            font-weight: bold;
                        "
                    >
                        Explore Jobs →
                    </button>

                </div>
            `;

            return;
        }


        // ==================================
        // DISPLAY COUNT
        // ==================================

        applicationCount.textContent =
            data.applications.length;


        // ==================================
        // CLEAR LOADING
        // ==================================

        applicationList.innerHTML = "";


        // ==================================
        // DISPLAY APPLICATIONS
        // ==================================

        data.applications.forEach(
            function(application) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "application-card";


                // Format date

                const appliedDate =
                    new Date(
                        application.appliedAt
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    );


                card.innerHTML = `

                    <h2>
                        💼 ${application.jobTitle}
                    </h2>


                    <h3>
                        🏢 ${application.company}
                    </h3>


                    <div class="application-info">
                        📍
                        <strong>Location:</strong>
                        ${application.location}
                    </div>


                    <div class="application-info">
                        💼
                        <strong>Job Type:</strong>
                        ${application.jobType}
                    </div>


                    <div class="application-info">
                        📅
                        <strong>Applied On:</strong>
                        ${appliedDate}
                    </div>


                    <span class="status">
                        📌 ${application.status}
                    </span>

                `;


                applicationList.appendChild(
                    card
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Error loading applications:",
            error
        );


        applicationList.innerHTML = `

            <div class="no-applications">

                <h2>
                    ❌ Server Connection Error
                </h2>

                <p>
                    Unable to connect to the backend.
                </p>

                <br>

                <p>
                    Make sure
                    <strong>
                        node server.js
                    </strong>
                    is running.
                </p>

            </div>

        `;

    }

}


// ==========================================
// EXPLORE JOBS
// ==========================================

function goToJobs() {

    window.location.href =
        "jobs.html";

}


// ==========================================
// BACK TO DASHBOARD
// ==========================================

const backButton =
    document.getElementById(
        "backButton"
    );


if (backButton) {

    backButton.addEventListener(
        "click",
        function() {

            window.location.href =
                "dashboard.html";

        }
    );

}
