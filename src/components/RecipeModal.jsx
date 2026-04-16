import { DAYS, MEAL_TYPES } from "../data"

export default function RecipeModal({ recipe, mealPlan, onAdd, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box slide-in" onClick={e => e.stopPropagation()}>
        <div
          className="modal-header"
          style={{ background: `${recipe.color}18`, borderBottom: `1px solid ${recipe.color}30` }}
        >
          <span style={{ fontSize: "48px" }}>{recipe.emoji}</span>
          <div>
            <div className="modal-title">{recipe.title}</div>
            <div className="recipe-meta" style={{ marginBottom: 0 }}>
              <span>⏱ {recipe.time} min</span>
              <span>🔥 {recipe.calories} cal</span>
              <span>👥 {recipe.servings} serving{recipe.servings > 1 ? "s" : ""}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="tag-row">
            {recipe.tags.map(t => (
              <span
                key={t}
                className="tag"
                style={{
                  background: `${recipe.color}20`,
                  color: recipe.color,
                  border: `1px solid ${recipe.color}40`
                }}
              >{t}</span>
            ))}
          </div>

          <div className="section-label">Ingredients</div>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="ingredient-item">
                <span style={{ color: recipe.color, fontSize: "8px" }}>●</span> {ing}
              </li>
            ))}
          </ul>

          <div className="section-label">Instructions</div>
          <div className="instructions">{recipe.instructions}</div>

          <div className="section-label">Add to Meal Plan</div>
          {DAYS.map(day => (
            <div key={day} className="slot-day-row">
              <span className="slot-day-label">{day.slice(0, 3)}</span>
              {MEAL_TYPES.map(meal => {
                const taken = !!mealPlan[`${day}-${meal}`]
                return (
                  <button
                    key={meal}
                    className={`slot-meal-btn ${taken ? "taken" : ""}`}
                    onClick={() => !taken && onAdd(day, meal, recipe)}
                  >
                    {taken ? `✓ ${meal}` : meal}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
