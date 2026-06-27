import express from "express"
import { successPaymentControler } from "../controlers/successPaymentControler.js"
export const paymentRoute= express.Router()
paymentRoute.post("/success",successPaymentControler)