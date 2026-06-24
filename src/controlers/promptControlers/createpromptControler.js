import Prompts from './../../schemas/promptsSchema.js';

export const createpromptControler = async (req, res, next) => {
    try {
        
        const { title, description, content, category, aiTool, difficultyLevel, visibility,image } = req.body;

        if (!title || !description || !content || !category || !aiTool) {
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

        const newPrompt = await Prompts.create({
            creator: req.payload.id,
            title,
            description,
            content,
            category,
            aiTool,
            difficultyLevel,
            visibility,
            image
        });

        res.status(201).json({
            success: true,
            message: "Prompt created successfully",
            data: newPrompt
        });
    } catch (error) {
        next(error);
    }
};