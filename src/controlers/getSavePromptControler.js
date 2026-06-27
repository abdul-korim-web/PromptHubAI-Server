import { User } from "../schemas/userSchema.js"

export const getSavePromptControler = async(req,res,next)=>{
try {
    const {id} = req.payload
   const targetUser = await User.findById(id)

    res.status(200).json({success:true,message:"save post found", savepost:targetUser.savedPrompts})
} catch (error) {
    next(error)
}
}