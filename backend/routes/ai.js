import express from "express";
import { chat,testCollection,search} from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/chat",authMiddleware, chat);
router.get("/collection",authMiddleware, testCollection);
router.post("/search", authMiddleware, search);

export default router;