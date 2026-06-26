import Prompts from "../schemas/promptsSchema.js";
import { User } from "../schemas/userSchema.js";

export const saveBookMarkControler = async (req, res, next) => {
  try {
    const { promptId } = req.params;
    const userId = req.payload.id;


    const prompt = await Prompts.findById(promptId);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found"
      });
    }


    const result = await User.updateOne(
      {
        _id: userId
      },
      {
        $push: {
          savedPrompts: {
            promptId: prompt._id,
            title: prompt.title,
            description: prompt.description,
            aiTool: prompt.aiTool,
            category: prompt.category,
            createdAt: new Date()
          }
        }
      },
      {
        upsert: true
      }
    );


    res.status(200).json({
      success: true,
      message: "Bookmark saved",
      data: result
    });


  } catch (error) {
    next(error);
  }
};