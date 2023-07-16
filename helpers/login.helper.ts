import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";
const loginHelper = async (
  req: Request,
  res: Response,
  next: NextFunction,
  model: any,
  loginRole: string
) => {
  const { email, password } = req.body;
  try {
    // Find the entity based on the provided phone number
    const entity = await model.findOne({ email });
    // Check if the entity exists
    if (!entity) {
      res.json({ message: `${loginRole} not found` });
    } else {
      // Compare the provided password with the hashed password stored in the database
      const isPasswordMatch = await bcrypt.compare(password, entity.password);
      if (!isPasswordMatch) {
        res.json({ message: "Invalid password." });
      }
      const email = entity.email;
      const role = entity.role;
      const accessToken = generateAccessToken(email, role);
      const refreshToken = generateRefreshToken(email, role);
      const { password: _password, ...usersData } = entity.toObject();

      res.json({
        success: true,
        statusCode: 200,
        message: `${loginRole} logged in successfully`,
        data: { accessToken, refreshToken, usersData },
      });
    }
  } catch (error) {
    next(error);
  }
};
export default loginHelper;
