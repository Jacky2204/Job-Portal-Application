import Application from "../../model/ApplicationModel/ApplicationModel.js";
import UploadOnCloudinary from "./../../middlewares/CloudinaryFile.js";

export const createApp = async (req, res) => {
  const { firstName, lastName, phone, email, address, coverLetter, user, job } =
    req.body;
  

  console.log("this is file", req.file ? req.file.path : undefined);
  const resume = await UploadOnCloudinary(req.file ? req.file.path : undefined);
  console.log("resume", resume);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !coverLetter ||
    !resume
  ) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
    });
  }

  if (resume == undefined) {
    return res.status(400).json({ message: "Please upload a resume" });
  }

  try {
    const AppData = await Application.create({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      address: address,
      coverLetter: coverLetter,
      resume: resume,
      user: user,
      job: job,
    });

    res.status(200).json({
      success: true,
      data: AppData,
      message: "Application Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllApplication = async (req, res) => {
  try {
    const AppData = await Application.find();

    res.json({
      success: true,
      data: AppData,
      message: "All Application Data Found Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const AppData = await Application.findOne({ _id: id });

    res.json({
      success: true,
      data: AppData,
      message: "One Application Data Found Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const AppData = await Application.deleteOne({ _id: id });

    res.json({
      success: true,
      data: AppData,
      message: "One Application Delete Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
