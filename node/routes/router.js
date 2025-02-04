import express from "express";
import {
    getAllUsers, createUser, getUserById, getUserByEmailAndPassword,
    updateUserById
} from "../controllers/AppController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById)
router.post('/login', getUserByEmailAndPassword)
router.put('/:id', updateUserById)

export default router;