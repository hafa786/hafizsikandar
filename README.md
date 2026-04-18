# Hafiz Sikandar — Portfolio

A modern, dark-themed portfolio built with **React + TypeScript**, served via **Docker + Nginx**.

## 🚀 Run with Docker (recommended)

```bash
# Build and start
docker-compose up --build

# Visit http://localhost:3000
```

## 💻 Run locally (development)

```bash
npm install --legacy-peer-deps
npm start
# Visit http://localhost:3000
```

## 🏗️ Build for production

```bash
npm run build
```

## 📦 Docker (manual)

```bash
docker build -t hafiz-portfolio .
docker run -p 3000:80 hafiz-portfolio
```

## Tech Stack

- React 18 + TypeScript
- CSS-in-JS (inline styles with CSS variables)
- Nginx (production server)
- Docker multi-stage build
- Google Fonts: Syne + Space Mono
