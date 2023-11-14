import type {User} from "@supabase/supabase-js"
import {writable, type Writable} from "svelte/store"
export let user: Writable<User | null> = writable<User | null>(null)
import {supabase} from "$lib/db"

export const isAdmin = (user: User  | null) => {
    if(!user) return false
    return ["fritz.mehler@ebnerstolz.de", "legaltech@ebnerstolz.de"].includes(user.email!)
}

supabase.auth.getSession().then(({ data: { session } }) => {
    user.set(session?.user ?? null)
})

const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
    (_, session) => {
        const currentUser = session?.user
        user.set(currentUser ?? null)
    }
)