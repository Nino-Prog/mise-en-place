# 🍽️ Mise en Place — Recipe & Meal Planner

A full-stack meal planning web app built with React, Node.js, Express, and PostgreSQL. Plan your weekly meals, browse recipes, and auto-generate grocery lists.

![App Preview](https://via.placeholder.com/800x400/0F0E0A/C9A96E?text=Mise+en+Place)

---

## Features

- **Weekly Planner** — Assign recipes to any day and meal slot (Breakfast, Lunch, Dinner)
- **Recipe Library** — Browse, search, and filter recipes by tag
- **Grocery List** — Auto-generated from your planned meals
- **Stats Dashboard** — Track total calories, meals planned, and more
- **Persistent Storage** — Meal plan saves locally (frontend) or to PostgreSQL (with backend)
- **JWT Auth** — Secure user accounts with register/login (backend)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS Variables |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| Deployment | AWS EC2 + Nginx (optional) |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (only needed for the backend)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mise-en-place.git
cd mise-en-place
```

---

### 2. Run the Frontend

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open your browser at **http://localhost:5173**

That's it! The frontend works standalone with local storage — no backend required to get started.

---

### 3. Run the Backend (Optional)

The backend enables user accounts and cloud-saved meal plans.

#### Set up PostgreSQL

1. Install PostgreSQL and make sure it's running
2. Create a database:

```sql
CREATE DATABASE mise_en_place;
```

#### Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your database credentials
```

#### Start the Server

```bash
cd server
npm install
npm run dev
```

The API will run at **http://localhost:3001**

---

## Project Structure

```
mise-en-place/
├── index.html               # App entry point
├── vite.config.js           # Vite configuration
├── package.json             # Frontend dependencies
├── .env.example             # Environment variable template
├── .gitignore
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Root component + state
│   ├── data.js              # Recipe data & constants
│   │
│   ├── components/
│   │   ├── PlannerView.jsx  # Weekly meal grid
│   │   ├── RecipesView.jsx  # Recipe browser
│   │   ├── GroceryView.jsx  # Grocery list
│   │   ├── RecipeModal.jsx  # Recipe detail + add to plan
│   │   └── SlotPickerModal.jsx  # Quick slot picker
│   │
│   └── styles/
│       └── global.css       # All styles + CSS variables
│
└── server/
    ├── index.js             # Express app entry
    ├── package.json         # Backend dependencies
    │
    ├── db/
    │   └── index.js         # PostgreSQL connection + schema
    │
    ├── middleware/
    │   └── auth.js          # JWT verification middleware
    │
    └── routes/
        ├── auth.js          # POST /register, POST /login
        ├── recipes.js       # CRUD for recipes
        └── mealplan.js      # GET/POST/DELETE meal plan slots
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Login and receive JWT |

### Recipes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all user recipes |
| POST | `/api/recipes` | Create a recipe |
| PUT | `/api/recipes/:id` | Update a recipe |
| DELETE | `/api/recipes/:id` | Delete a recipe |

### Meal Plan
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mealplan?week=YYYY-MM-DD` | Get week's meal plan |
| POST | `/api/mealplan` | Assign recipe to a slot |
| DELETE | `/api/mealplan` | Remove a slot |

---

## Roadmap

- [ ] Connect frontend to backend API
- [ ] User auth UI (login/register page)
- [ ] Add custom recipes
- [ ] Spoonacular API integration for thousands of recipes
- [ ] Nutritional breakdown charts
- [ ] Print-friendly grocery list
- [ ] Dark/light mode toggle
- [ ] Mobile responsive improvements

---

## Author

**Nino Ombongi**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: nino.ombongi.work@gmail.com

---

## License

MIT License — feel free to use and modify.
