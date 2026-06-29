import Prompts from "../../schemas/promptsSchema.js";

export const adminGetAllPromptsControler = async (req, res, next) => {
    try {
        
        const prompts = await Prompts.find().populate("creator","name email").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: prompts
        });
    } catch (error) {
        next(error);
    }
};