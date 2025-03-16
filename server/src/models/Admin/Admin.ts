import mongoose, { Schema, Document } from "mongoose";

interface IAdmin extends Document {
  adminName: string;
  email: string;
  password: string;
  role?: "admin" | "superadmin";
  userVerified: {
    email: boolean;
  };
  userVerifiedToken?: {
    email?: string;
  };
}

const adminSchema = new Schema<IAdmin>(
  {
    adminName: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 1,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
    userVerified: {
      email: {
        type: Boolean,
        default: false,
      },
    },
    userVerifiedToken: {
      email: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model<IAdmin>("admin", adminSchema, "admin");

export default adminModel;
