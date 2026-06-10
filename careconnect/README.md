# CareConnect - AI-Powered Healthcare Support Platform for NGOs

🩺 **CareConnect** is a modern, responsive NGO healthcare support web application designed to bridge the gap between patients in need, dedicated volunteers, and NGO administrators. The application incorporates smart client-side data management, automated analytics summaries, and a live AI FAQ Chatbot assistant.

---

## Project Overview

CareConnect enables NGOs to manage support requests, track volunteer signups, and query operational statistics dynamically. Patients can submit structured support requests detailing their symptoms, location, and urgency levels. Volunteers can register their profiles with availability and skills. NGO coordinators can oversee these operations in real time from a high-fidelity administrative dashboard featuring charts and an AI-generated data summary analysis.

---

## Tech Stack

* **React.js (Vite)** – High-performance single page application framework.
* **Tailwind CSS (v4)** – Premium utility-first styling with dark/light mode toggle.
* **React Router DOM** – Declarative navigation between pages.
* **React Hook Form** – Robust forms validation and error messaging.
* **Framer Motion** – Micro-animations, page slide transitions, and smooth hover effects.
* **Recharts** – Interactive operational charts (pie chart for urgencies and bar chart for city counts).
* **Local Storage** – Persistent, zero-backend data storage.
* **Lucide Icons** – Modern icon sets.
* **Gemini API** – Real-time generative AI conversational chatbot assistant.

---

## Key Features

1. **Empathetic Landing Page:** A premium hero header, mission statement, counts for patients helped, features grid (Bento box), and reviews slider.
2. **Patient Support Form:** Client-side validated form with field requirements (Email, Phone, Age > 0). Submissions save to Local Storage and display in the Admin Dashboard.
3. **Volunteer Registration:** Simplified signup form with skill selector pills and availability scheduling.
4. **Interactive AI FAQ Assistant:** An interactive chatbot panel that answers suggested operational questions instantly with typing indicators, auto-scroll, and timestamps, powered by the **Gemini API** with local rule-based fallback.
5. **AI Data Summary Generator:** A backend-free script that scans local storage logs to synthesize metrics, showing total patient load, most common concern types, priorities counts, and volunteer metrics.
6. **Administrative Dashboard:**
   * Analytics Cards for volunteers, total patients, and urgency status.
   * Urgency Pie Chart and Requests by City Bar Chart.
   * Operational search filters, sorting, and dynamic lists.
7. **Animated Dark Mode Toggle:** Persisted light/dark themes with custom color palettes.

---

## AI Features & NGO Use Case

### 1. Generative AI FAQ Assistant
Powered by the **Gemini 1.5 Flash** model, the conversational chatbot provides instant responses to user questions regarding medical navigation, logistics, and scheduling. It operates with custom system instructions to ensure answers remain safe, empathetic, and professional. If the client is offline or the API key is limited, it safely defaults to localized rule-based question matches.

### 2. Automated Operational Summary
An AI-like heuristic function `generateSummary()` parses patient logs, groups concerns using keyword matching, identifies high-priority cases, extracts the latest geographic requests, and formats these insights into a concise summary block displayed inside a premium glassmorphic widget.

### 3. NGO Administrative Use Case
NGO coordinators can easily look up requests by city, filter by priority levels (Low, Medium, High), sort from oldest to newest, and monitor volunteer counts. This helps coordinate care packages and nurse allocations efficiently without requiring heavy database backends.

---

## Installation & Running Locally

Follow these steps to run the project in your local development environment:

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher is recommended).

### 1. Install Dependencies
Navigate to the project directory and install the package dependencies:
```bash
npm install
```

### 2. Launch Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open your browser and navigate to the local address displayed (typically `http://localhost:5173`).

---

## Build for Production

To compile the files for a production deployment:

```bash
npm run build
```

This creates an optimized, minified bundle inside the `dist/` directory, ready to be deployed.

---

## Deployment

The application is completely configured and ready for a zero-config deployment on **Vercel**:

1. Link your GitHub repository to Vercel.
2. Set the **Root Directory** settings to `careconnect`.
3. Vercel will automatically detect Vite, install dependencies, compile the project, and deploy it to a production URL.
