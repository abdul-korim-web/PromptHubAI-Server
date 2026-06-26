import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },

    creator: {
      id: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },
      
    },

    promptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel