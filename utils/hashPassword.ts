import bcrypt from "bcrypt";

const hashPassword = async function (this: any, next: any): Promise<void> {
  // Hash the password only if it has been modified or is new
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Set the hashed password
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default hashPassword;
