import Prompts from "../../schemas/promptsSchema.js";

export const getTopPromptsControler = async(req,res,next)=>{
    try {

    const prompts = await Prompts.find({status:"approved"})
      .sort({ createdAt: -1 })
      .limit(6);


    return res.status(200).json({
      success: true,
      count: prompts.length,
      data: prompts
    });


  } catch (error) {
    next(error);
  }
}