const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    personalInfo: {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'] },
        bloodGroup: { type: String }
    },
    contactInfo: {
        email: { type: String, trim: true, lowercase: true },
        phone: { type: String, trim: true },
        currentAddress: { type: String },
        permanentAddress: { type: String }
    },
    academicInfo: {
        gradeLevel: { type: String, required: true },
        previousSchool: { type: String },
        passingYear: { type: Number },
        totalMarks: { type: Number },
        obtainedMarks: { type: Number }
    },
    guardianInfo: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String },
        guardianPhone: { type: String, required: true }
    },
    emergency: {
        name: { type: String },
        phone: { type: String }
    },
    registrationId: { type: String, unique: true, required: true }
}, {
    timestamps: true // Creates 'createdAt' and 'updatedAt' fields automatically
});

module.exports = mongoose.model('Student', StudentSchema);