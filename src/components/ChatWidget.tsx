import React, { useState } from 'react'
import ChatButton from './ChatButton'
import ChatPopup from './ChatPopup'
import styles from './ChatWidget.module.css'
import { ReferenceItem, Role, RoleObject } from '@/@types'
import { fetchChat } from '@/services/chat'

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
        references: ReferenceItem[]
    }>>([])
    const [isTyping, setIsTyping] = useState(false)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }
    const handleMessage = async (text: string) => {
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: RoleObject.USER,
            timestamp: new Date(),
            references: []
        }
        setMessages(prev => [...prev, userMessage])
        setIsTyping(true)
        try {
            const response = await fetchChat(text)
            const assistantMessage = {
                id: Date.now().toString(),
                text: response.message,
                sender: RoleObject.ASSISTANT,
                timestamp: new Date(),
                references: response.references
            }
            setMessages(prev => [...prev, assistantMessage])
            setIsTyping(false)
        } catch (error) {
            console.error('Error fetching chat:', error)
            const errorMessage = {
                id: Date.now().toString(),
                text: "Sorry, I'm having trouble processing your request. Please try again",
                sender: RoleObject.ASSISTANT,
                timestamp: new Date(),
                references: []
            }
            setMessages(prev => [...prev, errorMessage])
            setIsTyping(false)
        }
    }



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
