import Prompts from "./../../schemas/promptsSchema.js";
export const creatorDeletePromptController = async (req, res, next) => {
  try {
    const { promptId } = req.params;

    const creatorId = req.payload.id;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. User not found.",
      });
    }

    const prompt = await Prompts.findOne({ _id: promptId, creator: creatorId });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message:
          "Prompt not found or you don't have permission to delete this.",
      });
    }

    await Prompts.findByIdAndDelete(promptId);

    res.status(200).json({
      success: true,
      message: "Prompt deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
