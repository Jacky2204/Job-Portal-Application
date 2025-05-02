import express from "express";
import UserRoutes from "../Routes/UserRoutes/UserRoutes.js";
import JobRoutes from "../Routes/JobRoutes/JobRoutes.js";
import ApplicationRoutes from "../Routes/ApplicationRoutes/ApplicationRoutes.js";

const AllRouter = express.Router();

AllRouter.use("/user", UserRoutes);
AllRouter.use("/job", JobRoutes);
AllRouter.use("/app", ApplicationRoutes);

export default AllRouter;
