import { PaymentModel } from "../schemas/paymentSchema.js";
import { User } from "../schemas/userSchema.js";

export const successPaymentControler = async (req, res, next) => {
  try {
const {sessionId,priceId,userId} = req.body
    console.log('req.body', req.body)
    if (!sessionId || !priceId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
     const existPayment = await PaymentModel.findOne({
      sessionId,
    });
    if (existPayment) {
      return res.status(409).json({
        success: false,
        message: "Payment already exists",
      });
    }
    const createPayment = await PaymentModel.create({
      sessionId,
      priceId,
      userId,
    });
    const userPlanChenge = await User.findByIdAndUpdate(userId,{
       $set:{
        plan:"pro"
       }
    })
    console.log('userPlanChenge', userPlanChenge)
    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: createPayment,
    });
  } catch (error) {
    next(error);
  }
};
