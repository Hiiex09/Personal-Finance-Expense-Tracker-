import { registerUser, loginUser, logoutUser, getCurrentUser } from "./auth.service.js";
import {
  validateRegisterPayload,
  validateLoginPayload,
} from "./auth.validation.js";

export const register = async (req, res, next) => {
  try {
    const validation = validateRegisterPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration data",
        errorCode: "AUTH_REGISTER_INVALID",
        errors: validation.errors,
      });
    }

    const result = await registerUser(validation.normalizedData);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validation = validateLoginPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid login data",
        errorCode: "AUTH_LOGIN_INVALID",
        errors: validation.errors,
      });
    }

    const result = await loginUser(validation.normalizedData);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
