import Job from "../../model/JobModel/JobModel.js";
import User from "./../../model/UserModel/UserModel.js";
import jwt from "jsonwebtoken";

export const createJob = async (req, res) => {
  const {
    companyName,
    title,
    category,
    country,
    city,
    location,
    description,
    salaryType,
    salaryFrom,
    salaryTo,
    jobType,
    user
  } = req.body;

  try {
    

    // Create the Job
    const JobData = await Job.create({
      companyName,
      title,
      category,
      country,
      city,
      location,
      description,
      salaryType,
      salaryFrom,
      salaryTo,
      jobType,
      user
    });

    res.status(200).json({
      success: true,
      data: JobData,
      message: "Job created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the job.",
      error: error.message,
    });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const JobData = await Job.find()

    res.status(200).json({
      success: true,
      data: JobData,
      message: "All Jobs Data Fetch Successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;
  try {
    const JobData = await Job.findOne({ _id: id });

    res.status(200).json({
      success: true,
      data: JobData,
      message: "One Job Data Fetch Successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneJob = async (req, res) => {
  const { id } = req.params;
  try {
    const JobData = await Job.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      data: JobData,
      message: "One Job deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    title,
    category,
    country,
    city,
    location,
    description,
    salaryType,
    salaryFrom,
    salaryTo,
    expired,
    jobType
  } = req.body;

  try {
    const updateJobData = await Job.updateOne(
      { _id: id },
      {
        $set: {
          companyName: companyName,
          title: title,
          category: category,
          country: country,
          city: city,
          location: location,
          description: description,
          salaryType: salaryType,
          salaryFrom: salaryFrom,
          salaryTo: salaryTo,
          expired: expired,
          jobType:jobType
        },
      }
    );

    res.status(200).json({
      success: true,
      data: updateJobData,
      message: "Job is updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
