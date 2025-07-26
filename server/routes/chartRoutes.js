import express from "express";
import {expenseByCategory , monthlyExpenses} from "../controller/chatController.js";
import {protect, restrictTo} from "../middleware/authMiddleware.js";
const router = express.Router();



// Admin-only chart routes
router.get('/category', protect, restrictTo('admin'), expenseByCategory);
router.get('/monthly', protect, restrictTo('admin'),  monthlyExpenses);


export default router;
