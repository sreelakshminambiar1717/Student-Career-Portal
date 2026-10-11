const API_URL = "http://localhost:5000";

// Get logged-in student
const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Sample jobs
const jobs = [
    {
        title: "Frontend Developer",
        company: "WebWorks Technologies",
        location: "Pune",
        jobType: "Full Time",
        skills: "HTML, CSS, JavaScript"
    },
    {
        title: "Python Developer",
        company: "TechSoft Solutions",
        location: "Bangalore",
        jobType: "Internship",
        skills: "Python, SQL, Flask"
    },
    {
        title: "Data Analyst",
        company: "Data Insights Pvt Ltd",
        location: "Mumbai",
        jobType: "Full Time",
        skills: "Python, SQL, Excel, Power BI"
    },
    {
        title: "Cybersecurity Intern",
        company: "SecureNet Technologies",
        location: "Hyderabad",
        jobType: "Internship",
        skills: "Cybersecurity, Networking, Linux"
    },
    {
        title: "Full Stack Developer",
        company: "InnovateTech",
        location: "Pune",
        jobType: "Full Time",
        skills: "HTML, CSS, JavaScript, Node.js, MongoDB"
    },
    {
        title: "AI/ML Intern",
        company: "AI Future Labs",
        location: "Bangalore",
        jobType: "Internship",
        skills: "Python, Machine Learning, AI"
    }
];


// ==========================================
// DISPLAY JOBS
// ==========================================

function displayJobs(jobList) {

    const container =
        document.getElementById("jobsContainer");

    if (!container) {
        console.error(
            "jobsContainer not found."
        );
        return;
    }

    container.innerHTML = "";

    jobList.forEach(function(job, index) {

        const jobCard =
            document.createElement("div");

        jobCard.className = "job-card";

        jobCard.innerHTML = `
            <h3>${job.title}</h3>

            <p>
                <strong>Company:</strong>
                ${job.company}
            </p>

            <p>
                <strong>Location:</strong>
                ${job.location}
            </p>

            <p>
                <strong>Job Type:</strong>
                ${job.jobType}
            </p>

            <p>
                <strong>Skills:</strong>
                ${job.skills}
            </p>

            <button
                onclick="applyForJob(${index})">
                Apply Now
            </button>
        `;

        container.appendChild(jobCard);

    });
}


// ==========================================
// APPLY FOR JOB
// ==========================================

async function applyForJob(index) {

    const job = jobs[index];

    try {

        const response =
            await fetch(
                `${API_URL}/applications`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        studentId:
                            student.id,

                        jobTitle:
                            job.title,

                        company:
                            job.company,

                        location:
                            job.location,

                        jobType:
                            job.jobType

                    })
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            alert(
                data.message ||
                "Unable to apply."
            );

            return;
        }

        alert(
            "✅ Application submitted successfully!"
        );

    } catch (error) {

        console.error(
            "Application error:",
            error
        );

        alert(
            "❌ Unable to connect to the server."
        );

    }
}


// ==========================================
// AI JOB RECOMMENDATIONS
// ==========================================

async function getAIRecommendations() {

    const recommendationContainer =
        document.getElementById(
            "aiRecommendations"
        );

    if (!recommendationContainer) {
        console.error(
            "aiRecommendations container not found."
        );
        return;
    }

    recommendationContainer.innerHTML = `
        <p>🤖 AI is analyzing your skills...</p>
    `;

    try {

        const response =
            await fetch(
                `${API_URL}/ai-job-recommendation`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        skills:
                            student.skills,

                        jobs:
                            jobs

                    })
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            recommendationContainer.innerHTML = `
                <p>
                    ❌ ${data.message ||
                    "Unable to generate recommendations."}
                </p>
            `;

            return;
        }

        displayAIRecommendations(
            data.recommendations
        );

    } catch (error) {

        console.error(
            "AI recommendation error:",
            error
        );

        recommendationContainer.innerHTML = `
            <p>
                ❌ Unable to connect to AI.
                Make sure Ollama and the backend are running.
            </p>
        `;

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
            "aiRecommendations"
        );

    container.innerHTML = "";

    recommendations.forEach(
        function(job) {

            const card =
                document.createElement("div");

            card.className =
                "ai-job-card";

            card.innerHTML = `
                <div class="ai-badge">
                    ⭐ AI Recommended
                </div>

                <h3>
                    ${job.jobTitle}
                </h3>

                <p>
                    <strong>Company:</strong>
                    ${job.company}
                </p>

                <div class="match">
                    🎯 Match:
                    <strong>
                        ${job.matchPercentage}%
                    </strong>
                </div>

                <p>
                    <strong>Why it matches:</strong>
                    ${job.reason}
                </p>

                <p>
                    <strong>Your Skills:</strong>
                    ${job.existingSkills.join(", ")}
                </p>

                <p>
                    <strong>Skills to Improve:</strong>
                    ${job.skillsToImprove.join(", ")}
                </p>
            `;

            container.appendChild(card);

        }
    );
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayJobs(jobs);

        getAIRecommendations();

    }
);