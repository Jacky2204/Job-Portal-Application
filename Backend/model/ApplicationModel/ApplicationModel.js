import mongoose, { Schema, model } from "mongoose";

const ApplicationSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    coverLetter: {
      type: String,
      require: true,
    },
    resume: {
      type: String,
      require: true,
    },
    // populate user and job
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  },
  {
    timestamps: true,
  }
);

const Application = model("Application", ApplicationSchema);
export default Application;
