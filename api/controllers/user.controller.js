import { errorHandler } from "../utils/error.utils.js";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  const { profilePicture, fullname, email, password } = req.body;

  if (req.user._id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (password) {
      if (password.length < 8) {
        return next(
          errorHandler(400, "Password must be at least 8 characters")
        );
      }
      user.password = password;
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
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }
    const updatedUser = await user.save();
    const { password: _, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user._id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
