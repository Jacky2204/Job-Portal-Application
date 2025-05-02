import express from "express";
import {
  createApp,
  getAllApplication,
  getOneApplication,
  deleteOneApplication,
} from "./../../controllers/ApplicationControllers/ApplicationController.js";
import { upload } from "./../../middlewares/MulterFile.js";

const ApplicationRoutes = express.Router();

ApplicationRoutes.post("/createApp", upload.single("resume"), createApp);
ApplicationRoutes.get("/getAllApplication", getAllApplication);
ApplicationRoutes.get("/getOneApplication/:id", getOneApplication);
ApplicationRoutes.delete("/deleteOneApplication/:id", deleteOneApplication);

export default ApplicationRoutes;
