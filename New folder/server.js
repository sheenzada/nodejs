// Server setup using Express.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML/CSS)
app.use(express.static(path.join(__dirname, 'public')));

// API Route: Student Form Submit handler
app.post('/api/student/register', (req, res) => {
    // Destructuring all student details from request body
    const {
        firstName, lastName, dob, gender, bloodGroup, email, phone,
        currentAddress, permanentAddress,
        gradeLevel, previousSchool, passingYear, totalMarks, obtainedMarks,
        fatherName, fatherOccupation, guardianPhone, emergencyContactName, emergencyContactPhone
    } = req.body;

    // Server-side validation check
    if (!firstName || !lastName || !dob || !gradeLevel || !fatherName || !guardianPhone) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields! Please check the mandatory data." 
        });
    }

    // Yahan aap apna Database logic (PostgreSQL/MongoDB) add kar sakte hain
    const studentData = {
        personalInfo: { firstName, lastName, dob, gender, bloodGroup },
        contactInfo: { email, phone, currentAddress, permanentAddress },
        academicInfo: { gradeLevel, previousSchool, passingYear, marks: { totalMarks, obtainedMarks } },
        guardianInfo: { fatherName, fatherOccupation, guardianPhone },
        emergency: { name: emergencyContactName, phone: emergencyContactPhone },
        submittedAt: new Date()
    };

    console.log("Saving Student Data to System:", JSON.stringify(studentData, null, 2));

    // Success response to frontend
    res.status(201).json({
        success: true,
        message: `Student ${firstName} ${lastName} has been registered successfully!`,
        registrationId: `STU-${Math.floor(100000 + Math.random() * 900000)}`
    });
});

app.listen(PORT, () => {
    console.log(`Senior Dev Server running on http://localhost:${PORT}`);
});