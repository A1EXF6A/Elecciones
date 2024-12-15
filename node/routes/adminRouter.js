import express from "express";
import getAdminByEmailAndPassword from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/login', getAdminByEmailAndPassword)

export default adminRouter;