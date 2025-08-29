# 🌻 Himawari Web

Himawari Web is the **frontend application** of the Himawari project — a personal **journal, planner, and daily overview tool**.
It provides a clean and structured interface to help users **log their thoughts, plan their days, and visualize their schedule**.

This web client is designed to integrate with the future **Himawari backend (API/desktop)** for full synchronization and extended features.

---

## ✨ Features

* 🔐 **Authentication**: login & register views
* 📓 **Journal**:

  * Create and preview journal entries
  * Daily logs with structured forms
* 📅 **Daily Overview**:

  * Timeline and zoomable sections
  * Journal integration within daily view
* 📆 **Planner**:

  * Year, month, and day grids
  * Navigation between time scales
* 🌍 **Multi-language support** (English, French out of the box)

---

## 🌐 Demo

You can try a live demo here:
👉 [https://ycatan-w.github.io/himawari-web/](https://ycatan-w.github.io/himawari-web/)

**Demo credentials**:

* **Username**: `demo`
* **Password**: `demo`

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (>= 18 recommended)
* [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/himawari-web.git
cd himawari-web

# Install dependencies
pnpm install   # or npm install
```

### Development

```bash
# Start dev server
pnpm dev   # or npm run dev
```

This will start a Vite-powered dev server and open the app in your browser.

### Build for Production

```bash
pnpm build   # or npm run build
```

The production-ready files will be available in the `dist/` folder.

---

## 📂 Project Structure

```bash
src/
 ├─ App.vue              # Root component
 ├─ main.ts              # App entry point
 ├─ router.ts            # Vue Router configuration
 ├─ locales/             # i18n (EN/FR JSON translations)
 ├─ features/            # Core app features
 │   ├─ auth/            # Authentication views & composables
 │   ├─ journal/         # Journal components & hooks
 │   ├─ daily-overview/  # Timeline & overview
 │   └─ planner/         # Year/Month/Day planner views
```

---

## 🔗 Future Integration

This web frontend is part of the **Himawari ecosystem**:

* **Web**: main UI (this repo)
* **Backend API**: upcoming REST/GraphQL API to persist data
* **Desktop**: cross-platform desktop client (planned)

---

## 🛠️ Tech Stack

* [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) (development & build)
* [Vue Router](https://router.vuejs.org/)
* [Vue I18n](https://vue-i18n.intlify.dev/)
