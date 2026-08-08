import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        errorCode: "AUTH_REQUIRED",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret-key",
    );

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
      errorCode: "AUTH_INVALID",
    });
  }
};
