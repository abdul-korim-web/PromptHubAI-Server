import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    savedPrompts: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Prompts" 
        }
    ]
}, { timestamps: true });

export const User = mongoose.model("user", userSchema);