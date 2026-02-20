'use client'

import { createClient } from '@/lib/supabase/client'
import { useBookmarksRealtime } from '@/hooks/useBookmarksRealtime'
import { useState, useEffect } from 'react'

type Bookmark = {
    id: string
    title: string
    url: string
    created_at: string
}

export default function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
    useBookmarksRealtime()
    const [supabase] = useState(() => createClient())
    const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>(bookmarks)

    useEffect(() => {
        setLocalBookmarks(bookmarks)
    }, [bookmarks])

    useEffect(() => {
        const handler = (e: any) => {
            setLocalBookmarks(prev => [
                {
                    id: crypto.randomUUID(),
                    title: e.detail.title,
                    url: e.detail.url,
                    created_at: new Date().toISOString()
                },
                ...prev
            ])
        }
        window.addEventListener('bookmark-added', handler)
        return () => window.removeEventListener('bookmark-added', handler)
    }, [])

    const handleDelete = async (id: string) => {
        // Optimistically remove from UI
        setLocalBookmarks(prev => prev.filter(b => b.id !== id))

        const { error } = await supabase.from('bookmarks').delete().eq('id', id)
        if (error) {
            console.error('Error deleting bookmark:', error)
            // Revert on error? Let's keep it simple for now as requested.
        }
    }

    if (localBookmarks.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No bookmarks yet. Add one to get started!
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {localBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                    <div>
                        <h4 className="mb-2 text-lg font-semibold text-gray-900 truncate" title={bookmark.title}>
                            {bookmark.title}
                        </h4>
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline break-all"
                        >
                            {bookmark.url}
                        </a>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                        <span className="text-xs text-gray-500">
                            {new Date(bookmark.created_at).toLocaleDateString('en-US')}
                        </span>
                        <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
