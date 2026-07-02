# 🌱 AgriTech – AI-Powered Platform for Farmers

AgriTech is a modern agricultural platform built to empower farmers, support sustainable farming practices, and bridge the supply chain gap using AI, IoT weather forecasts, and electronic payment gateways.

---

## 🌟 Core Features

*   🌾 **AI-Based Pest & Disease Detector**: Upload crop leaves to identify diseases and receive instant biological or chemical treatment advisories using the **Gemini-1.5-flash** engine.
*   🛒 **Smart E-Commerce Marketplace**: Connects farmers directly with buyers and agricultural vendors. Features category filtering, dynamic sorting, and cart/checkout systems.
*   🤖 **AI Farming Support Chatbot**: An on-demand agricultural advisor trained to answer queries regarding soil, crops, and pest management.
*   📊 **Farmer & Admin Dashboards**: Farmer panels to manage active product listings and received orders, alongside admin interfaces for overall platform governance.
*   🌦️ **Live Weather Station Alerts**: Localized weather parameters coupled with warnings to plan irrigation and harvesting.
*   💸 **Secure Payments**: Integration of SSLCommerz sandbox payments for transactions and layout architectures for Stripe.

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS, Context API |
| **Backend** | Next.js Serverless Route Handlers (`/api/...`) |
| **Database** | MongoDB (Native connection caching) |
| **Authentication** | NextAuth.js (Credentials, Google, and GitHub OAuth) |
| **APIs** | Google Generative AI (Gemini SDK), OpenWeatherMap API |
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

---


