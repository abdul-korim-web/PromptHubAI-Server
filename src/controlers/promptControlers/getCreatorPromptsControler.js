import Prompts from "../../schemas/promptsSchema.js";

export const getCreatorPromptsController = async (req, res, next) => {
    try {
       
        const creatorId = req.payload.id;

        if (!creatorId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. User not found."
            });
        }

   
        const prompts = await Prompts.find({ creator: creatorId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: prompts.length,
            message: "Creator prompts fetched successfully.",
            data: prompts
        });

    } catch (error) {
        next(error);
    }
};