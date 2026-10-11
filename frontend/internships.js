
// ==========================================
// INTERNSHIP DATA
// ==========================================

const internships = [

    {
        title: "Python Development Intern",
        company: "Tech Solutions Pvt Ltd",
        location: "Bangalore",
        duration: "3 Months",
        stipend: "₹15,000 / month",
        skills: "Python, Django, SQL"
    },

    {
        title: "Frontend Development Intern",
        company: "WebWorks Technologies",
        location: "Pune",
        duration: "6 Months",
        stipend: "₹12,000 / month",
        skills: "HTML, CSS, JavaScript"
    },

    {
        title: "Data Analytics Intern",
        company: "Data Insights India",
        location: "Mumbai",
        duration: "3 Months",
        stipend: "₹18,000 / month",
        skills: "Python, Pandas, Excel, SQL"
    },

    {
        title: "Cybersecurity Intern",
        company: "SecureTech Solutions",
        location: "Remote",
        duration: "6 Months",
        stipend: "₹15,000 / month",
        skills: "Cybersecurity, Networking, Linux"
    },

    {
        title: "Machine Learning Intern",
        company: "AI Innovations",
        location: "Bangalore",
        duration: "4 Months",
        stipend: "₹20,000 / month",
        skills: "Python, Machine Learning, Pandas"
    },

    {
        title: "Java Development Intern",
        company: "Innovate Systems",
        location: "Hyderabad",
        duration: "6 Months",
        stipend: "₹14,000 / month",
        skills: "Java, Spring Boot, SQL"
    }

];


// ==========================================
// DISPLAY INTERNSHIPS
// ==========================================

function displayInternships(internshipList) {

    const container =
        document.getElementById(
            "internshipList"
        );


    container.innerHTML = "";


    // ======================================
    // NO RESULTS
    // ======================================

    if (internshipList.length === 0) {

        container.innerHTML = `

            <div class="no-results">

                <h2>
                    😔 No internships found
                </h2>

                <p>
                    Try searching for another
                    internship or skill.
                </p>

            </div>

        `;

        return;
    }


    // ======================================
    // CREATE CARDS
    // ======================================

    internshipList.forEach(
        function(internship) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "internship-card";


            card.innerHTML = `

                <h2>
                    🎯 ${internship.title}
                </h2>


                <h3>
                    🏢 ${internship.company}
                </h3>


                <div class="internship-info">

                    📍
                    <strong>Location:</strong>
                    ${internship.location}

                </div>


                <div class="internship-info">

                    ⏱️
                    <strong>Duration:</strong>
                    ${internship.duration}

                </div>


                <div class="internship-info">

                    💰
                    <strong>Stipend:</strong>
                    ${internship.stipend}

                </div>


                <div class="skills">

                    🛠️
                    <strong>Skills:</strong>
                    ${internship.skills}

                </div>


                <button
                    class="apply-button"
                    type="button"
                    onclick="applyInternship(
                        '${internship.title}',
                        '${internship.company}',
                        '${internship.location}'
                    )"
                >

                    Apply Now →

                </button>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// SEARCH
// ==========================================

const searchInput =
    document.getElementById(
        "internshipSearch"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const filteredInternships =
                internships.filter(
                    function(internship) {

                        return (

                            internship.title
                                .toLowerCase()
                                .includes(searchText)

                            ||

                            internship.company
                                .toLowerCase()
                                .includes(searchText)

                            ||

                            internship.location
                                .toLowerCase()
                                .includes(searchText)

                            ||

                            internship.skills
                                .toLowerCase()
                                .includes(searchText)

                        );

                    }
                );


            displayInternships(
                filteredInternships
            );

        }
    );

}


// ==========================================
// APPLY FOR INTERNSHIP
// ==========================================

async function applyInternship(
    internshipTitle,
    company,
    location
) {

    // ======================================
    // CHECK LOGIN
    // ======================================

    const studentData =
        localStorage.getItem(
            "student"
        );


    if (!studentData) {

        alert(
            "⚠️ Please login first."
        );

        window.location.href =
            "login.html";

        return;
    }


    const student =
        JSON.parse(studentData);


    // ======================================
    // SEND APPLICATION
    // ======================================

    try {

        const response =
            await fetch(
                "http://localhost:5000/applications",
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
                            internshipTitle,

                        company:
                            company,

                        location:
                            location,

                        jobType:
                            "Internship"

                    })
                }
            );


        const data =
            await response.json();


        // ==================================
        // SUCCESS
        // ==================================

        if (response.ok) {

            alert(
                "✅ " + data.message
            );

        }


        // ==================================
        // DUPLICATE / ERROR
        // ==================================

        else {

            alert(
                "⚠️ " + data.message
            );

        }

    }


    catch (error) {

        console.error(
            "Internship application error:",
            error
        );


        alert(
            "❌ Unable to connect to the backend."
        );

    }

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


// ==========================================
// DISPLAY ALL INTERNSHIPS
// ==========================================

displayInternships(
    internships
);
