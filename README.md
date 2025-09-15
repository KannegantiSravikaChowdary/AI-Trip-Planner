# 🌍 TripMate – AI Trip Planner

🚀 **TripMate** is your AI-powered personal travel assistant. It generates personalized itineraries, recommends hotels & attractions, and helps you plan your dream trip based on your interests, budget, and travel style.

## ✨ Features

- 🔑 **Google Authentication** – Secure sign-in with Google OAuth
- 🤖 **AI-Powered Itineraries** – Tailored recommendations for destinations, activities, and hotels
- 🏨 **Hotel Suggestions** – Get curated hotel recommendations
- 📍 **Place Recommendations** – Discover must-visit attractions
- 💾 **Save & Manage Trips** – Store itineraries and view them anytime
- 🎨 **Clean UI/UX** – Built with React + Tailwind for a modern interface

## 🖥️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, ShadCN UI
- **Backend/AI**: Node.js (optional for API integration), AI itinerary generation
- **Auth**: Google OAuth (@react-oauth/google)
- **Database**: Firebase (for user storage & trips)
- **API Calls**: Axios

## 🚀 How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd TripMate
2. **Install dependencies:**
   ```
   npm install
   ```
4. **Configure Firebase & Google OAuth credentials in a .env file:**
   ```
   VITE_GOOGLE_AUTH_CLIENT_ID=your-client-id
   
   VITE_GEMINI_API_AI_KEY=your-api-key
   
   VITE_GOOGLE_PLACES_API_KEY=your-api
   ```
6. **Start the app:**
   
    npm run dev
   ```
