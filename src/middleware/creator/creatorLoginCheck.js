import { createRemoteJWKSet, jwtVerify } from "jose";

export const checkCreatorLogin = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
        return  res.status(400).json({success:false,message:"authentication fail"})
    }
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return  res.status(400).json({success:false,message:"authentication  fail"})
        
    }
    const JWKS = createRemoteJWKSet(
        new URL(process.env.JWKS_URL)
    )
     const {payload}= await jwtVerify(token,JWKS,{
         issuer: process.env.ISSUSER, // Should match your JWT issuer, which is the BASE_URL
      audience: process.env.ISSUSER, // Should match your JWT audience, which is the BASE_URL by default
    })
      if (!payload) {
        return  res.status(400).json({success:false,message:"authentication fail"})
    }
     req.payload= payload
     next()

    } catch (error) {
        res.status(404).json({success:false,message:"au fa"})
        next(error)
    }
}