import Prompts from './../../schemas/promptsSchema.js';

export const createpromptControler = async (req, res, next) => {
    try {
        const { title, description, content, category, aiTool, difficultyLevel, visibility, image } = req.body;

        if (!title || !description || !content || !category || !aiTool || !image) {
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

  
        const userPayload = req.payload;
        if (!userPayload) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
console.log('req.payload', req.payload)
        const creatorId = userPayload.id;
        const userRole = userPayload.role;
        const userPlan = userPayload.plan;

 
        if (userRole === "user" && userPlan === "free") {
    
            const existingPromptsCount = await Prompts.countDocuments({ creator: creatorId });
            console.log('existingPromptsCount', existingPromptsCount)

            if (existingPromptsCount >= 3) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Free plan limit reached! You can add a maximum of 3 prompts. Please upgrade your plan." 
                });
            }
        }

       
        const newPrompt = await Prompts.create({
            creator: creatorId,
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