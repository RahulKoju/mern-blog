import { errorHandler } from "../utils/error.utils.js";
import User from "../models/user.model.js";
export const updateUser = async (req, res, next) => {
  const { profilePicture, fullname, email, password } = req.body;
  console.log(req.body);
  if (req.user._id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (password) {
    if (password.length < 8) {
      return next(errorHandler(400, "Password must be at least 8 characters"));
    }
  }
  if (fullname) {
    if (fullname.length < 7 || fullname.length > 20) {
      return next(
        errorHandler(400, "Fullname must be between 7 to 20 characters")
      );
    }
    if (!fullname.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Fullname can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          fullname: fullname,
          email: email,
          password: password,
          profilePicture: profilePicture,
        },
      },
      { new: true }
    );
    const { excludedPassword, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
