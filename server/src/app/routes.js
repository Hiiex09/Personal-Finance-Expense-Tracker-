import { Router } from "express";
import authRoutes from "../features/auth/auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/sample", (req, res) => {
  res.send("Sample route works!");
});

export default router;
