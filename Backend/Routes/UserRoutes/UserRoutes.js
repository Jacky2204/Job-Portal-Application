import express from "express";
import {
  Register,
  Login,
  getAllUser,
  getOneUser,
  deleteUser,
  updateUser,
} from "../../controllers/UserControllers/UserController.js";
import { upload } from "./../../middlewares/MulterFile.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("profilepic"), Register);
UserRoutes.post("/login", Login);
UserRoutes.get("/getAllUser", getAllUser);
UserRoutes.get("/getOneUser/:id", getOneUser);
UserRoutes.delete("/deleteUser/:id", deleteUser);
UserRoutes.put("/updateUser/:id", upload.single("profilepic"), updateUser);

export default UserRoutes;
