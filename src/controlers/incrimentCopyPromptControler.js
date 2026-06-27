import Prompts from "../schemas/promptsSchema.js"

export const incrimentCopyPromptControler =async (req,res,next)=>{
    console.log("jh")
    try {
        const {promptId} = req.params
        if (!promptId) {
            res.status(404).json({success:false,message:"prompt not found"})
        }
        const incrimentCopy = await Prompts.findByIdAndUpdate(promptId,{$inc:{totalCopy:1}},{new:true})
           if(!incrimentCopy){
      return res.status(404).json({
        success:false,
        message:"Prompt not found"
      });
    }
    res.status(200).json({
      success:true,
      message:"Copy count updated",
      data:{
        totalCopy: incrimentCopy.totalCopy
      }
    });

    } catch (error) {
        next(error)
    }
}