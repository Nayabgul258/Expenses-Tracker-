import express from "express";
import {getAuditLog} from "../controller/auditController.js";
import {protect ,restrictTo} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect,restrictTo("admin"),getAuditLog);



export default router;