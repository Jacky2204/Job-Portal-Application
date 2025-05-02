import express from "express";
import {
  createJob,
  getAllJob,
  getOneJob,
  deleteOneJob,
  updateJob
} from "./../../controllers/JobControllers/JobControllers.js";

const JobRoutes = express.Router();

JobRoutes.post("/create", createJob);
JobRoutes.get("/getAllJob", getAllJob);
JobRoutes.get("/getOneJob/:id", getOneJob);
JobRoutes.delete("/deleteOneJob/:id", deleteOneJob);
JobRoutes.put("/updateJob/:id", updateJob);

export default JobRoutes;
