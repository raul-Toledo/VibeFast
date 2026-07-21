import { SignIn } from "@clerk/nextjs"

export const metadata = { title: "Entrar" }

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-8">
      <SignIn 
        routing="hash" 
        appearance={{
          elements: {
            // Se puede inyectar estilos custom o clases de tailwind aquí si se desea
            rootBox: "mx-auto w-full max-w-sm",
            card: "rounded-2xl shadow-sm border border-base-200",
          }
        }}
      />
    </main>
  )
}
