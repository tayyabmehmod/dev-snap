# DevSnap 🚀

**Build Your Developer Portfolio in Seconds**

A modern full-stack SaaS portfolio builder with live preview, built with React (Vite) + Tailwind CSS + Python Flask.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| HTTP Client | Axios |
| Backend | Python Flask |
| ORM | Flask-SQLAlchemy |
| Database | SQLite |
| CORS | Flask-CORS |

---

## Features

- ⚡ **Live Preview** — Portfolio updates in real time as you type
- 🎨 **3 Templates** — Glass, Minimal, Cyber
- 📄 **Export** — Download as HTML or JSON
- 💾 **Save** — REST API persists portfolios to SQLite
- 📊 **Dashboard** — Admin page with search, pagination, stats
- 🔒 **Full-stack** — React frontend + Flask REST API

---

## Getting Started

### Backend (Flask)

```bash
cd server
pip install -r requirements.txt
python app.py
```

Flask runs on: **http://localhost:5000**

### Frontend (React + Vite)

```bash
cd client

# If node/npm are not in PATH, use the Playwright node:
$node = "C:\Users\<YOUR_USER>\AppData\Local\ms-playwright-go\1.57.0\node.exe"
$npm  = "C:\Users\<YOUR_USER>\AppData\Local\ms-playwright-go\1.57.0\npm_pkg\package\bin\npm-cli.js"

& $node $npm install
& $node $npm run dev
```

Vite dev server: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/portfolio` | Create portfolio |
| GET | `/api/portfolio/<id>` | Get portfolio by ID |
| PUT | `/api/portfolio/<id>` | Update portfolio |
| GET | `/api/portfolios` | List portfolios (paginated + search) |
| DELETE | `/api/portfolio/<id>` | Delete portfolio |
| GET | `/api/stats` | Get statistics |

---

## Project Structure

```
devsnap/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── DeveloperForm.jsx
│   │   │   ├── PortfolioPreview.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── SkillTag.jsx
│   │   │   ├── TemplateSelector.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── ExportButton.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── hooks/
│   │   │   ├── usePortfolio.js
│   │   │   └── useApi.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── server/
    ├── app.py
    ├── models/
    │   └── portfolio.py
    ├── routes/
    │   └── portfolio_routes.py
    ├── database/
    │   └── db.py
    └── requirements.txt
```
