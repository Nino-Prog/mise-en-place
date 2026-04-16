const express = require("express")
const pool = require("../db")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// GET /api/mealplan?week=2025-02-10
router.get("/", authMiddleware, async (req, res) => {
  const { week } = req.query
  if (!week) return res.status(400).json({ error: "week query param required (YYYY-MM-DD)" })

  try {
    const result = await pool.query(
      `SELECT mp.*, r.title, r.emoji, r.calories, r.color, r.ingredients
       FROM meal_plans mp
       LEFT JOIN recipes r ON mp.recipe_id = r.id
       WHERE mp.user_id = $1 AND mp.week_start = $2`,
      [req.userId, week]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/mealplan — assign recipe to a slot
router.post("/", authMiddleware, async (req, res) => {
  const { week_start, day_of_week, meal_type, recipe_id } = req.body
  if (!week_start || !day_of_week || !meal_type || !recipe_id) {
    return res.status(400).json({ error: "week_start, day_of_week, meal_type, recipe_id required" })
  }

  try {
    const result = await pool.query(
      `INSERT INTO meal_plans (user_id, week_start, day_of_week, meal_type, recipe_id)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (user_id, week_start, day_of_week, meal_type)
       DO UPDATE SET recipe_id = EXCLUDED.recipe_id
       RETURNING *`,
      [req.userId, week_start, day_of_week, meal_type, recipe_id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/mealplan — remove a slot
router.delete("/", authMiddleware, async (req, res) => {
  const { week_start, day_of_week, meal_type } = req.body
  try {
    await pool.query(
      "DELETE FROM meal_plans WHERE user_id=$1 AND week_start=$2 AND day_of_week=$3 AND meal_type=$4",
      [req.userId, week_start, day_of_week, meal_type]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
