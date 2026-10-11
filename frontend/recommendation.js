
// ==========================================
// CHECK LOGIN
// ==========================================

const studentData = localStorage.getItem("student");

if (!studentData) {

    window.location.href = "login.html";

} else {

    const student = JSON.parse(studentData);

    console.log("Student profile:", student);


    // ======================================
    // DISPLAY STUDENT PROFILE
    // ======================================

    document.getElementById("studentName").textContent =
        student.name || "Not available";

    document.getElementById("studentCourse").textContent =
        student.course || "Not available";

    document.getElementById("studentYear").textContent =
        student.year || "Not available";

    document.getElementById("studentSkills").textContent =
        student.skills || "No skills added";
}


// ==========================================
// GENERATE AI RECOMMENDATIONS
// ==========================================

async function generateAIRecommendations() {

    const studentData =
        localStorage.getItem("student");


    // ======================================
    // CHECK LOGIN
    // ======================================

    if (!studentData) {

        alert("⚠️ Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    const student =
        JSON.parse(studentData);


    // ======================================
    // GET BUTTON
    // ======================================

    const recommendButton =
        document.getElementById(
            "recommendButton"
        );


    const container =
        document.getElementById(
            "recommendationList"
        );


    // ======================================
    // SHOW LOADING
    // ======================================

    recommendButton.disabled = true;

    recommendButton.textContent =
        "🤖 AI is analyzing your profile...";


    container.innerHTML = `

        <div class="loading-message">

            <h3>
                🤖 AI Career Analysis in Progress
            </h3>

            <p>
                Please wait while Ollama analyzes
                your skills and career opportunities...
            </p>

        </div>

    `;


    try {

        // ==================================
        // SEND PROFILE TO BACKEND
        // ==================================

        const response =
            await fetch(
                "http://localhost:5000/ai-recommendation",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name:
                            student.name || "",

                        course:
                            student.course || "",

                        year:
                            student.year || "",

                        skills:
                            student.skills || ""

                    })

                }
            );


        // ==================================
        // GET BACKEND RESPONSE
        // ==================================

        const data =
            await response.json();


        console.log(
            "AI Recommendation Response:",
            data
        );


        // ==================================
        // HANDLE ERROR
        // ==================================

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to generate recommendations."
            );

        }


        // ==================================
        // DISPLAY AI RESULTS
        // ==================================

        displayAIRecommendations(
            data.recommendations
        );


    } catch (error) {

        console.error(
            "AI Recommendation Error:",
            error
        );


        container.innerHTML = `

            <div class="error-message">

                <h3>
                    ❌ AI Recommendation Failed
                </h3>

                <p>
                    ${error.message}
                </p>

                <p>
                    Make sure your Node.js backend
                    and Ollama are running.
                </p>

            </div>

        `;

    } finally {

        // ==================================
        // RESTORE BUTTON
        // ==================================

        recommendButton.disabled = false;

        recommendButton.textContent =
            "🤖 Generate Career Recommendations";

    }

}


// ==========================================
// DISPLAY AI RECOMMENDATIONS
// ==========================================

function displayAIRecommendations(
    recommendations
) {

    const container =
        document.getElementById(
            "recommendationList"
        );


    container.innerHTML = "";


    // ======================================
    // CHECK RESULTS
    // ======================================

    if (
        !recommendations ||
        !Array.isArray(recommendations) ||
        recommendations.length === 0
    ) {

        container.innerHTML = `

            <div class="error-message">

                <h3>
                    😔 No recommendations found
                </h3>

                <p>
                    Try adding more skills to your profile.
                </p>

            </div>

        `;

        return;
    }


    // ======================================
    // CREATE CAREER CARDS
    // ======================================

    recommendations.forEach(
        function(career) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "recommendation-card";


            // ==================================
            // EXISTING SKILLS
            // ==================================

            const existingSkills =
                Array.isArray(
                    career.existingSkills
                )
                    ? career.existingSkills
                        .map(
                            function(skill) {

                                return `
                                    <li>
                                        ✅ ${escapeHTML(skill)}
                                    </li>
                                `;

                            }
                        )
                        .join("")
                    : "<li>None specified</li>";


            // ==================================
            // MISSING SKILLS
            // ==================================

            const missingSkills =
                Array.isArray(
                    career.missingSkills
                )
                    ? career.missingSkills
                        .map(
                            function(skill) {

                                return `
                                    <li>
                                        📌 ${escapeHTML(skill)}
                                    </li>
                                `;

                            }
                        )
                        .join("")
                    : "<li>None specified</li>";


            // ==================================
            // LEARNING PATH
            // ==================================

            const learningPath =
                Array.isArray(
                    career.learningPath
                )
                    ? career.learningPath
                        .map(
                            function(step, index) {

                                return `
                                    <li>

                                        <strong>
                                            Step ${index + 1}:
                                        </strong>

                                        ${escapeHTML(step)}

                                    </li>
                                `;

                            }
                        )
                        .join("")
                    : "<li>Not specified</li>";


            // ==================================
            // JOB ROLES
            // ==================================

            const jobRoles =
                Array.isArray(
                    career.jobRoles
                )
                    ? career.jobRoles
                        .map(
                            function(role) {

                                return `
                                    <li>
                                        💼 ${escapeHTML(role)}
                                    </li>
                                `;

                            }
                        )
                        .join("")
                    : "<li>Not specified</li>";


            // ==================================
            // INTERNSHIP ROLES
            // ==================================

            const internshipRoles =
                Array.isArray(
                    career.internshipRoles
                )
                    ? career.internshipRoles
                        .map(
                            function(role) {

                                return `
                                    <li>
                                        🎓 ${escapeHTML(role)}
                                    </li>
                                `;

                            }
                        )
                        .join("")
                    : "<li>Not specified</li>";


            // ==================================
            // CAREER NAME
            // ==================================

            const careerName =
                escapeHTML(
                    career.career ||
                    "Career Recommendation"
                );


            // ==================================
            // MATCH PERCENTAGE
            // ==================================

            const matchPercentage =
                Number.isFinite(
                    Number(
                        career.matchPercentage
                    )
                )
                    ? Number(
                        career.matchPercentage
                    )
                    : 0;


            // ==================================
            // REASON
            // ==================================

            const reason =
                escapeHTML(
                    career.reason ||
                    "This career matches your profile."
                );


            // ==================================
            // CARD HTML
            // ==================================

            card.innerHTML = `

                <div class="career-header">

                    <h3>
                        🚀 ${careerName}
                    </h3>

                    <span class="match-score">

                        ${matchPercentage}% Match

                    </span>

                </div>


                <!-- WHY THIS CAREER -->

                <div class="career-section">

                    <h4>
                        🎯 Why This Career?
                    </h4>

                    <p>
                        ${reason}
                    </p>

                </div>


                <!-- EXISTING SKILLS -->

                <div class="career-section">

                    <h4>
                        ✅ Your Existing Skills
                    </h4>

                    <ul>

                        ${existingSkills}

                    </ul>

                </div>


                <!-- MISSING SKILLS -->

                <div class="career-section">

                    <h4>
                        📌 Skills You Need
                    </h4>

                    <ul>

                        ${missingSkills}

                    </ul>

                </div>


                <!-- LEARNING PATH -->

                <div class="career-section">

                    <h4>
                        📚 Recommended Learning Path
                    </h4>

                    <ol>

                        ${learningPath}

                    </ol>

                </div>


                <!-- JOB ROLES -->

                <div class="career-section">

                    <h4>
                        💼 Suitable Job Roles
                    </h4>

                    <ul>

                        ${jobRoles}

                    </ul>

                </div>


                <!-- INTERNSHIP ROLES -->

                <div class="career-section">

                    <h4>
                        🎓 Suitable Internship Roles
                    </h4>

                    <ul>

                        ${internshipRoles}

                    </ul>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}


// ==========================================
// GENERATE BUTTON
// ==========================================

const recommendButton =
    document.getElementById(
        "recommendButton"
    );


if (recommendButton) {

    recommendButton.addEventListener(
        "click",
        generateAIRecommendations
    );

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
