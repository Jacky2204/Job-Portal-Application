import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import User from "../../model/UserModel/UserModel.js";
import UploadOnCloudinary from "./../../middlewares/CloudinaryFile.js";
import generateToken from "./../../utils/generateTokens.js";

export const Register = async (req, res) => {
  const { firstName, lastName, email, phone, address, password, role } =
    req.body;

  console.log("profile pic", req.file ? req.file.path : undefined);
  const profile = await UploadOnCloudinary(
    req.file ? req.file.path : undefined
  );

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !password ||
    !role ||
    !profile
  ) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
    });
  }

  if (profile == undefined) {
    return res.status(400).json({ message: "Please upload a profile picture" });
  }

  try {
    const emailed = await User.findOne({ email });
    if (emailed) {
      return res.status(409).json({
        success: false,
        message: "email already exist",
      });
    }

    const phoned = await User.findOne({ phoned });
    if (phoned) {
      return res.status(409).json({
        success: false,
        message: "Phone already exist",
      });
    }

    if (!process.env.JWT_SECRET) {
      res.json({
        success: false,
        message: "Internal Server error",
      });
    }

    const UserData = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      password: password,
      role: role,
      profilepic: profile,
    });

    const token = generateToken(UserData._id);
    if (!token) {
      return res.status(401).json({
        success: true,
        message: "Authentication token is missing or invalid",
      });
    }

    res.status(200).json({
      success: true,
      data: UserData,
      token,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Enter email or password",
    });
  }

  try {
    const auth = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, auth.password);

    if (!auth) {
      return res.json({ success: false, message: "User  not found!" });
    }

    if (!isMatch) {
      res.json({
        success: false,
        message: "Invalid Password!",
      });
    }

    if (!process.env.JWT_SECRET) {
      res.json({
        success: false,
        message: "Internal Server error",
      });
    }

    const token = generateToken(auth._id);
    // console.log("NODE_ENV", process.env.NODE_ENV);

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {
        _id: auth._id,
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email,
        phone: auth.phone,
        address: auth.address,
        password: auth.password,
        role: auth.role,
        profilepic: auth.profilepic,
      },
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const auth = await User.find();

    res.json({
      success: true,
      data: auth,
      message: "All User found",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const auth = await User.findOne({ _id: id });

    res.json({
      success: true,
      data: auth,
      message: "One User found",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const auth = await User.deleteOne({ _id: id });

    res.json({
      success: true,
      data: auth,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, role, address } = req.body;

  console.log("profile pic", req.file ? req.file.path : undefined);
  const profile = await UploadOnCloudinary(
    req.file ? req.file.path : undefined
  );

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updatedFields = {
      firstName,
      lastName,
      email,
      phone,
      address,
      role,
      profilepic: profile,
    };

    const result = await User.updateOne({ _id: id }, { $set: updatedFields });

    res.json({
      success: true,
      data: result,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
