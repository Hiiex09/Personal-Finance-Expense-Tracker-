import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const access_token = jwt.sign(
    {
      id: userId,
      tokenType: "access",
    },
    process.env.JWT_ACCESS_TOKEN || "dev-secret-key",
    {
      expiresIn: "15m",
    },
  );

  const refresh_token = jwt.sign(
    {
      id: userId,
      tokenType: "refresh",
    },
    process.env.JWT_REFRESH_TOKEN || "dev-secret-key",
    {
      expiresIn: "7d",
    },
  );

  if (res) {
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  return {
    access_token,
    refresh_token,
  };
};
