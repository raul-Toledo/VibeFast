"use client"

import { useState, useRef, useEffect } from "react"
import { SendHorizontal } from "lucide-react"

// Chat con la IA. Consume el stream de texto plano de /api/ai/chat
// (Session B/C) y va pintando la respuesta token a token.
//
// Manda todo el historial en cada request para preservar el contexto
// de la conversación. La persistencia en ai_conversations/ai_messages
// la hace la route del lado server (best-effort), aquí no la tocamos.
export default function Chat() {
  const [messages, setMessages] = useState([]) // { role, content }
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, streaming])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || streaming) return

    setError(null)
    const history = [...messages, { role: "user", content: text }]
    // Agrega el mensaje del usuario + un placeholder de assistant vacío.
    setMessages([...history, { role: "assistant", content: "" }])
    setInput("")
    setStreaming(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "No pudimos responder.")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((m) => {
          const copy = [...m]
          const last = copy[copy.length - 1]
          copy[copy.length - 1] = { ...last, content: last.content + chunk }
          return copy
        })
      }
    } catch (err) {
      setError(err.message)
      // Quita el placeholder vacío si no llegó nada.
      setMessages((m) => {
        const last = m[m.length - 1]
        if (last?.role === "assistant" && last.content === "") return m.slice(0, -1)
        return m
      })
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-box border border-base-200 bg-base-100">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-base-content/50">
            <p>Escribe un mensaje para empezar a chatear con la IA.</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat ${m.role === "user" ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble ${
                m.role === "user" ? "chat-bubble-primary" : ""
              }`}
            >
              {m.content || (
                <span className="loading loading-dots loading-sm align-middle" />
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="border-t border-base-200 px-4 py-2 text-sm text-error">
          {error}
        </div>
      )}

      <form
        onSubmit={send}
        className="flex items-center gap-2 border-t border-base-200 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje…"
          className="input input-bordered flex-1"
          disabled={streaming}
        />
        <button
          type="submit"
          className="btn btn-primary btn-square"
          disabled={streaming || !input.trim()}
          aria-label="Enviar"
        >
          {streaming ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <SendHorizontal className="size-4" />
          )}
        </button>
      </form>
    </div>
  )
}
