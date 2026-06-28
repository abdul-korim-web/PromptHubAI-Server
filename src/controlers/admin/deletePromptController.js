import Prompts from "../../schemas/promptsSchema.js";

export const deletePromptController = async(req,res,next)=>{
  try {

    const { id } = req.params;


    const deletedPrompt = await Prompts.findByIdAndDelete(id);


    if(!deletedPrompt){
      return res.status(404).json({
        success:false,
        message:"Prompt not found"
      });
    }


    return res.status(200).json({
      success:true,
      message:"Prompt deleted successfully",
      data:deletedPrompt
    });


  } catch(error){
    next(error);
  }
};