import { validateToken } from "../services/auth.services.js";
import { errorHandler } from "./error.utils.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.Access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorised"));
  }
  const userPayload = validateToken(token);
  if(!userPayload){
    return next(errorHandler(401, "Unauthorised"));
  }
  req.user=userPayload;
  next();
};
