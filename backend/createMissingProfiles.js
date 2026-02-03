const mongoose = require("mongoose");
const User = require("./models/User");
const StudentProfile = require("./models/StudentProfile");
const VolunteerProfile = require("./models/VolunteerProfile");
require("dotenv").config();

const createMissingProfiles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Find all students without profiles
    const students = await User.find({ role: "student" });
    console.log(`Found ${students.length} student users`);

    for (const student of students) {
      const existingProfile = await StudentProfile.findOne({
        userId: student._id,
      });

      if (!existingProfile) {
        console.log(
          `Creating profile for student: ${student.email} (${student.name})`,
        );

        // Parse name into parts
        const nameParts = student.name.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts[nameParts.length - 1] || "";
        const middleName =
          nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

        await StudentProfile.create({
          userId: student._id,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          phone: "",
          gender: "",
          school: "Unknown School",
          gradeLevel: "Elementary",
          grade: "1",
          subjectInterests: ["General"],
          guardianName: "",
        });

        console.log(`✓ Profile created for ${student.email}`);
      } else {
        console.log(`Profile already exists for ${student.email}`);
      }
    }

    // Find all volunteers without profiles
    const volunteers = await User.find({ role: "volunteer" });
    console.log(`\nFound ${volunteers.length} volunteer users`);

    for (const volunteer of volunteers) {
      const existingProfile = await VolunteerProfile.findOne({
        userId: volunteer._id,
      });

      if (!existingProfile) {
        console.log(
          `Creating profile for volunteer: ${volunteer.email} (${volunteer.name})`,
        );

        // Parse name into parts
        const nameParts = volunteer.name.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts[nameParts.length - 1] || "";
        const middleName =
          nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

        await VolunteerProfile.create({
          userId: volunteer._id,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          phone: "",
          gender: "",
          university: "Unknown University",
          department: "General",
          subjects: ["General"],
          availability: "Weekends",
          preferredLevel: "Elementary",
          isApproved: true,
        });

        console.log(`✓ Profile created for ${volunteer.email}`);
      } else {
        console.log(`Profile already exists for ${volunteer.email}`);
      }
    }

    console.log("\n✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

createMissingProfiles();
