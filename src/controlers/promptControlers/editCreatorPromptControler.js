import Prompts from "../../schemas/promptsSchema.js";

export const editCreatorPromptController = async (req, res, next) => {
  try {
    const { promptId } = req.params;

    const creatorId = req.payload.id;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. User not found.",
      });
    }

    const {
      title,
      description,
      content,
      category,
      aiTool,
      difficultyLevel,
      visibility,
    } = req.body;

    const updatedPrompt = await Prompts.findOneAndUpdate(
      { _id: promptId, creator: creatorId },
      {
        $set: {
          title,
          description,
          content,
          category,
          aiTool,
          difficultyLevel,
          visibility,
          status: "pending",
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedPrompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found or you don't have permission to edit this.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prompt updated successfully and pending admin approval.",
      data: updatedPrompt,
    });
  } catch (error) {
    next(error);
  }
};
