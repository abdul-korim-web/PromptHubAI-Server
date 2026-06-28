import express from "express"
import { createpromptControler } from "../controlers/promptControlers/createpromptControler.js"
import { getCreatorPromptsController } from "../controlers/promptControlers/getCreatorPromptsControler.js"
import { checkCreatorLogin } from './../middleware/creator/creatorLoginCheck.js';
import { creatorDeletePromptController } from './../controlers/promptControlers/creatorDeletePromptControler.js';
import { editCreatorPromptController } from "../controlers/promptControlers/editCreatorPromptControler.js";
import { saveBookMarkControler } from "../controlers/saveBookMarkControler.js";
import { incrimentCopyPromptControler } from "../controlers/incrimentCopyPromptControler.js";
import { getTopPromptsControler } from "../controlers/promptControlers/getTopPromptsControler.js";



export const promptRoute = express.Router()


// get creator prompts
promptRoute.get("/",checkCreatorLogin,getCreatorPromptsController)
// create a single prompt (creator)
promptRoute.post(`/`,checkCreatorLogin,createpromptControler)
// get top 6 data 
promptRoute.get("/topprompts",getTopPromptsControler)
// incriment copy prompt 
promptRoute.patch("/copy/:promptId",incrimentCopyPromptControler)
// delete creator promptRoute
promptRoute.delete("/:promptId",checkCreatorLogin,creatorDeletePromptController)

//  save bookmark post 
promptRoute.patch("/bookmark/:promptId",checkCreatorLogin,saveBookMarkControler)

// edit creator prompt
promptRoute.patch("/:promptId",checkCreatorLogin,editCreatorPromptController)