import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    sessionId:{
        required:true,
        type:String
    },
    priceId:{
         required:true,
        type:String
    },
    userId:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
  },
  {
    timestamps: true,
  },
);

export const PaymentModel = mongoose.models.payments || mongoose.model("payment", paymentSchema);
