const express = require("express")
const pool = require("../db")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// GET /api/recipes — get all recipes for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/recipes — create a recipe
router.post("/", authMiddleware, async (req, res) => {
  const { title, emoji, time_minutes, calories, servings, tags, ingredients, instructions, color } = req.body
  if (!title) return res.status(400).json({ error: "Title is required" })

  try {
    const result = await pool.query(
      `INSERT INTO recipes (user_id, title, emoji, time_minutes, calories, servings, tags, ingredients, instructions, color)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [req.userId, title, emoji, time_minutes, calories, servings, tags, ingredients, instructions, color]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/recipes/:id — update a recipe
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, emoji, time_minutes, calories, servings, tags, ingredients, instructions, color } = req.body
  try {
    const result = await pool.query(
      `UPDATE recipes SET title=$1, emoji=$2, time_minutes=$3, calories=$4, servings=$5,
       tags=$6, ingredients=$7, instructions=$8, color=$9
       WHERE id=$10 AND user_id=$11 RETURNING *`,
      [title, emoji, time_minutes, calories, servings, tags, ingredients, instructions, color, req.params.id, req.userId]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: "Recipe not found" })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/recipes/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await pool.query("DELETE FROM recipes WHERE id=$1 AND user_id=$2", [req.params.id, req.userId])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
