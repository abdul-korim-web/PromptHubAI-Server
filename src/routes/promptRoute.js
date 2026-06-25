import express from "express"
import { createpromptControler } from "../controlers/promptControlers/createpromptControler.js"
import { getCreatorPromptsController } from "../controlers/promptControlers/getCreatorPromptsControler.js"
import { checkCreatorLogin } from './../middleware/creator/creatorLoginCheck.js';


export const promptRoute = express.Router()


// get creator prompts
promptRoute.get("/",checkCreatorLogin,getCreatorPromptsController)
// create a single prompt (creator)
promptRoute.post(`/`,checkCreatorLogin,createpromptControler)
