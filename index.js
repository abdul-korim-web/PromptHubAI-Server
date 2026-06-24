import express from "express"
import dotenv from "dotenv"

import { databaseConnection } from "./src/config/db.js"
import { promptRoute } from "./src/routes/promptRoute.js"
dotenv.config()
const app = express()
app.use(express.json())
// database connection
databaseConnection()
app.get("/", (req, res) => {
    res.status(200).json({success:true,message:"API is running perfectly! 🚀"})

});




app.use("/prompt",promptRoute)




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