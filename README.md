# ✈️ My Travel App

A responsive travel article web application built with **Vue.js 3**, **TypeScript**, and **Pinia**, using the provided dummy API. This app allows users to register, log in, and manage travel articles with full CRUD functionality, including categories and comments.

## 🚀 Features

- 🔐 User authentication (Login, Register, Logout)
- 📚 List of articles with:
  - Infinite scroll
  - Search and filter by category or title
- 📝 Article detail page with:
  - Author and date
  - Comments (lazy-loaded)
  - Add, edit, delete comments
- ✍️ Create, Edit, and Delete articles (with image upload)
- 🗂 Category management with modal-based CRUD
- 📱 Responsive design for desktop & mobile
- 💾 User credentials saved via `localStorage`
- 🧠 Type-safe with TypeScript
- 📦 State management using Pinia
- 🧩 Error and loading state handling across the app

## 🛠 Tech Stack

- **Frontend:** Vue 3 + TypeScript + Vite
- **UI Framework:** Bootstrap Vue Next
- **State Management:** Pinia
- **HTTP Client:** Axios
- **Validation:** Native (optional: Zod/Yup could be added)
- **Routing:** Vue Router
- **Auth Token:** Stored via `localStorage`
- **API:** Provided Strapi API

## 📦 Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Folder Structure

```bash
src/
├─ api/                 # Axios instance
├─ assets/              # Colors, images, constants
├─ components/          # Reusable UI and rocket components
├─ pages/               # Views (list, detail, create)
├─ router/              # Routing config
├─ types/               # Typescript interface
├─ store/               # Pinia stores
├─ utils/               # Helper functions
└─ main.ts              # Entry point
```

## 🧑‍🚀 Author

Developed by Rizky Ari

[Linkedin](https://www.linkedin.com/in/rizkyarihar/) | [GitHub](https://github.com/rizkyari)