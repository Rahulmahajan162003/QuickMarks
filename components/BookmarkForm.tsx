'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, startTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function BookmarkForm() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !url) return

        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { error } = await supabase.from('bookmarks').insert({
                title,
                url,
                user_id: user.id
            })
            if (!error) {
                setTitle('')
                setUrl('')
                startTransition(() => {
                    router.refresh()
                })
                router.push('/dashboard')
            } else {
                console.error('Error adding bookmark:', error)
            }
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Add New Bookmark</h3>
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Supabase Docs"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="url" className="mb-1 block text-sm font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://supabase.com"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Bookmark'}
                </button>
            </div>
        </form>
    )
}
