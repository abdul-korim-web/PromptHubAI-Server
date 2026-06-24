import express from "express"
import { createpromptControler } from "../controlers/promptControlers/createpromptControler.js"
import { checkCreatorLogin } from "../middleware/creator/creatorLoginCheck.js"

export const promptRoute = express.Router()


// create a single prompt 
promptRoute.post(`/`,checkCreatorLogin,createpromptControler)


