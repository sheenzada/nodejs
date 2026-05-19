require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = async () => {
    try {
        const mongoose = require('mongoose');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Database
connectDB();

// Middleware parsing rules
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST Route: Save clean structured data to Mongo database
app.post('/api/student/register', async (req, res) => {
    try {
        const {
            firstName, lastName, dob, gender, bloodGroup, email, phone,
            currentAddress, permanentAddress,
            gradeLevel, previousSchool, passingYear, totalMarks, obtainedMarks,
            fatherName, fatherOccupation, guardianPhone, emergencyContactName, emergencyContactPhone
        } = req.body;

        // Clean validation gate check
        if (!firstName || !lastName || !dob || !gradeLevel || !fatherName || !guardianPhone) {
            return res.status(400).json({ success: false, message: "Required inputs are missing!" });
        }

        // Unique Registration ID system generation
        const generatedId = `STU-${Math.floor(100000 + Math.random() * 900000)}`;

        // Creating mongoose documents instances mapping
        const newStudent = new Student({
            personalInfo: { firstName, lastName, dob, gender, bloodGroup },
            contactInfo: { email, phone, currentAddress, permanentAddress },
            academicInfo: { gradeLevel, previousSchool, passingYear, totalMarks, obtainedMarks },
            guardianInfo: { fatherName, fatherOccupation, guardianPhone },
            emergency: { name: emergencyContactName, phone: emergencyContactPhone },
            registrationId: generatedId
        });

        // Save command execution asynchronously
        await newStudent.save();

        res.status(201).json({
            success: true,
            message: `Student registered successfully into database!`,
            registrationId: generatedId
        });

    } catch (error) {
        console.error("Database Write Fail Error Log:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error while creating collection row record."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Production Ready Express Server up on http://localhost:${PORT}`);
});