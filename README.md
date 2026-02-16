# 🚀 Smart Bookmark App — QuickMarks

A **production-ready**, secure, and realtime bookmark manager built with **Next.js 14 App Router**, **Supabase**, and **Tailwind CSS**.

---

## 🌐 Live Demo

👉 https://quick-marks.vercel.app

Users can securely sign in with Google, manage private bookmarks, and see realtime updates instantly.

---

## 📌 Project Overview

QuickMarks is a full-stack bookmark manager designed with strong security and modern architecture.

The application demonstrates:

- Secure Google OAuth authentication
- Row Level Security (RLS) enforced at database level
- Realtime UI updates
- Server Component architecture
- Production deployment using Vercel

Each user's data is strictly isolated using Supabase RLS policies.

---

## ✨ Features

- 🔐 **Google OAuth Authentication** via Supabase Auth
- 🛡️ **Row Level Security (RLS)** ensuring private user data
- ⚡ **Realtime Updates** across tabs and sessions
- 🎨 **Modern Responsive UI** built with Tailwind CSS
- 🚀 **Production Deployment** using Vercel

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

---

## ⚙️ Getting Started (Local Setup)

### 1️⃣ Install Dependencies

```bash
npm install
2️⃣ Environment Variables
Create a .env.local file in root directory:

NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
3️⃣ Database Setup
Run SQL commands from schema.sql inside Supabase SQL Editor.

🔒 Security Model
Row Level Security (RLS) is enabled on the bookmarks table.

Policies enforce:

auth.uid() = user_id
This guarantees strict user-level data isolation even if client logic is bypassed.

4️⃣ Run the Application
npm run dev
Open:

http://localhost:3000
🏗️ Architecture & Implementation
🔐 Authentication Flow
Authentication is implemented using @supabase/ssr for secure server-side session management.

Flow:

User clicks Sign in with Google

Supabase OAuth starts

Google redirects to:

/auth/callback
Server exchanges auth code for session cookies

Middleware validates session before accessing dashboard

Key Files:

/login/page.tsx

/auth/callback/route.ts

/middleware.ts

🛡️ Security (Row Level Security)
Row Level Security protects all bookmark data.

Policies restrict:

SELECT

INSERT

DELETE

to rows where:

user_id === auth.uid()
Additional Safety:

Server-side fetching in:

/dashboard/page.tsx
also filters by user_id.

This provides defense-in-depth security.

⚡ Realtime Updates
Realtime functionality is implemented in:

/hooks/useBookmarksRealtime.ts
Behavior:

Subscribes to postgres_changes on the bookmarks table.

Listens for:

INSERT
UPDATE
DELETE
Calls:

router.refresh()
Result:

No manual refresh required

Server Components always stay in sync

🔄 Realtime Architecture (Concept)
User Action
   ↓
Supabase Database Change
   ↓
Realtime Subscription Trigger
   ↓
router.refresh()
   ↓
Server Component Refetch
   ↓
UI Updates Instantly
🧠 Design Decisions
Used Server Components instead of client fetching for better security.

Added middleware session validation to protect routes globally.

Implemented RLS + server filtering for strict access control.

Used router.refresh() instead of local state mutations to keep server as source of truth.

🚀 Deployment
Deployed on Vercel with environment variables:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Supabase OAuth Redirect URLs configured:

https://quick-marks.vercel.app/auth/callback
http://localhost:3000/auth/callback
📁 Folder Structure (Important Parts)
app/
 ├── login/
 ├── dashboard/
 ├── auth/callback/
components/
hooks/
lib/supabase/
middleware.ts
