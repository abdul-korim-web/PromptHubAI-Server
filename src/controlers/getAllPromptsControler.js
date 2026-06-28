import Prompts from "../schemas/promptsSchema.js";


export const getAllPromptsControler = async (req, res, next) => {
    try {
        
        const prompts = await Prompts.find({status:"approved"}).populate("creator","name email").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: prompts
        });
    } catch (error) {
        next(error);
    }
};