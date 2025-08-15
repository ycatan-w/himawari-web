# 🌻 Himawari - The Journal

_**Plan your days, keep your memories — all in one place.**_

A modern agenda and journal application built with **Vue 3.5**, **TypeScript**, and **TailwindCSS**.
It allows you to create, edit, and delete events through an **interactive timeline** and supports multiple languages with persistent selection in the browser.

---

## 🚀 Live Demo

🔗 [View Demo](https://my-demo-site.com)

---

## ✨ Features

- 📌 **Event Management**
  - Create, edit, and delete events.
  - Automatically positioned on a daily timeline.
  - Handles overlapping events.

- 🌍 **Multi-language Support**
  - English 🇬🇧 and French 🇫🇷 included.
  - Persistent language choice using `localStorage`.
  - Easily extendable for more languages.

- 🔄 **Data Providers**
  - **API Provider**: Fetches and updates data from a backend.
  - **Local Provider**: Stores and retrieves data from `localStorage` (offline or demo mode).
  - Preloaded sample data for quick testing.

- 🎨 **Modern UI**
  - Built with TailwindCSS for responsive design.
  - Zoom in/out on the timeline.
  - Visual selection highlighting for events.

---

## 🛠️ Tech Stack

- **Vue 3.5** + `<script setup>`
- **TypeScript**
- **TailwindCSS**
- **vue-i18n** (internationalization)
- **LocalStorage** (local persistence)
- **Provider Pattern** (data source abstraction)

---

## 📦 Installation & Setup

### 1️⃣ Clone the project
```bash
git clone https://github.com/ycatan-w/himawari-web.git
cd himawari-web
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run in development mode

```bash
npm run dev
```

### 4️⃣ Build for production

```bash
npm run build
```

---

## 🗂️ Project Structure

```
index,html             # Web page entry point
src/
├─ assets/             # Image & style contents
├─ components/         # UI components
|  ├─ calendar
|  ├─ ui
|     ├─ forn
|     ├─ icons
|     └─ input
├─ locals/.            # translation messages
├─ modules/
│  ├─ providers/       # API & LocalStorage providers
│  ├─ lang.ts          # Centralized i18n config
│  ├─ auth.ts          # Auth
├─ utils/              # App helpers
├─ views/              # Main pages
│  ├─ auth/            # Main pages
│  ├─ calendar/        # Main pages
├─ main.ts             # App entry point
├─ rounter.ts          # App route definition
└─ App.vue             # Root component
```

---

## 🌍 Language Management

* Centralized language list (`modules/lang.ts`).
* Default language detected from `navigator.language`.
* Language preference stored in `localStorage` after selection.
