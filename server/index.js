require("dotenv").config()
const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const recipeRoutes = require("./routes/recipes")
const mealPlanRoutes = require("./routes/mealplan")

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/recipes", recipeRoutes)
app.use("/api/mealplan", mealPlanRoutes)

app.get("/api/health", (req, res) => res.json({ status: "ok" }))

app.listen(PORT, () => {
  console.log(`🍽️  Server running on http://localhost:${PORT}`)
})
