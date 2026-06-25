import Prompts from "../schemas/promptsSchema.js    ";


export const getSinglePromptControler = async (req, res, next) => {
    try {
        const { promptId } = req.params; // অথবা req.query থেকে নিতে পারেন, রাউট সেটআপ অনুযায়ী

        // ডাটাবেজ থেকে আইডি দিয়ে প্রম্পটটি খুঁজে বের করা
        const prompt = await Prompts.findById(promptId).populate("creator","name email plan");

        if (!prompt) {
            return res.status(404).json({
                success: false,
                message: "Prompt not found"
            });
        }

        res.status(200).json({
            success: true,
            data: prompt
        });
    } catch (error) {
        next(error);
    }
};