# 🌱 AgriTech – AI-Powered Platform for Farmers

AgriTech is a modern agricultural platform built to empower farmers, support sustainable farming practices, and bridge the supply chain gap using AI, IoT weather forecasts, and electronic payment gateways.

---

## 🌟 Core Features

1. 🌾 **AI-Based Pest & Disease Detector** (Route: [`/tools/pest-detector`](https://agritech-platform.vercel.app/tools/pest-detector)): Upload crop leaf images to identify diseases and receive instant biological or chemical treatment advisories powered by Google's **Gemini-1.5-flash** engine.
2. 🤖 **AI Farming Support Chatbot** (Route: [`/expert-help/ai`](https://agritech-platform.vercel.app/expert-help/ai)): Conversational agronomy advisor available 24/7 to answer agricultural questions about soil health, irrigation, crop varieties, and pest control.
3. 🛒 **Smart E-Commerce Marketplace** (Route: [`/marketplace`](https://agritech-platform.vercel.app/marketplace)): A central hub matching farmers directly with consumers and wholesale vendors, minimizing middleman exploitation.
4. 🔍 **Category & Advanced Filters** (Route: [`/marketplace`](https://agritech-platform.vercel.app/marketplace)): Ability to search, filter by categories (Seeds, Fertilizers, Crops, Tools, etc.), and sort products dynamically by price, date, and relevance.
5. 🛍️ **Dynamic Shopping Cart** (Route: [`/cart`](https://agritech-platform.vercel.app/cart)): Interactive cart tracking item quantities, real-time price summation, and local database persistence matching the authenticated user.
6. 📋 **Secure Shipping & Billing Collection** (Route: [`/cart/checkout`](https://agritech-platform.vercel.app/cart/checkout)): Comprehensive checkout flow collecting billing information, customer phone contact, and localized delivery address.
7. 💳 **SSLCommerz Sandbox Payment Gateway** (Route: [`/cart/checkout`](https://agritech-platform.vercel.app/cart/checkout)): Native integration of SSLCommerz to support direct secure credit/debit card, mobile banking, and net banking payments.
8. 🌐 **Stripe Payment Gateway Shell** (Route: [`/checkout`](https://agritech-platform.vercel.app/checkout)): Structured routing, client components, and hooks ready for processing international cards via Stripe.
9. 🔄 **Success, Fail, and Cancel Return Handlers** (Routes: [`/payment-success`](https://agritech-platform.vercel.app/payment-success), [`/payment-fail`](https://agritech-platform.vercel.app/payment-fail), [`/payment-cancel`](https://agritech-platform.vercel.app/payment-cancel)): Custom API callback controllers and landing pages that gracefully handle checkout responses from payment gateways.
10. 📈 **Farmer / Vendor Dashboard** (Route: [`/dashboard`](https://agritech-platform.vercel.app/dashboard)): Private management panel for farmers displaying active crop listings, total sales volume, orders completed, and dynamic shop analytics.
11. ➕ **Direct Product Listing Creation** (Route: [`/dashboard/products`](https://agritech-platform.vercel.app/dashboard/products)): Quick form tool on the farmer dashboard enabling vendors to publish new items with titles, photos, descriptions, and stock quantities.
12. 📦 **Order Management Console** (Route: [`/dashboard/orders`](https://agritech-platform.vercel.app/dashboard/orders)): Order routing dashboard that allows sellers to process, status-track, and manage purchases requested by consumers.
13. 👑 **Admin Administrative Suite** (Route: [`/adminDashboard`](https://agritech-platform.vercel.app/adminDashboard)): Global monitoring dashboard providing analytical summaries, system usage reports, listing control, and user role overrides.
14. 🌦️ **IoT Weather Station Widget** (Route: [`/dashboard/weather`](https://agritech-platform.vercel.app/dashboard/weather)): Localized weather alerts capturing current temperature, humidity, wind speeds, and custom suggestions for irrigation scheduling.
15. 🧮 **Agricultural Yield Calculator** (Route: [`/tools/yield-calculator`](https://agritech-platform.vercel.app/tools/yield-calculator)): Interactive tool helping farmers estimate potential crop output based on customized inputs like farm size, soil quality, and crop type.
16. 📅 **Crop Planner & Calendar** (Route: [`/tools/crop-planner`](https://agritech-platform.vercel.app/tools/crop-planner)): Future-proof scheduler indicating recommended dates for sowing, fertilizer application, weeding, and crop harvesting.
17. 💬 **Expert Q&A Discussion Forum** (Route: [`/expert-help/qa`](https://agritech-platform.vercel.app/expert-help/qa)): Interactive portal allowing community members to ask agronomy questions and receive votes and answers from agricultural experts.
18. 👥 **Community Group Hub** (Route: [`/community`](https://agritech-platform.vercel.app/community)): Platform sections for creating local farming groups, sharing resources, and scheduling community farming events.
19. 📚 **Educational Resources Portal** (Route: [`/resources`](https://agritech-platform.vercel.app/resources)): Directory of articles, videos, and guides focusing on organic farming, high-yield seeds, and modern water conservation.
20. 🏛️ **Government Subsidies & Schemes Index** (Route: [`/resources/schemes`](https://agritech-platform.vercel.app/resources/schemes)): Database of active financial aids, grants, and crop insurance policies supplied by state departments to empower rural farmers.

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS, Context API |
| **Backend** | Next.js Serverless Route Handlers (`/api/...`) |
| **Database** | MongoDB (Native connection caching) |
| **Authentication** | NextAuth.js (Credentials, Google, and GitHub OAuth) |
| **APIs** | Google Generative AI (Gemini SDK), OpenAI SDK, OpenWeatherMap API |
| **Payments** | SSLCommerz Sandbox Gateway |

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
pnpm install
```

### 3. Setup Environment Variables
Copy the environment variables template and fill in your keys:
```bash
cp .env.example .env.local
```
Update your MongoDB URI, NextAuth secrets, Google Gemini API Key, OpenWeatherMap key, and SSLCommerz credentials in your newly created `.env.local` file.

### 4. Seed the Database
Populate your MongoDB database with initial listings and agricultural supplies:
```bash
node seed.js
```

### 5. Run the Application
Start the Next.js local development server:
```bash
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

### 6. Build & Lint
To verify codebase code style compliance and build a production-ready package:
```bash
pnpm lint
pnpm build
```

---


