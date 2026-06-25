import Link from "next/link"
import config from "@/config"
import Chat from "@/components/ai/Chat"

export const metadata = { title: "Chat" }

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chat con IA</h1>
        <p className="mt-1 text-sm text-base-content/70">
          Demo de chat con streaming sobre <code>/api/ai/chat</code>. Requiere{" "}
          <code>OPENAI_API_KEY</code> en tu <code>.env.local</code>.
        </p>
      </div>

      {config.features.aiChat ? (
        <Chat />
      ) : (
        <div className="rounded-box border border-base-200 bg-base-100 p-6 text-sm text-base-content/60">
          El chat está desactivado. Actívalo con{" "}
          <code>features.aiChat: true</code> en <code>config.js</code>.{" "}
          <Link href="/dashboard" className="link link-primary">
            Volver al dashboard
          </Link>
          .
        </div>
      )}
    </div>
  )
}
