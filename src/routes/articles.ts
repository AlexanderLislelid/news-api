import { Router, Request, Response } from "express";
import { pool } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM articles ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authenticateToken, async (req: Request, res: Response) => {
  const { title, body, category } = req.body;

  if (!title || !body || !category) {
    res.status(400).json({ error: "Title, body, and category are required" });
    return;
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
      [title, body, category, req.user!.userId],
    );
    res
      .status(201)
      .json({ message: "Article created", id: (result as any).insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
