import React, { useState } from 'react'
import ChatButton from './ChatButton'
import ChatPopup from './ChatPopup'

interface ChatWidgetConfig {
    apiKey?: string
    theme?: 'light' | 'dark'
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    primaryColor?: string
    title?: string
    subtitle?: string
    placeholder?: string
}

interface ChatWidgetProps {
    config: ChatWidgetConfig
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Array<{
        id: string
        text: string
        sender: 'user' | 'bot'
        timestamp: Date
    }>>([])
    const [isTyping, setIsTyping] = useState(false)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const sendMessage = async (text: string) => {
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user' as const,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setIsTyping(true)

        // Simulate bot response (replace with actual API call)
        setTimeout(() => {
            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: `Thanks for your message: "${text}". This is a demo response.`,
                sender: 'bot' as const,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)
        }, 1000)
    }

    return (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <ChatButton
                onClick={toggleChat}
                isOpen={isOpen}
                config={config}
            />
            {isOpen && (
                <ChatPopup
                    messages={messages}
                    isTyping={isTyping}
                    onSendMessage={sendMessage}
                    onClose={() => setIsOpen(false)}
                    config={config}
                />
            )}
        </div>
    )
}

export default ChatWidget
