import { useState, useEffect } from "react"
import { RECIPES, DAYS, MEAL_TYPES, ALL_TAGS } from "./data"
import PlannerView from "./components/PlannerView"
import RecipesView from "./components/RecipesView"
import GroceryView from "./components/GroceryView"
import RecipeModal from "./components/RecipeModal"
import SlotPickerModal from "./components/SlotPickerModal"
import "./styles/global.css"

export default function App() {
  const [view, setView] = useState("planner")
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem("mealPlan")
    return saved ? JSON.parse(saved) : {}
  })
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan))
  }, [mealPlan])

  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 2500)
  }

  const addToMealPlan = (day, mealType, recipe) => {
    setMealPlan(prev => ({ ...prev, [`${day}-${mealType}`]: recipe }))
    setSelectedSlot(null)
    setSelectedRecipe(null)
    showNotification(`${recipe.emoji} ${recipe.title} added to ${day} ${mealType}`)
  }

  const removeFromPlan = (key) => {
    setMealPlan(prev => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const getGroceryList = () => {
    const items = {}
    Object.values(mealPlan).forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        items[ing] = (items[ing] || 0) + 1
      })
    })
    return Object.entries(items)
  }

  const totalCalories = () =>
    Object.values(mealPlan).reduce((sum, r) => sum + r.calories, 0)

  const plannedCount = Object.keys(mealPlan).length
  const groceryItems = getGroceryList()

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-accent">Mise</span> en Place
        </div>
        <nav className="nav">
          {[["planner", "📅 Planner"], ["recipes", "🍴 Recipes"], ["grocery", "🛒 Grocery"]].map(([v, label]) => (
            <button
              key={v}
              className={`nav-btn ${view === v ? "active" : ""}`}
              onClick={() => setView(v)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {notification && <div className="notification">{notification}</div>}

      <main className="main">
        {view === "planner" && (
          <PlannerView
            mealPlan={mealPlan}
            plannedCount={plannedCount}
            totalCalories={totalCalories()}
            groceryCount={groceryItems.length}
            onSlotClick={setSelectedSlot}
            onRemove={removeFromPlan}
            onRecipeClick={setSelectedRecipe}
            onBrowse={() => setView("recipes")}
          />
        )}
        {view === "recipes" && (
          <RecipesView
            recipes={RECIPES}
            tags={ALL_TAGS}
            onRecipeClick={setSelectedRecipe}
          />
        )}
        {view === "grocery" && (
          <GroceryView
            groceryItems={groceryItems}
            mealPlan={mealPlan}
            onGoPlanner={() => setView("planner")}
          />
        )}
      </main>

      {selectedSlot && !selectedRecipe && (
        <SlotPickerModal
          slot={selectedSlot}
          recipes={RECIPES}
          mealPlan={mealPlan}
          onSelect={(recipe) => addToMealPlan(selectedSlot.day, selectedSlot.meal, recipe)}
          onClose={() => setSelectedSlot(null)}
        />
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          mealPlan={mealPlan}
          onAdd={addToMealPlan}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}
