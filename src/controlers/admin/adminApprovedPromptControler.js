import Prompts from "../../schemas/promptsSchema.js";

export const adminApprovedPromptControler = async(req,res,next)=>{
    console.log("hit");
    try {
    const { id } = req.params;
    const { status, feedback } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updateData = { status };
    if (status === 'rejected') {
      updateData.feedback = feedback || 'No feedback provided';
    } else {
      updateData.feedback = ''; 
    }

    const updatedPrompt = await Prompts.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } 
    );

    if (!updatedPrompt) {
      return res.status(404).json({ success: false, message: 'Prompt not found' });
    }

    res.status(200).json({ success: true, data: updatedPrompt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}