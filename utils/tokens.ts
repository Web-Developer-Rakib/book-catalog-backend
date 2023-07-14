import jwt from "jsonwebtoken";

const generateAccessToken = (id: string, role: string) => {
  const payload = { id, role };
  const accessToken = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "1h",
  });

  return accessToken;
};

// Function to generate the refresh token
const generateRefreshToken = (id: string, role: string) => {
  const payload = { id, role };
  const refreshToken = jwt.sign(
    payload,
    `${process.env.REFRESH_TOKEN_SECRET}`,
    {
      expiresIn: "120d",
    }
  );

  return refreshToken;
};
export { generateAccessToken, generateRefreshToken };
