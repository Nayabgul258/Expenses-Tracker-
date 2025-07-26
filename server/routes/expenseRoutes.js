import express from "express";
const router = express.Router();
import {createExpense,getMyExpense,getAllExpenses,updateExpenseStatus} from "../controller/expenseController.js";
import {protect,restrictTo} from "../middleware/authMiddleware.js";


   
//Employee Routes

router.post("/",protect,restrictTo("employee"),createExpense);
router.get("/me",protect,restrictTo("employee"),getMyExpense);


//admin routes 

router.get("/",protect,restrictTo("admin"),getAllExpenses);
router.put("/:id/status",protect,restrictTo("admin"),updateExpenseStatus);


export default router;