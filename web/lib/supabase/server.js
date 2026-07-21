// ============================================================
// Supabase · cliente de servidor (Clerk Integrado)
// ------------------------------------------------------------
// Úsalo en Server Components, Route Handlers y Server Actions.
// Obtiene el token de Clerk (template 'supabase') y lo inyecta
// en las cabeceras para que las políticas RLS funcionen.
// ============================================================

import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function createClient() {
  const { getToken } = await auth()
  const clerkToken = await getToken({ template: "supabase" })

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: clerkToken ? `Bearer ${clerkToken}` : undefined,
        },
      },
    }
  )
}

// Helper: devuelve el usuario autenticado o null.
// Ahora usamos el usuario nativo de Clerk en lugar de Supabase Auth.
export async function getUser() {
  const user = await currentUser()
  return user
}
