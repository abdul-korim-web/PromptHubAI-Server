import express, { text } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { databaseConnection } from "./src/config/db.js"
import { promptRoute } from "./src/routes/promptRoute.js"
import { getUserInfoController } from "./src/controlers/getUserInfoControler.js"
import { checkCreatorLogin } from "./src/middleware/creator/creatorLoginCheck.js"
import { getAllPromptsControler } from "./src/controlers/getAllPromptsControler.js"
import { getSinglePromptControler } from "./src/controlers/getSinglePromptControler.js"
import { User } from "./src/schemas/userSchema.js"
import { addPromptCommentControler } from "./src/controlers/addPromptCommentControler.js"
import getPromptCommentCopntroler from "./src/controlers/getPromptCommentCopntroler.js"
import { getSavePromptControler } from "./src/controlers/getSavePromptControler.js"
import { paymentRoute } from "./src/routes/paymentRoute.js"
import { adminApprovedPromptControler } from "./src/controlers/admin/adminApprovedPromptControler.js"
import { deletePromptController } from "./src/controlers/admin/deletePromptController.js"
import { adminGetAllPromptsControler } from "./src/controlers/promptControlers/adminGetAllPromptsControler.js"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
// database connection
databaseConnection()
app.get("/", (req, res) => {
    res.status(200).json({success:true,message:"API is running perfectly! 🚀"})

});
// admin approved prompts
app.patch("/admin/prompt/status/:id",adminApprovedPromptControler)
// delete prompt 
app.delete("/admin/prompt/:id",deletePromptController)
// admin get all prompt 
app.get("/admin/prompt/get",adminGetAllPromptsControler)
app.use("/payment",paymentRoute)
app.get("/prompt/savepost",checkCreatorLogin,getSavePromptControler)
app.use("/creator/prompt",promptRoute)
app.get("/me",checkCreatorLogin,getUserInfoController)
app.get("/allprompts",getAllPromptsControler)
app.get("/prompt/:promptId",getSinglePromptControler)
app.post("/prompt/comment",checkCreatorLogin,addPromptCommentControler)
app.get("/prompt/comment/:promptId",checkCreatorLogin,getPromptCommentCopntroler)

app.get(`/user`,async(req,res,next)=>{
    try {
        const totalUser= await User.find()
        res.status(200).json({success:true,totalUser})
    } catch (error) {
        next(error)
    }
})


// global error handeling 
app.use((err,req,res,next)=>{
    console.log(err?.message || err);
    res.status(400).json({success:false,message:"This is a server site error.Please Contact with Developer "})
    next(err?.message || err)
})

const port = 5000
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})