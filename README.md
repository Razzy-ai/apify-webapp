# ⚙️ Apify WebApp – Full-Stack Actor Runner App

A secure full-stack web app that lets users input their Apify API token, view available actors, run any actor, and view the results — all from a user-friendly interface.

> 🧠 Designed for learning purposes: API integration, token authentication, actor schema handling, and output rendering via React + Node.js.

---

## 🧰 Tech Stack

### 🖥 Backend:
- **Node.js**
- **Express.js**
- **TypeScript**
- **Axios** (for api call)
- **dotenv** (for  environment config)

### 💻 Frontend:
- **React.js**
- **Tailwind CSS**
- **Vite** (frontend dev server)
- **Axios**(for HTTP requests)
---


## 📁 Project Structure
```bash
apify-webapp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── apifyController.ts
│   │   ├── routes/
│   │   │   └── apifyRoutes.ts
│   │   ├── services/
│   │   │   └── apifyService.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── apify.ts
│   │   ├── components/
│   │   │   ├── TokenInput.tsx
│   │   │   ├── ActorList.tsx
│   │   │   ├── ActorForm.tsx
│   │   │   └── Output.tsx
│   │   └── App.tsx
│   └── package.json
├── assets
└── .gitignore

```

---

## 🔐 Authentication Flow
``` bash
Frontend (React)
   ↓
User enters token → Token sent with fetchActors()
   ↓
Backend (Express)
   ↓
Uses token to fetch actors from Apify → Sends back actor list
   ↓
User clicks on an actor → Clicks “Run Actor”
   ↓
Frontend sends actor ID + token to backend
   ↓
Backend runs the actor, polls for completion, fetches output
   ↓
Sends final output back to frontend → Output displayed
```
---


## 🚀 How to Install & Run the Application
### -✅ Prerequisites:
### -Node.js
### -npm
### -Apify account & API token
---

### ⚙️ Backend Setup

```bash
cd apify-webapp/backend
npm install
npm run dev
```

### 🔐 Create .env File

Make a `.env` file inside the `backend` folder and add:

```env
APIFY_API_TOKEN=your_api_token
```

### ⚙️ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

