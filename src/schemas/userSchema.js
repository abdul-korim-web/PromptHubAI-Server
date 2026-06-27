import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      required: false,
      default: "free",
    },

    savedPrompts: [
      {
        promptId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Prompt",
          required: true,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        aiTool: {
          type: String,
        },
        category: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "user",
  },
);

export const User = mongoose.models.user || mongoose.model("user", userSchema);
