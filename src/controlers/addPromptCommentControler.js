import CommentModel from "../schemas/commentSchema.js";

export const addPromptCommentControler =async (req,res,next)=>{
    console.log('req.payload', req.payload)
    try {
         const newComment = await CommentModel.create({
      comment: req.body.userComment,
      promptId: req.body.promptId,

      creator: {
        id: req.payload.id,
        name: req.payload.name,
        email: req.payload.email,
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
    } catch (error) {
        next(error)
    }
}