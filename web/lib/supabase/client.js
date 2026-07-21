// ============================================================
// Supabase · cliente de navegador (Clerk Integrado)
// ------------------------------------------------------------
// Úsalo en Client Components ("use client").
// Inyecta el token de Clerk de forma dinámica en cada petición.
// ============================================================

import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: async (url, options = {}) => {
          let clerkToken = undefined
          // Obtener el token de forma asíncrona de la sesión global de Clerk en el navegador
          if (typeof window !== "undefined" && window.Clerk?.session) {
            clerkToken = await window.Clerk.session.getToken({ template: "supabase" })
          }
          
          const headers = new Headers(options?.headers)
          if (clerkToken) {
            headers.set("Authorization", `Bearer ${clerkToken}`)
          }
          
          return fetch(url, { ...options, headers })
        },
      },
    }
  )
}
