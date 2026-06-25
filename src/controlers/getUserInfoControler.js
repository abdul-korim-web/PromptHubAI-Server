import { User } from "../schemas/userSchema.js";


export const getUserInfoController = async (req, res, next) => {
  try {
    const userId = req.payload.id;
    console.log('req.payload', req.payload)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. User payload missing.",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User information fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
