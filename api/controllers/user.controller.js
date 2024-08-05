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

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all the users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
