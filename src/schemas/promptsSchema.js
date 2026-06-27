import mongoose from "mongoose";

const promptsSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image:{
     type: String,
      required: true,
    }
    ,
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["marketing", "coding", "design", "writing"],
    },
    aiTool: {
      type: String,
      required: true,
      enum: ["chatgpt", "midjourney", "claude", "stable-diffusion"],
    },
    difficultyLevel: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "pro"],
      default: "beginner",
    },
    visibility: {
      type: String,
      required: true,
      enum: ["public", "private"],
      default: "public",
    },
    totalCopy:{
      type:Number,
      requireed:false,
      default:0
    }
  },
  { timestamps: true }
);

const Prompts = mongoose.models.Prompts || mongoose.model("Prompts", promptsSchema);
export default Prompts;