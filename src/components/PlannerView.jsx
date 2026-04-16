import { DAYS, MEAL_TYPES } from "../data"

export default function PlannerView({
  mealPlan, plannedCount, totalCalories, groceryCount,
  onSlotClick, onRemove, onRecipeClick, onBrowse
}) {
  return (
    <div className="fade-up">
      <h1 className="section-title">Weekly Meal Plan</h1>
      <p className="subtitle">Plan your week, eat with intention.</p>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Meals Planned</div>
          <div className="stat-value">{plannedCount} <span>/ 21</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Calories</div>
          <div className="stat-value">{totalCalories.toLocaleString()} <span>kcal</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Per Meal</div>
          <div className="stat-value">
            {plannedCount > 0 ? Math.round(totalCalories / plannedCount) : 0} <span>kcal</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Grocery Items</div>
          <div className="stat-value">{groceryCount}</div>
        </div>
      </div>

      <div className="planner-grid">
        <div className="planner-header-cell"></div>
        {DAYS.map(d => (
          <div key={d} className="planner-header-cell">{d.slice(0, 3)}</div>
        ))}

        {MEAL_TYPES.map(meal => (
          <>
            <div key={`label-${meal}`} className="planner-label-cell">{meal}</div>
            {DAYS.map(day => {
              const key = `${day}-${meal}`
              const recipe = mealPlan[key]
              return (
                <div
                  key={key}
                  className="meal-slot"
                  onClick={() => !recipe && onSlotClick({ day, meal })}
                >
                  {recipe ? (
                    <div
                      className="meal-filled"
                      style={{
                        background: `${recipe.color}18`,
                        borderLeft: `3px solid ${recipe.color}`,
                      }}
                      onClick={(e) => { e.stopPropagation(); onRecipeClick(recipe) }}
                    >
                      <span className="meal-filled-emoji">{recipe.emoji}</span>
                      <span className="meal-filled-title">{recipe.title}</span>
                      <button
                        className="remove-btn"
                        onClick={(e) => { e.stopPropagation(); onRemove(key) }}
                      >✕</button>
                    </div>
                  ) : (
                    <span className="slot-add">+</span>
                  )}
                </div>
              )
            })}
          </>
        ))}
      </div>

      {plannedCount === 0 && (
        <div className="empty-state" style={{ marginTop: "40px" }}>
          <div className="empty-icon">🍽️</div>
          <h3>Your week is wide open</h3>
          <p>Click any slot above or browse recipes to start planning.</p>
          <button className="btn btn-gold" style={{ marginTop: "20px", padding: "12px 32px" }} onClick={onBrowse}>
            Browse Recipes →
          </button>
        </div>
      )}
    </div>
  )
}
