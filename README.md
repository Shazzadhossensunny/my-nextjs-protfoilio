# Next.js Portfolio & Blog Website

🚀 **Live Site:** [My Portfolio](https://my-nextjs-portfolio-murex.vercel.app/)

## 📌 Project Overview

This is a **personal portfolio and blog website** built with Next.js, TypeScript, and Tailwind CSS. It features a clean, modern design with role-based authentication and a dashboard for managing projects, blogs, and messages.

## ✨ Features

### Public Pages:

- **Home Page:** Introduction, skills, and technologies used.
- **Projects Page:** Showcases projects with details.
- **Blog Page:** Displays blog posts with content.
- **Contact Page:** Contact form to receive messages.

### Dashboard Features (Authenticated Users Only):

- **Project Management:**
  - Create a new project
  - View all projects
  - Update project details
  - Delete projects
- **Blog Management:**
  - Create a new blog post
  - View all blogs
  - Update blog details (except slug)
  - Delete blog posts
- **Message Management:**
  - View all messages
  - Mark messages as read/unread
  - Delete messages

## 🏗 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, Framer Motion
- **State Management:** Redux Toolkit (RTK Query)
- **Authentication:** NextAuth (Google, GitHub OAuth)
- **Backend:** Node.js, Express.js, MongoDB
- **Deployment:** Vercel

````

## 🛠 Setup & Installation
### 1️⃣ Clone the Repository
```bash
git clone  https://github.com/Shazzadhossensunny/my-nextjs-portfolio
cd my-nextjs-portfolio
````

### 2️⃣ Install Dependencies

```bash
yarn install  # or npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4️⃣ Start Development Server

```bash
yarn dev  # or npm run dev
```

## 🚀 Deployment

This project is deployed on **Vercel**. To deploy manually:

```bash
git push origin main  # Push latest changes
yarn build            # Build production-ready app
vercel deploy         # Deploy to Vercel
```

---

🔹 **Developed by [Shazzad Hossen](https://my-nextjs-portfolio-murex.vercel.app/)**
