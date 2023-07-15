import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import loginHelper from "../../helpers/login.helper";
import { generateAccessToken } from "../../utils/tokens";
import { UserModel } from "./user.model";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if phone number is already taken
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      res.json({ message: "user-exist" });
      return;
    }
    const user = new UserModel({
      email,
      password,
    });
    await user.save();
    // Remove password from response
    const { password: _password, ...usersData } = user.toObject();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User created successfully",
      data: usersData,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await loginHelper(req, res, next, UserModel, "User");
};
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { refreshToken } = req.cookies;
  try {
    // Verify the refresh token
    const decoded: any = jwt.verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
    );
    // Find the user in the database based on the decoded user ID
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(401).json({ error: "User not found" });
    } else {
      // Generate a new access token
      const accessToken = generateAccessToken(user.id, user.role);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "New access token generated successfully!",
        data: { accessToken },
      });
    }
  } catch (error) {
    next(error);
  }
};
