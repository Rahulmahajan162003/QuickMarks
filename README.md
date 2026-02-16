# 🚀 Smart Bookmark App — QuickMarks

A **production-ready**, secure, and realtime bookmark manager built with **Next.js 14 App Router**, **Supabase**, and **Tailwind CSS**.

---

## 🌐 Live Demo

👉 https://quick-marks.vercel.app

Users can securely sign in with Google, manage private bookmarks, and see realtime updates instantly.

---

## Features

- **Authentication**: secure Google OAuth via Supabase Auth.
- **Security**: Row Level Security (RLS) ensures users can only access their own data.
- **Realtime**: Instant updates across devices using Supabase Realtime.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

1.  **Clone the repository** (if applicable) and navigate to the project folder.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

4.  **Database Setup**:
    Run the SQL commands in `schema.sql` in your Supabase SQL Editor to create the `bookmarks` table and enable RLS policies.
    
    *Critical Security Note*: The RLS policies enforce `auth.uid() = user_id`, ensuring strict data isolation.

5.  **Run the application**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Architecture & Implementation

### Authentication
Implemented using `@supabase/ssr` for secure server-side session management.
- **Login**: `/login/page.tsx` initiates OAuth flow.
- **Callback**: `/auth/callback/route.ts` exchanges auth code for session cookies.
- **Middleware**: `middleware.ts` protects `/dashboard` and refreshes sessions.

### Security (RLS)
Row Level Security is enabled on the `bookmarks` table.
- **Policies**: `SELECT`, `INSERT`, `DELETE` are restricted to rows where `user_id` matches the authenticated user's ID (`auth.uid()`).
- **Server-Side Fetching**: Data fetching in `/dashboard/page.tsx` also explicitly filters by `user_id` as a redundant safety measure.

### Realtime Updates
Realtime functionality is implemented in the custom hook `/hooks/useBookmarksRealtime.ts`.
- It subscribes to `postgres_changes` on the `bookmarks` table.
- On any `INSERT`, `UPDATE`, or `DELETE` event, it triggers `router.refresh()` to re-fetch data in Server Components, ensuring the UI is always in sync without manual reloads.

