import type { ChatResponse } from '@/@types'
export const fetchChat = async (messageContent: string): Promise<ChatResponse> => {
    try {


        const response = await fetch(`http://127.0.0.1:8000/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: messageContent
            })
        })
        if (!response.ok) {
            throw new Error("Failed to fetch chat")
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        throw new Error("Failed to fetch chat")
    }
}