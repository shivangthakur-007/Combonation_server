import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      // required: [true, "Name is required"],
      minLength: [2, "Name should be atleast 2 characters"],
      maxLength: [30, "Name should be not more than 30 characters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      // required: [true, "Name is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill in a valid Email Address",
      ],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      minLength: [8, "Password should be atleast 8 characters"],
      select: false,
    },
    profile: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
      id: String,
      status: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJWTTOKEN: async function() {
    return await jwt.sign(
      {
        id: this._id,
        subscription: this.subscription,
        role: this.role,
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY || "20h",
      }
    );
  },
  comparePassword: async function(plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
  generatePasswordResetToken: async function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    //   adding forgot password expiry to 15 mins
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 from now
    return resetToken;
  },
};

const User = model("User", userSchema);

export default User;
