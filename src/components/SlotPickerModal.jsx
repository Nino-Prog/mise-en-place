export default function SlotPickerModal({ slot, recipes, mealPlan, onSelect, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box slide-in" style={{ maxWidth: "420px" }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <div className="modal-title">Choose a Recipe</div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {slot.day} · {slot.meal}
          </div>
        </div>
        <div style={{ padding: "16px", maxHeight: "400px", overflowY: "auto" }}>
          {recipes.map(recipe => (
            <button
              key={recipe.id}
              className="slot-recipe-btn"
              onClick={() => onSelect(recipe)}
            >
              <span style={{ fontSize: "24px" }}>{recipe.emoji}</span>
              <div>
                <div className="slot-recipe-name">{recipe.title}</div>
                <div className="slot-recipe-meta">⏱ {recipe.time}m · 🔥 {recipe.calories} cal</div>
              </div>
              <span className="slot-recipe-add">+</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
