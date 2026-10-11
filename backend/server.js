// ==========================================
// IMPORT PACKAGES
// ==========================================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();


// ==========================================
// CREATE EXPRESS APP
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "✅ MongoDB connected successfully!"
        );

    })
    .catch((error) => {

        console.error(
            "❌ MongoDB connection error:",
            error
        );

    });


// ==========================================
// STUDENT SCHEMA
// ==========================================

const studentSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        course: {
            type: String,
            default: ""
        },

        year: {
            type: String,
            default: ""
        },

        skills: {
            type: String,
            default: ""
        }

    });


const Student =
    mongoose.model(
        "Student",
        studentSchema
    );


// ==========================================
// APPLICATION SCHEMA
// ==========================================

const applicationSchema =
    new mongoose.Schema({

        studentId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "Student",

            required:
                true

        },

        studentName: {

            type:
                String,

            required:
                true

        },

        studentEmail: {

            type:
                String,

            required:
                true

        },

        jobTitle: {

            type:
                String,

            required:
                true

        },

        company: {

            type:
                String,

            required:
                true

        },

        location: {

            type:
                String,

            required:
                true

        },

        jobType: {

            type:
                String,

            required:
                true

        },

        status: {

            type:
                String,

            default:
                "Applied"

        },

        appliedAt: {

            type:
                Date,

            default:
                Date.now

        }

    });


const Application =
    mongoose.model(
        "Application",
        applicationSchema
    );


// ==========================================
// HOME ROUTE
// ==========================================

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "Student Career Portal Backend is running!"

        });

    }
);


// ==========================================
// REGISTER STUDENT
// ==========================================

app.post(
    "/register",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password,
                course,
                year,
                skills
            } = req.body;


            if (
                !name ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    message:
                        "Name, email and password are required."

                });

            }


            const existingStudent =
                await Student.findOne({

                    email:
                        email.toLowerCase()

                });


            if (existingStudent) {

                return res.status(400).json({

                    message:
                        "Email already registered."

                });

            }


            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );


            const student =
                new Student({

                    name:

                        name,

                    email:

                        email.toLowerCase(),

                    password:

                        hashedPassword,

                    course:

                        course || "",

                    year:

                        year || "",

                    skills:

                        skills || ""

                });


            await student.save();


            res.status(201).json({

                message:
                    "Registration successful!"

            });


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            res.status(500).json({

                message:
                    "Server error during registration."

            });

        }

    }
);


// ==========================================
// LOGIN STUDENT
// ==========================================

app.post(
    "/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            if (
                !email ||
                !password
            ) {

                return res.status(400).json({

                    message:
                        "Email and password are required."

                });

            }


            const student =
                await Student.findOne({

                    email:
                        email.toLowerCase()

                });


            if (!student) {

                return res.status(401).json({

                    message:
                        "Invalid email or password."

                });

            }


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    student.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    message:
                        "Invalid email or password."

                });

            }


            res.json({

                message:
                    "Login successful!",

                student: {

                    id:
                        student._id,

                    name:
                        student.name,

                    email:
                        student.email,

                    course:
                        student.course,

                    year:
                        student.year,

                    skills:
                        student.skills

                }

            });


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            res.status(500).json({

                message:
                    "Server error during login."

            });

        }

    }
);


// ==========================================
// UPDATE STUDENT PROFILE
// ==========================================

app.put(
    "/student/:id",
    async (req, res) => {

        try {

            const studentId =
                req.params.id;


            const {
                name,
                course,
                year,
                skills
            } = req.body;


            const updatedStudent =
                await Student.findByIdAndUpdate(

                    studentId,

                    {

                        name:
                            name,

                        course:
                            course,

                        year:
                            year,

                        skills:
                            skills

                    },

                    {

                        new:
                            true

                    }

                );


            if (!updatedStudent) {

                return res.status(404).json({

                    message:
                        "Student not found."

                });

            }


            res.json({

                message:
                    "Profile updated successfully!",

                student: {

                    id:
                        updatedStudent._id,

                    name:
                        updatedStudent.name,

                    email:
                        updatedStudent.email,

                    course:
                        updatedStudent.course,

                    year:
                        updatedStudent.year,

                    skills:
                        updatedStudent.skills

                }

            });


        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to update profile."

            });

        }

    }
);


// ==========================================
// APPLY FOR JOB / INTERNSHIP
// ==========================================

app.post(
    "/applications",
    async (req, res) => {

        try {

            const {
                studentId,
                jobTitle,
                company,
                location,
                jobType
            } = req.body;


            if (
                !studentId ||
                !jobTitle ||
                !company ||
                !location ||
                !jobType
            ) {

                return res.status(400).json({

                    message:
                        "All application details are required."

                });

            }


            const student =
                await Student.findById(
                    studentId
                );


            if (!student) {

                return res.status(404).json({

                    message:
                        "Student not found."

                });

            }


            const existingApplication =
                await Application.findOne({

                    studentId:
                        studentId,

                    jobTitle:
                        jobTitle,

                    company:
                        company

                });


            if (existingApplication) {

                return res.status(400).json({

                    message:
                        "⚠️ You have already applied for this job."

                });

            }


            const application =
                new Application({

                    studentId:
                        studentId,

                    studentName:
                        student.name,

                    studentEmail:
                        student.email,

                    jobTitle:
                        jobTitle,

                    company:
                        company,

                    location:
                        location,

                    jobType:
                        jobType,

                    status:
                        "Applied"

                });


            await application.save();


            res.status(201).json({

                message:
                    "✅ Application submitted successfully!",

                application:
                    application

            });


        } catch (error) {

            console.error(
                "Application error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to submit application."

            });

        }

    }
);


// ==========================================
// GET STUDENT APPLICATIONS
// ==========================================

app.get(
    "/applications/:studentId",
    async (req, res) => {

        try {

            const studentId =
                req.params.studentId;


            const applications =
                await Application.find({

                    studentId:
                        studentId

                }).sort({

                    appliedAt:
                        -1

                });


            res.json({

                applications:
                    applications

            });


        } catch (error) {

            console.error(
                "Get applications error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to load applications."

            });

        }

    }
);


// ==========================================
// AI CAREER RECOMMENDATION - OLLAMA
// ==========================================

app.post(
    "/ai-recommendation",
    async (req, res) => {

        try {

            const {
                name,
                course,
                year,
                skills
            } = req.body;


            if (!skills) {

                return res.status(400).json({

                    message:
                        "Student skills are required."

                });

            }


            const prompt = `
You are an expert AI career advisor.

Analyze the following student's profile:

Name: ${name || "Student"}
Course: ${course || "Computer Science"}
Year: ${year || "Not specified"}
Skills: ${skills}

Based on the student's skills, provide career recommendations.

Recommend exactly 3 suitable career paths.

For each career, provide:

1. Career Name
2. Match Percentage
3. Why this career suits the student
4. Skills the student already has
5. Missing skills they should learn
6. Recommended learning path
7. Suitable job roles
8. Suitable internship roles

Return the answer in this exact JSON format:

{
    "recommendations": [
        {
            "career": "Career Name",
            "matchPercentage": 85,
            "reason": "Why this career suits the student",
            "existingSkills": [
                "Skill 1",
                "Skill 2"
            ],
            "missingSkills": [
                "Skill 1",
                "Skill 2"
            ],
            "learningPath": [
                "Step 1",
                "Step 2",
                "Step 3"
            ],
            "jobRoles": [
                "Job Role 1",
                "Job Role 2"
            ],
            "internshipRoles": [
                "Internship Role 1",
                "Internship Role 2"
            ]
        }
    ]
}

Return ONLY valid JSON.
Do not include markdown.
Do not include code fences.
`;


            const ollamaResponse =
                await fetch(
                    "http://localhost:11434/api/generate",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                model:
                                    "llama3.2",

                                prompt:
                                    prompt,

                                stream:
                                    false,

                                format:
                                    "json"

                            })

                    }
                );


            if (!ollamaResponse.ok) {

                throw new Error(
                    "Ollama server returned an error."
                );

            }


            const ollamaData =
                await ollamaResponse.json();


            let aiResult;


            try {

                aiResult =
                    JSON.parse(
                        ollamaData.response
                    );

            } catch (error) {

                console.error(
                    "Invalid AI JSON response:"
                );

                console.error(
                    ollamaData.response
                );


                return res.status(500).json({

                    message:
                        "AI returned an invalid response."

                });

            }


            if (
                !aiResult.recommendations ||
                !Array.isArray(
                    aiResult.recommendations
                )
            ) {

                return res.status(500).json({

                    message:
                        "AI did not return valid career recommendations."

                });

            }


            res.json({

                success:
                    true,

                recommendations:
                    aiResult.recommendations

            });


        } catch (error) {

            console.error(
                "AI Recommendation Error:",
                error
            );


            res.status(500).json({

                success:
                    false,

                message:
                    "Unable to generate AI recommendations. Make sure Ollama is running."

            });

        }

    }
);


// ==========================================
// AI JOB RECOMMENDATION - OLLAMA
// ==========================================

app.post(
    "/ai-job-recommendation",
    async (req, res) => {

        try {

            const {
                skills,
                jobs
            } = req.body;


            // ------------------------------
            // VALIDATION
            // ------------------------------

            if (!skills) {

                return res.status(400).json({

                    message:
                        "Student skills are required."

                });

            }


            if (
                !jobs ||
                !Array.isArray(jobs) ||
                jobs.length === 0
            ) {

                return res.status(400).json({

                    message:
                        "Job data is required."

                });

            }


            // ------------------------------
            // PREPARE JOB INFORMATION
            // ------------------------------

            const jobInformation =
                jobs
                    .map(
                        function(job, index) {

                            return `
Job ${index + 1}:
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Job Type: ${job.jobType}
Skills: ${job.skills}
`;

                        }
                    )
                    .join("\n");


            // ------------------------------
            // AI PROMPT
            // ------------------------------

            const prompt = `
You are an expert AI career and recruitment advisor.

A student has the following skills:

${skills}

Here are the available jobs:

${jobInformation}

Analyze the student's skills and rank the available jobs according to how suitable they are for the student.

Return exactly the best 3 jobs.

For each recommended job provide:

1. Job title
2. Company
3. Match percentage
4. Why the job matches the student's skills
5. Existing skills
6. Skills the student should improve

Return ONLY valid JSON in this exact format:

{
    "recommendations": [
        {
            "jobTitle": "Job Title",
            "company": "Company Name",
            "matchPercentage": 90,
            "reason": "Why this job matches the student",
            "existingSkills": [
                "Python",
                "SQL"
            ],
            "skillsToImprove": [
                "Django",
                "REST API"
            ]
        }
    ]
}

Return ONLY JSON.
Do not include markdown.
Do not include code fences.
`;


            // ------------------------------
            // CALL OLLAMA
            // ------------------------------

            const ollamaResponse =
                await fetch(
                    "http://localhost:11434/api/generate",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                model:
                                    "llama3.2",

                                prompt:
                                    prompt,

                                stream:
                                    false,

                                format:
                                    "json"

                            })

                    }
                );


            // ------------------------------
            // CHECK OLLAMA
            // ------------------------------

            if (!ollamaResponse.ok) {

                throw new Error(
                    "Ollama server returned an error."
                );

            }


            const ollamaData =
                await ollamaResponse.json();


            console.log(
                "AI Job Recommendation response received."
            );


            // ------------------------------
            // PARSE AI RESPONSE
            // ------------------------------

            let aiResult;


            try {

                aiResult =
                    JSON.parse(
                        ollamaData.response
                    );

            } catch (error) {

                console.error(
                    "Invalid AI Job JSON response:"
                );

                console.error(
                    ollamaData.response
                );


                return res.status(500).json({

                    message:
                        "AI returned an invalid job recommendation response."

                });

            }


            // ------------------------------
            // VALIDATE RESULT
            // ------------------------------

            if (
                !aiResult.recommendations ||
                !Array.isArray(
                    aiResult.recommendations
                )
            ) {

                return res.status(500).json({

                    message:
                        "AI did not return valid job recommendations."

                });

            }


            // ------------------------------
            // SEND RESPONSE
            // ------------------------------

            res.json({

                success:
                    true,

                recommendations:
                    aiResult.recommendations

            });


        } catch (error) {

            console.error(
                "AI Job Recommendation Error:",
                error
            );


            res.status(500).json({

                success:
                    false,

                message:
                    "Unable to generate AI job recommendations. Make sure Ollama is running."

            });

        }

    }
);


// ==========================================
// START SERVER
// ==========================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `🚀 Server running at http://localhost:${PORT}`
        );

    }
);