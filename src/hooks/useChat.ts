import { fetchChat } from "@/services/chat"
import { useCallback, useState } from "react"
import { Message } from "@/@types"

export const useChat = () => {
    const [messages, setMessages] = useState<Message | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)

    const sendMessage = useCallback(async (messageContent: string) => {
        setIsLoading(true)
        setError(null)
        setStatus('pending')

        try {
            const response = await fetchChat(messageContent)
            setMessages({ role: 'assistant', content: response })
        } catch (error) {
            setError("Failed to send message")
            setStatus('error')
        } finally {
            setIsLoading(false)
            setStatus('success')
        }
    }, [])

    return {
        messages,
        isLoading,
        error,
        status,
        sendMessage
    }
}