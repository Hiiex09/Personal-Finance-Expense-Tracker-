import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./auth.model.js";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET || "dev-secret-key",
    {
      expiresIn: "7d",
    },
  );
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("A user with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
    preferredCurrency: "PHP",
  });

  const token = createToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      preferredCurrency: user.preferredCurrency,
      createdAt: user.createdAt,
    },
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = createToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      preferredCurrency: user.preferredCurrency,
      createdAt: user.createdAt,
    },
  };
};

export const logoutUser = () => {
  return {
    success: true,
    message: "Logged out successfully",
  };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    preferredCurrency: user.preferredCurrency,
    createdAt: user.createdAt,
  };
};
