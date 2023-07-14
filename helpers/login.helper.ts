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
  const { phoneNumber, password } = req.body;
  try {
    // Find the entity based on the provided phone number
    const entity = await model.findOne({ phoneNumber });
    // Check if the entity exists
    if (!entity) {
      res.status(404).json({
        error: `${loginRole} not found`,
      });
    } else {
      // Compare the provided password with the hashed password stored in the database
      const isPasswordMatch = await bcrypt.compare(password, entity.password);
      if (!isPasswordMatch) {
        res.status(401).json({ error: "Invalid password" });
      }
      const id = entity._id;
      const role = entity.role;
      const accessToken = generateAccessToken(id, role);
      const refreshToken = generateRefreshToken(id, role);

      // Set the refresh token in the browser cookie
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      // Send the access token in the response
      res.json({
        success: true,
        statusCode: 200,
        message: `${loginRole} logged in successfully`,
        data: { accessToken },
      });
    }
  } catch (error) {
    next(error);
  }
};
export default loginHelper;
