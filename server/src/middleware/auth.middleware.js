import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../features/auth/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
};

export const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) {
      const refreshToken = req.cookies?.refresh_token;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          errorCode: "AUTH_REQUIRED",
        });
      }

      const result = await refreshAccessToken(refreshToken);

      res.cookie("access_token", result.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      });

      req.user = {
        id: result.user.id,
        email: result.user.email,
      };

      return next();
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "dev-secret-key",
    );

    if (decoded.tokenType !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid token type",
        errorCode: "AUTH_INVALID_TOKEN_TYPE",
      });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      try {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired session",
            errorCode: "AUTH_INVALID",
          });
        }

        const result = await refreshAccessToken(refreshToken);

        res.cookie("access_token", result.accessToken, {
          ...cookieOptions,
          maxAge: 15 * 60 * 1000,
        });

        req.user = {
          id: result.user.id,
          email: result.user.email,
        };

        return next();
      } catch (refreshError) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired session",
          errorCode: "AUTH_INVALID",
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
      errorCode: "AUTH_INVALID",
    });
  }
};
