import express from "express";
import { chat,testCollection  } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/chat", chat);
router.get("/collection", testCollection);

export default router;