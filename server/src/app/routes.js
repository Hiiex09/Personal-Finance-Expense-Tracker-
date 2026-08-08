import { Router } from "express";

const router = Router();

router.get("/sample", (req, res) => {
  res.send("Sample route works!");
});

export default router;
