# ⚽ Football Match Guessing Bot

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![aiogram](https://img.shields.io/badge/aiogram-3.x-green.svg)](https://docs.aiogram.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1.svg?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 🎯 Predict football match scores, compete with friends, and climb the leaderboard!

![Demo](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Demo+GIF+Coming+Soon)

A fully functional Telegram bot for predicting football match scores and earning rewards. Built with **Python (aiogram 3.x)**, **PostgreSQL**, and **Docker**.

---

## 🚀 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) installed
- A [Telegram Bot Token](https://t.me/BotFather) from @BotFather
- Admin Telegram IDs

---

## ⚙️ Quick Start

### 1. Clone & Configure

```bash
git clone https://github.com/yourusername/football-match-guessing-bot.git
cd football-match-guessing-bot
cp .env.example .env
```

Edit `.env` with your credentials:

```ini
BOT_TOKEN=your_token_here
DATABASE_URL=postgresql+asyncpg://postgres:postgrespassword@db:5432/football_bot
ADMIN_IDS=12345,67890
```

### 2. Launch 🐳

```bash
docker-compose up --build
```

That's it! The bot will:
- 🐘 Start PostgreSQL
- 🔨 Build the bot image
- 🗄️ Run Alembic migrations
- 🤖 Start polling for messages

---

## 🎮 Features

### 👑 Admin Dashboard (`/admin`)

| Feature | Description |
|---------|-------------|
| ➕ **Add Match** | Guided wizard: Team A → Team B → Kickoff Time |
| 🏁 **Finalize Match** | Select open match → Enter final score → Auto-announce winners |
| 📋 **List Matches** | View all open matches at a glance |

> 🎉 **Auto Announcements**: Finalizing a match generates a rich public post with 🎆 celebration emojis, ⚽ match details, 🏆 winner list, and 📢 sponsored ad footer.

### 👤 User Experience (`/start`)

| Feature | Description |
|---------|-------------|
| ⚽ **Predict Matches** | Browse open matches and submit score predictions |
| 🏆 **Leaderboard** | Top 10 players ranked by points |
| 💰 **My Points** | Personal score and stats |

**Prediction Flow:**
```
1. Tap "Predict Matches" → 2. Click "🎲 Predict" → 3. Type "2-1" → Done!
```

---

## 🏗️ Architecture

```
football-match-guessing-bot/
│
├── 📁 app/
│   ├── 📁 models/          # SQLAlchemy database models
│   ├── 📁 routers/         # aiogram command & callback handlers
│   ├── 📁 services/        # Business logic & scoring engine
│   └── 📄 states.py        # FSM (Finite State Machine) states
│
├── 📁 alembic/             # Database migrations
├── 📄 bot.py               # Application entry point
├── 📄 docker-compose.yml   # Multi-container orchestration
├── 📄 Dockerfile           # Bot container image
├── 📄 .env.example         # Environment template
└── 📄 requirements.txt     # Python dependencies
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Bot Framework** | [aiogram 3.x](https://docs.aiogram.dev/) (async Telegram Bot API) |
| **Database** | [PostgreSQL 15+](https://www.postgresql.org/) |
| **ORM** | [SQLAlchemy 2.0](https://www.sqlalchemy.org/) + [asyncpg](https://magicstack.github.io/asyncpg/) |
| **Migrations** | [Alembic](https://alembic.sqlalchemy.org/) |
| **Containerization** | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) |

---

## 🛠️ Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-----------|-----|
| `Connection refused` to DB | `DATABASE_URL` hostname mismatch | Ensure hostname matches docker-compose service name (`db`) |
| Bot starts but commands fail | Migrations didn't run | Check logs: `docker-compose logs bot` — migrations auto-run on startup |
| `alembic upgrade head` fails | Schema drift | Reset: `docker-compose down -v` then `up --build` |
| Admin commands not working | `ADMIN_IDS` misconfigured | Verify comma-separated IDs with no spaces |

### Useful Commands

```bash
# View real-time logs
docker-compose logs -f bot

# Run migrations manually
docker-compose exec bot alembic upgrade head

# Reset database (⚠️ destroys data)
docker-compose down -v

# Rebuild after code changes
docker-compose up --build
```

---

## 🚀 Deployment

### Railway (Recommended)

1. Fork this repo
2. Create new project on [Railway](https://railway.app/)
3. Add PostgreSQL plugin
4. Set environment variables in Railway dashboard
5. Deploy!

### Render

1. Create a new Web Service
2. Connect your GitHub repo
3. Set `Dockerfile` as build method
4. Add PostgreSQL managed database
5. Configure env vars and deploy

### VPS / Self-Hosted

```bash
# Production build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code passes linting and includes tests where applicable.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [aiogram](https://docs.aiogram.dev/) team for the excellent async Telegram framework
- [SQLAlchemy](https://www.sqlalchemy.org/) for the powerful ORM
- Football fans everywhere ⚽

---

<div align="center">

⭐ **Star this repo if you find it useful!** ⭐

[Report Bug](https://github.com/yourusername/football-match-guessing-bot/issues) · [Request Feature](https://github.com/yourusername/football-match-guessing-bot/issues)

</div>
