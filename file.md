# 📁 AgriTech Directory & File Structure

This document details the current structure of the AgriTech repository and diagrams where new files and directories should be added to implement future features.

---

## 🌳 Current & Future File Structure Diagram

```text
agri-tech/
├── .env.local                  # Local environment configurations (database URIs, secret keys)
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configurations
├── next.config.ts              # Next.js framework settings
├── feat.md                     # Features & backend analysis document
├── file.md                     # File structure and roadmap document (this file)
└── src/
    ├── Hook/                   # Custom React hooks
    │   └── useCart.ts
    ├── context/                # Context API states
    │   └── GlobalContext.tsx
    ├── provider/               # Provider wrappers (Session, UI providers)
    ├── types/                  # TypeScript interface declarations
    ├── utils/                  # Helper utilities (image upload, currency formatters)
    ├── middleware.ts           # Authentication route protection middleware
    │
    ├── lib/                    # Common helper libraries
    │   ├── dbConnect.ts        # Database connection client
    │   ├── auth.ts             # next-auth authentication configurations
    │   └── [NEW] models/       # Mongoose Schemas (highly recommended for future architecture)
    │       ├── User.ts         # User model
    │       ├── Product.ts      # Marketplace product model
    │       ├── Order.ts        # Transaction & orders model
    │       ├── Question.ts     # Forum question schema
    │       └── Answer.ts       # Forum answer schema
    │
    ├── components/             # Reusable UI Components
    │   ├── qa/
    │   │   └── qa-forum.tsx    # Forum page UI components
    │   ├── checkout/
    │   │   └── CheckoutPage.tsx
    │   └── [NEW] crop-planner/ # Future Crop Planner sub-components
    │       ├── CropCalendar.tsx
    │       └── SoilSelector.tsx
    │
    └── app/                    # Next.js App Router (Pages & APIs)
        ├── layout.tsx          # Root layout wrapper
        ├── page.tsx            # Landing homepage
        │
        ├── (auth)/             # Authentication views group
        │   ├── login/
        │   └── register/
        │
        ├── (dashboard)/        # Dashboard panel views group
        │   ├── dashboard/      # User dashboard pages
        │   └── adminDashboard/ # Admin panel pages
        │
        ├── (market)/           # Marketplace routes
        │   └── marketplace/
        │
        ├── cart/               # Cart flow
        │   ├── page.tsx
        │   └── checkout/       # Delivery info billing sheet
        │
        ├── checkout/           # Main payment checkout window
        │   └── page.tsx        # Payment checkout container
        │
        ├── community/          # Community Forums and events
        │   ├── page.tsx
        │   ├── forum/
        │   ├── groups/
        │   └── events/
        │
        ├── expert-help/        # Help channels
        │   ├── ai/             # Conversational expert bot
        │   └── qa/             # Expert Q&A forum
        │
        ├── tools/              # Farming calculators & applications
        │   ├── pest-detector/  # AI crop scanner via camera / upload
        │   ├── yield-calculator/
        │   └── crop-planner/   # Crop calendar planner (currently empty)
        │
        └── api/                # Next.js API Routes (Backend Endpoints)
            ├── auth/           # next-auth authentication endpoints
            ├── products/       # Products operations (GET / POST)
            ├── cart/           # Cart storage logic
            ├── gemini/         # Gemini-1.5-flash AI endpoint
            ├── sslcommerz/     # SSLCommerz callback routes (success, fail, cancel)
            │
            └── [NEW] qa/       # Future Q&A endpoint
                ├── route.ts    # Fetch all questions / submit new questions
                └── [id]/
                    └── route.ts# Handle individual question upvotes & answers
```

---

## 🚀 Key Files to Add for Future Features

### 1. Database Schemas (`src/lib/models/`)
*   `Question.ts` & `Answer.ts`: To store the community questions, categories, author details, upvote counts, and corresponding answers.
*   `CropData.ts`: Holds data for optimal temperature, pH levels, and seasons for different crops (to feed the crop planner algorithm).

### 2. Backend Q&A API Endpoints (`src/app/api/qa/`)
*   `src/app/api/qa/route.ts`:
    *   `GET`: Fetch questions filtered by category/popularity from the database.
    *   `POST`: Save a new question submitted by the user.
*   `src/app/api/qa/[id]/route.ts`:
    *   `POST`: Add answers to a question.
    *   `PATCH`: Increment/decrement votes.

### 3. Crop Planner Pages & Algorithms (`src/app/tools/crop-planner/`)
*   `src/app/tools/crop-planner/page.tsx`: Implementation of a calendar layout matching the crop guidelines with irrigation timers.
*   `src/app/api/crop-plan/route.ts`: API using Gemini or database rules to generate personalized planting timelines for users based on regional weather inputs.
