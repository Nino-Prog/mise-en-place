import { useState } from "react"

export default function RecipesView({ recipes, tags, onRecipeClick }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTag, setFilterTag] = useState("All")

  const filtered = recipes.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchTag = filterTag === "All" || r.tags.includes(filterTag)
    return matchSearch && matchTag
  })

  return (
    <div className="fade-up">
      <h1 className="section-title">Recipe Library</h1>
      <p className="subtitle">{recipes.length} recipes ready to plan.</p>

      <div className="search-row">
        <input
          className="search-input"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {tags.map(tag => (
          <button
            key={tag}
            className={`filter-pill ${filterTag === tag ? "active" : ""}`}
            onClick={() => setFilterTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="recipe-grid">
        {filtered.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => onRecipeClick(recipe)}>
            <div
              className="recipe-card-top"
              style={{ background: `${recipe.color}20`, borderBottom: `1px solid ${recipe.color}30` }}
            >
              <span className="recipe-emoji">{recipe.emoji}</span>
              <div>
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-meta">
                  <span>⏱ {recipe.time}m</span>
                  <span>🔥 {recipe.calories} cal</span>
                </div>
              </div>
            </div>
            <div className="recipe-card-body">
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
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px" }}>
                {recipe.ingredients.length} ingredients
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No recipes found</h3>
          <p>Try a different search or filter.</p>
        </div>
      )}
    </div>
  )
}
