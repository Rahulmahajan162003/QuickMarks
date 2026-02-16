# 🚀 Smart Bookmark App — QuickMarks

A **production-ready**, secure, and realtime bookmark manager built with **Next.js 14 App Router**, **Supabase**, and **Tailwind CSS**.

---

## 🌐 Live Demo

👉 https://quick-marks.vercel.app

Users can securely sign in with Google, manage private bookmarks, and see realtime updates across sessions.

---

## 📌 Project Overview

QuickMarks is a full-stack bookmark manager designed with a strong focus on:

- Secure authentication
- Strict data isolation
- Realtime UI synchronization
- Modern server-component architecture

The app uses Supabase Auth + Row Level Security (RLS) to guarantee that each user can only access their own bookmarks.

---

## ✨ Key Highlights

- 🔐 Google OAuth authentication via Supabase Auth  
- 🛡️ Row Level Security (RLS) enforcing per-user data access  
- ⚡ Realtime UI updates using Supabase `postgres_changes`  
- 🧠 Server Components + Middleware session protection  
- 🚀 Deployed to Vercel with production environment setup  

---

## 🧩 Features

- **Authentication**: Secure Google OAuth login.
- **Security**: Strict Row Level Security (RLS) policies.
- **Realtime Updates**: Bookmarks sync instantly across tabs/devices.
- **Modern UI**: Clean responsive interface built with Tailwind CSS.
- **Private Data**: Users can only view and manage their own bookmarks.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

---

## ⚙️ Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
