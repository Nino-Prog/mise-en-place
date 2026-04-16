import { DAYS, MEAL_TYPES } from "../data"

export default function GroceryView({ groceryItems, mealPlan, onGoPlanner }) {
  if (groceryItems.length === 0) {
    return (
      <div className="fade-up">
        <h1 className="section-title">Grocery List</h1>
        <p className="subtitle">Everything you need for the week.</p>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Cart is empty</h3>
          <p>Plan some meals first and your grocery list will appear here.</p>
          <button className="btn btn-gold" style={{ marginTop: "20px", padding: "12px 32px" }} onClick={onGoPlanner}>
            Go to Planner →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <h1 className="section-title">Grocery List</h1>
      <p className="subtitle">Everything you need for the week.</p>

      <div className="grocery-container">
        <div className="grocery-section">
          <div className="grocery-section-title">🧾 {groceryItems.length} Items</div>
          {groceryItems.map(([item, count], i) => (
            <div key={i} className="grocery-item">
              <span style={{ color: "var(--gold)", fontSize: "8px" }}>●</span>
              <span style={{ flex: 1 }}>{item}</span>
              {count > 1 && <span className="grocery-badge">×{count}</span>}
            </div>
          ))}
        </div>

        <div className="grocery-section">
          <div className="grocery-section-title">📅 Planned Meals</div>
          {DAYS.map(day => {
            const dayMeals = MEAL_TYPES.filter(m => mealPlan[`${day}-${m}`])
            if (dayMeals.length === 0) return null
            return (
              <div key={day} style={{ marginBottom: "16px" }}>
                <div style={{
                  fontSize: "11px", color: "var(--gold)", textTransform: "uppercase",
                  letterSpacing: "0.5px", marginBottom: "6px"
                }}>{day}</div>
                {dayMeals.map(m => {
                  const r = mealPlan[`${day}-${m}`]
                  return (
                    <div key={m} className="grocery-item">
                      <span>{r.emoji}</span>
                      <span style={{ flex: 1 }}>{r.title}</span>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{m}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
