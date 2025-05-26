import React, { useState, useEffect } from 'react'
import ChatButton from './ChatButton'
import ChatPopup from './ChatPopup'
import styles from './ChatWidget.module.css'
import { useChat } from '@/hooks/useChat'
import { Role, RoleObject } from '@/@types'

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
        sender: Role
        timestamp: Date
    }>>([])
    const [isTyping, setIsTyping] = useState(false)
    const { messages: chatResponses, isLoading, error, status, sendMessage } = useChat()

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }
    const handleMessage = async (text: string) => {
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: RoleObject.USER,
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMessage])
        setIsTyping(true)

        await sendMessage(text)
    }

    useEffect(() => {
        if (chatResponses?.content && status === 'success') {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: chatResponses.content,
                sender: RoleObject.ASSISTANT,
                timestamp: new Date()
            }])
            setIsTyping(false)
        }
    }, [chatResponses, status])

    return (
        <div className={styles.chatWidget}>
            <ChatButton
                onClick={toggleChat}
                isOpen={isOpen}
                config={config}
            />
            {isOpen && (
                <ChatPopup
                    messages={messages}
                    isTyping={isTyping}
                    onSendMessage={handleMessage}
                    onClose={() => setIsOpen(false)}
                    config={config}
                />
            )}
        </div>
    )
}

export default ChatWidget
