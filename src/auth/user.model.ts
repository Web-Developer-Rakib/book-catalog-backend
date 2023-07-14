import { Document, Schema, model } from "mongoose";
import hashPassword from "../../utils/hashPassword";

// User interface
interface IUser {
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserDocument extends IUser, Document {}
// User schema
const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// Hash password before save to the database
userSchema.pre<IUser>("save", hashPassword);
// User model
const UserModel = model<IUserDocument>("User", userSchema);

export { IUser, UserModel };
