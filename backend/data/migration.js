import User from "../models/users.model.js";
import MuscleGroup from "../models/muscles.model.js";
import ExerciseMuscleGroups from "../models/muscleGroups.model.js";
import Sessions from "../models/sessions.model.js";
import Entries from "../models/entries.model.js";
import Sets from "../models/sets.model.js";
import Exercises from "../models/exercises.model.js";
import { sequelize } from "../config/db.js";


export const migration = async () => {
    try {
        // Sync the model with the database (creates tables if they don't exist)
        await sequelize.sync({ force: true, /*alter: true */}); // force: false prevents table drop

        // Check if predefined users already exist (optional to prevent duplicates)
        const userCount = await User.count();
        if (userCount === 0) {
            await User.bulkCreate([
                {
                    name: "admin",
                    email: "admin@admin",
                    password: "$2a$10$gCX6b65PJM7EfcG18WhBgeixTLrQfazt52yATC5sbl1U8yozx4xHW"
                }
            ]);
            console.log("✅ Predefined users seeded.");
        } else {
            console.log("ℹ️ Users already exist, skipping seed.");
        }

        const exerciseCount = await Exercises.count();
        if (exerciseCount === 0) {
            await Exercises.bulkCreate([
                {
                    name: "Push Up",
                    //description: "A basic bodyweight exercise that targets the chest, shoulders, and triceps.",
                    category: "Strength",
                    equipment: "None",
                    is_bodyweight: true
                },
                {
                    name: "Squat",
                    //description: "A compound exercise that targets the legs and glutes.",
                    category: "Strength",
                    equipment: "Barbell",
                    is_bodyweight: false
                },
                {
                    name: "Plank",
                    //description: "An isometric core exercise that strengthens the abdominal muscles.",
                    category: "Core",
                    equipment: "None",
                    is_bodyweight: true
                },
                {
                    name: "Deadlift",
                    //description: "A compound exercise that targets the back, legs, and core.",
                    category: "Strength",
                    equipment: "Barbell",
                    is_bodyweight: false
                }
            ]);
            console.log("✅ Predefined exercises seeded.");
        } else {
            console.log("ℹ️ Exercises already exist, skipping seed.");
        }
    } catch (err) {
        console.error("❌ Migration failed:", err);
    }
}