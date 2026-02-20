'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BookmarkRealtimePayload } from '@/components/BookmarkList'

export function useBookmarksRealtime() {
    const [supabase] = useState(() => createClient())
    const router = useRouter()

    useEffect(() => {
        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload: BookmarkRealtimePayload) => {
                    router.refresh()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router])
}
