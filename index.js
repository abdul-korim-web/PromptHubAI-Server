import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({success:true,message:"API is running perfectly! 🚀"})

});











const port = 5000
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})