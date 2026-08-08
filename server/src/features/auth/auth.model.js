import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false,
    },
    preferredCurrency: {
      type: String,
      default: "PHP",
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
