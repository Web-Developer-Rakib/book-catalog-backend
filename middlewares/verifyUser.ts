import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`
    );
    if (decoded.role === "admin" || decoded.role === "user") {
      next();
    } else {
      return res.status(401).json({ message: "Access denied. Unauthorized." });
    }
  } catch (err) {
    return res.status(401).json({ message: "Access denied. Invalid token." });
  }
};
export default verifyUser;
