/**
 * Migration Script to Add Missing Fields to Existing Profiles
 *
 * This script updates existing student and volunteer profiles
 * to add firstName, middleName, lastName, phone, and gender fields
 * by extracting them from the User name field.
 *
 * Run: node migrateProfiles.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const StudentProfile = require("./models/StudentProfile");
const VolunteerProfile = require("./models/VolunteerProfile");
const User = require("./models/User");

const migrateProfiles = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    // Migrate Students
    console.log("\n📚 Migrating Student Profiles...");
    const students = await StudentProfile.find().populate("userId");

    for (const student of students) {
      if (!student.firstName && student.userId) {
        const nameParts = student.userId.name.split(" ");
        const updates = {
          firstName: nameParts[0] || "",
          middleName: nameParts[1] || "",
          lastName: nameParts[2] || "",
          phone: student.phone || "",
          gender: student.gender || "",
        };

        await StudentProfile.findByIdAndUpdate(student._id, updates);
        console.log(`  ✓ Updated student: ${student.userId.name}`);
      }
    }
    console.log(`✓ Migrated ${students.length} student profiles`);

    // Migrate Volunteers
    console.log("\n🎓 Migrating Volunteer Profiles...");
    const volunteers = await VolunteerProfile.find().populate("userId");

    for (const volunteer of volunteers) {
      if (!volunteer.firstName && volunteer.userId) {
        const nameParts = volunteer.userId.name.split(" ");
        const updates = {
          firstName: nameParts[0] || "",
          middleName: nameParts[1] || "",
          lastName: nameParts[2] || "",
          phone: volunteer.phone || "",
          gender: volunteer.gender || "",
        };

        await VolunteerProfile.findByIdAndUpdate(volunteer._id, updates);
        console.log(`  ✓ Updated volunteer: ${volunteer.userId.name}`);
      }
    }
    console.log(`✓ Migrated ${volunteers.length} volunteer profiles`);

    console.log("\n✅ Migration completed successfully!");
    console.log(
      "\n📝 Note: Users should edit their profiles to add phone and gender if missing.",
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

migrateProfiles();
