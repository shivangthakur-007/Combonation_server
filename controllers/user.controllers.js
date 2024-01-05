
import User from "../models/user.model.js";
import appError from "../utils/error.utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";


const cookieOptions= {
  maxAge: 7*24*60*60*1000,
  httpOnly: true,
  secure: true,
}
const register = async (req, res, next) => {
  // try {
    const {fullName, email, password } = req.body;

  //   if (!fullName || !email || !password) {
  //     return next(new appError("All fields are required", 400));
  // }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new appError("Email already exists", 400));
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/dvhcu6di8/image/upload/v1691039851/lms/cuoyoiibnbb6xhldxru9.png",
      },
    });
    if (!user) {
      return next(
        new appError("User registration failed, please try again", 400)
      );
    }
    console.log("hello", user);
    // todo file Upload
    console.log("result", json.stringify(result));
    if (req.file) {
      // try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "Combonation",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          // Remove file from server
          fs.rm(`profile/${req.file.filename}`);
        }
      // } catch (e) {
      //   return next(
      //     new appError(e || "File not Upload, Please try again", 500)
      //   );
      // }
    }
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTTOKEN();

    res.cookie("token", token, cookieOptions);
    
    res.status(200).json({
      success: true,
      message: "User registered Successfully",
      user,
    });
//   } catch (e) {
//     return next(new appError(e || "User not Upload", 500));
//   }
};

export {register}