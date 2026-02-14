# 🍳 Recipes - AI-Powered Recipe Discovery & Generation

A modern web application that helps users discover, generate, and customize recipes based on their dietary preferences, allergies, and available ingredients using AI and flavor science.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Integration](#api-integration)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

---

## 🎯 Overview

**Recipes** is an intelligent recipe platform that combines:

- **AI-Powered Recipe Generation** using Google Gemini
- **Flavor Science Analysis** from FlavorDB
- **Base Recipe Database** from Foodoscope (RecipeDB2)
- **Smart Dietary Customization** for allergies and constraints
- **User Profiles** for personalized experiences

The application uses a sophisticated pipeline that analyzes your preferences and generates custom recipes that are both delicious and tailored to your needs.

---

## ✨ Features

### User Features

- **🔐 User Authentication** - Sign up and log in with JWT-based security
- **👤 User Profiles** - Store dietary preferences and allergy information
- **📖 Recipe Discovery** - Browse recipes by cuisine, calories, and ingredients
- **🤖 AI Recipe Generation** - Generate custom recipes based on your constraints
- **🧪 Flavor Analysis** - Understand taste profiles and aroma components
- **🔄 Ingredient Substitution** - Get AI-recommended replacements for unavailable ingredients
- **📊 Nutrition Information** - View detailed nutritional content for recipes
- **⭐ Reviews & Ratings** - Rate and review recipes
- **📱 Dashboard** - View your saved recipes and preferences

### Scientific Features

- **Flavor Database Integration** - Access to thousands of flavor molecules and taste profiles
- **Food Pairing Science** - Recommended ingredient combinations based on flavor compatibility
- **Dietary Constraint Handling** - Automatic filtering and adaptation for allergies
- **Calorie-Aware Recipes** - Generate recipes within specified calorie ranges

---

## 🛠 Tech Stack

### Frontend

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (Radix UI based)
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack React Query
- **Testing**: Vitest

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Environment**: dotenv

### External APIs

- **Foodoscope (RecipeDB2)**: Base recipe database
- **FlavorDB**: Flavor molecules and ingredient pairing
- **Google Gemini**: AI recipe generation and refinement

---

## 📁 Project Structure

```
Recipes/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── layout/      # Header, Footer
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── pages/           # Page components (Auth, Dashboard, Recipe, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and types
│   │   ├── assets/          # Images and static files
│   │   └── test/            # Vitest test cases
│   ├── vite.config.ts       # Vite configuration
│   └── tailwind.config.ts   # Tailwind CSS config
│
├── backend/                  # Node.js/Express API
│   ├── routes/              # API routes (auth, dashboard, recipe)
│   ├── models/              # Mongoose schemas (User, Dashboard)
│   ├── services/            # Business logic
│   │   ├── foodoscopeService.js    # RecipeDB2 integration
│   │   ├── flavorDbService.js      # FlavorDB integration
│   │   └── geminiService.js        # Gemini AI integration
│   ├── middleware/          # Auth and request middleware
│   ├── config/              # Configuration files
│   ├── server.js            # Express server entry
│   └── .env.example         # Environment variables template
│
├── docs/
│   └── API_INTEGRATION.md   # Detailed API documentation
│
├── package.json             # Frontend dependencies
├── tsconfig.json            # TypeScript config
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager
- MongoDB (local or cloud instance)
- Google Gemini API key
- Foodoscope API credentials
- FlavorDB API credentials

### Quick Start

#### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd Recipes

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### 2. Configure Environment Variables

```bash
# Backend setup
cp backend/.env.example backend/.env

# Edit backend/.env with your credentials:
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: A secure random string
# - FOODOSCOPE_BASE_URL & API_KEY
# - FLAVORDB_BASE_URL & API_KEY
# - GEMINI_API_KEY: Your Google Gemini API key
```

#### 3. Start the Application

**Terminal 1 - Backend Server:**

```bash
cd backend
npm start
# Server runs on http://localhost:5001
```

**Terminal 2 - Frontend Development:**

```bash
npm run dev
# Application runs on http://localhost:5173
```

---

## 🔄 How It Works

### User Journey

1. **Authentication**
   - User signs up or logs in with email/password
   - JWT token issued for secure session management
   - User profile created with dietary preferences

2. **Recipe Generation**
   - User inputs:
     - Desired dish name
     - Dietary constraints (vegetarian, vegan, gluten-free, etc.)
     - Allergies (shellfish, nuts, eggs, etc.)
     - Available ingredients
     - Optional calorie limit
3. **AI Processing Pipeline**

   ```
   User Input
        ↓
   NLP Extraction & Normalization
        ↓
   Foodoscope → Base Recipe Search
        ↓
   FlavorDB → Flavor Analysis & Replacement Candidates
        ↓
   Google Gemini → Final Recipe Refinement
        ↓
   Custom Recipe Output
   ```

4. **Recipe Output**
   - Title and description
   - Ingredient list with quantities
   - Step-by-step instructions
   - Cooking time estimates
   - Nutritional information
   - Flavor profile analysis
   - Alternative ingredient suggestions

5. **Additional Features**
   - Save favorite recipes to dashboard
   - Rate and review recipes
   - Explore curated recipe collections
   - Access nutrition science information

---

## 🔌 API Integration

### Foodoscope (RecipeDB2)

**Purpose**: Base recipe database and nutritional information

**Key Methods**:

- `fetchBaseRecipe()` - Get recipe by title/cuisine
- `getRecipesByTitle(title)` - Search recipes
- `getRecipesByCuisine(region)` - Filter by region/cuisine
- `getRecipesByCalories(min, max)` - Calorie-aware search
- `getRecipeNutrition(recipeId)` - Nutritional data
- `getRecipeInstructions(recipeId)` - Step-by-step cooking

### FlavorDB

**Purpose**: Flavor molecules, taste profiles, and ingredient pairing

**Key Methods**:

- `getMoleculesByTasteThreshold()` - Get flavor molecules
- `searchMolecules(query)` - Search by flavor name
- `getFlavorDataForIngredients(names)` - Flavor analysis
- `getReplacementCandidates(ingredientName)` - Substitute suggestions

### Google Gemini

**Purpose**: AI-powered recipe refinement and generation

**Process**:

1. Receives base recipe from Foodoscope
2. Analyzes flavor data from FlavorDB
3. Considers user constraints and allergies
4. Generates final optimized recipe with detailed instructions

---

## 🔐 Environment Setup

Create a `.env` file in the `backend/` directory:

```dotenv
# Server Configuration
PORT=5001
MONGO_URI=mongodb://localhost:27017/recipes-db
JWT_SECRET=your-super-secret-jwt-key-change-this

# Foodoscope (RecipeDB2)
FOODOSCOPE_BASE_URL=http://cosylab.iiitd.edu.in:6969
FOODOSCOPE_API_KEY=your-foodoscope-api-key

# FlavorDB
FLAVORDB_BASE_URL=http://cosylab.iiitd.edu.in:6969/flavordb2
FLAVORDB_API_KEY=your-flavordb-api-key

# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🏃 Running the Application

### Development Mode

**Backend**:

```bash
cd backend
npm start
```

**Frontend**:

```bash
npm run dev
```

### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview

# Backend runs as-is (already in production mode)
cd backend
npm start
```

### Testing

```bash
# Run frontend tests
npm test

# Watch mode
npm run test:watch

# Backend tests
cd backend
npm test
```

---

## 📚 Available Pages

| Page                 | Route         | Purpose                            |
| -------------------- | ------------- | ---------------------------------- |
| **Dashboard**        | `/dashboard`  | View saved recipes and user data   |
| **Recipe Generator** | `/recipe`     | Create custom recipes              |
| **Recipe Details**   | `/recipe/:id` | View full recipe with instructions |
| **Science Hub**      | `/science`    | Learn about flavor science         |
| **Reviews**          | `/reviews`    | Read and write recipe reviews      |
| **Profile**          | `/profile`    | Manage dietary preferences         |
| **About**            | `/about`      | Learn about the platform           |
| **Auth**             | `/auth`       | Sign in / Sign up                  |

---

## 🎨 UI Components

The application uses Shadcn/ui components including:

- Form inputs (text, select, checkbox)
- Cards for recipes and content
- Dialogs and modals for interactions
- Tabs and accordions for organization
- Charts for nutritional data
- Toasts for notifications
- Tooltips and hover cards for information

---

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Dashboard

- `GET /api/dashboard` - Get user dashboard data
- `GET /api/dashboard/recipes` - Get saved recipes
- `POST /api/dashboard/recipes` - Save recipe

### Recipes

- `POST /api/recipe/generate` - Generate custom recipe
- `GET /api/recipe/:id` - Get recipe details
- `POST /api/recipe/:id/review` - Add review

### Health Check

- `GET /api/health` - Server status

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions:

- Check the [API Integration Documentation](./docs/API_INTEGRATION.md)
- Review existing issues on the repository
- Contact the development team

---

## 🎓 Learning Resources

- [Flavor Science 101](./docs/FLAVOR_SCIENCE.md)
- [RecipeDB2 API Docs](https://cosylab.iiitd.edu.in/)
- [FlavorDB Documentation](https://cosylab.iiitd.edu.in/flavordb2)
- [Google Gemini API Guide](https://ai.google.dev/)

---

**Happy Cooking! 🍽️**
