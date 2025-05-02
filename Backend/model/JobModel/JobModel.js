import mongoose, { Schema, model } from "mongoose";

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salaryType: {
      type: String,
      enum: ["fixed", "range"],
      required: true,
    },
    salaryFrom: {
      type: Number,
      required: true,
    },
    salaryTo: {
      type: Number,
    },
    expired: {
      type: String,
      enum: ["true", "false"],
      required: true,
      default: "false",
    },
    jobType: {
      type: String,
      required: true,
      enum: [
        "Remote",
        "Hybrid",
        "On-Site",
        "Full-Time",
        "Part-Time",
        "Contract",
        "Temporary",
        "Internship",
      ],
    },

    // populate user
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const Job = model("Job", JobSchema);
export default Job;
