import { createClient } from '@/lib/supabase/server'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    My Bookmarks
                </h2>
                <p className="text-gray-500">
                    Manage your favorite links. Changes update in realtime.
                </p>
            </div>

            <BookmarkForm />

            <div className="border-t border-gray-200 pt-8">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Your List</h3>
                <BookmarkList bookmarks={bookmarks ?? []} />
            </div>
        </div>
    )
}
