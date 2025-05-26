import React, { useState, useRef, useEffect, useMemo } from 'react'
import RobotIcon from '../assets/Robot-icon.png'
import styles from './ChatPopup.module.css'
import { Role } from '@/@types'
import { RoleObject } from '@/@types'
interface Message {
    id: string
    text: string
    sender: Role
    timestamp: Date
}

interface ChatPopupProps {
    messages: Message[]
    isTyping: boolean
    onSendMessage: (text: string) => void
    onClose: () => void
    config: any
}

const ChatPopup: React.FC<ChatPopupProps> = ({
    messages,
    isTyping,
    onSendMessage,
    onClose,
    config
}) => {
    const [inputValue, setInputValue] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    useEffect(() => {
        // Trigger entrance animation
        setIsVisible(true)
        // Focus input after animation starts
        const timer = setTimeout(() => {
            inputRef.current?.focus()
        }, 150)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim())
            setInputValue('')
        }
    }

    const isDark = config.theme === 'dark'

    // Generate analogous background color from primary color
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 59, g: 130, b: 246 }; // fallback to blue
    }

    const generateAnalogousColor = (hex: string, isDark: boolean) => {
        const rgb = hexToRgb(hex)

        if (isDark) {
            // For dark theme: create a darker, muted version
            return `rgb(${Math.max(20, rgb.r - 180)}, ${Math.max(20, rgb.g - 180)}, ${Math.max(20, rgb.b - 180)})`
        } else {
            // For light theme: create a very light tinted version
            const lightness = 0.95 // How light (0.9 = 90% white mixed in)
            const r = Math.round(rgb.r * (1 - lightness) + 255 * lightness)
            const g = Math.round(rgb.g * (1 - lightness) + 255 * lightness)
            const b = Math.round(rgb.b * (1 - lightness) + 255 * lightness)
            return `rgb(${r}, ${g}, ${b})`
        }
    }

    const backgroundColors = useMemo(() => ({
        light: generateAnalogousColor(config.primaryColor, false),
        dark: generateAnalogousColor(config.primaryColor, true)
    }), [config.primaryColor])

    // Responsive sizing based on screen width
    const getResponsiveSize = () => {
        if (typeof window !== 'undefined') {
            const screenWidth = window.innerWidth
            if (screenWidth >= 1200) {
                return { sizeClass: 'large', width: 420, height: 600 }
            } else if (screenWidth >= 768) {
                return { sizeClass: 'medium', width: 380, height: 500 }
            } else {
                return { sizeClass: 'small', width: 320, height: 384 }
            }
        }
        return { sizeClass: 'small', width: 320, height: 384 }
    }

    const { sizeClass } = getResponsiveSize()

    return (
        <div
            className={`${styles.popup} ${styles[sizeClass]} ${isDark ? styles.dark : styles.light} ${isVisible ? styles.visible : styles.hidden}`}
            style={{
                backgroundColor: isDark ? backgroundColors.dark : backgroundColors.light,
            }}
        >
            {/* Header */}
            <div className={`${styles.header} ${isDark ? styles.dark : styles.light}`}>
                <div className={styles.headerContent}>
                    <h3 className={styles.title}>{config.title}</h3>
                    <p className={styles.subtitle}>{config.subtitle}</p>
                </div>
                <button
                    onClick={onClose}
                    className={`${styles.closeButton} ${isDark ? styles.dark : styles.light}`}
                >
                    <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>👋 Hello! How can I help you today?</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${styles[message.sender]}`}
                    >
                        {message.sender === RoleObject.ASSISTANT && (
                            <div className={styles.avatar}>
                                <img
                                    src={RobotIcon}
                                    alt="Helper Bot"
                                    className={styles.avatarImage}
                                />
                            </div>
                        )}

                        <div className={`${styles.messageContent} ${styles[sizeClass]} ${message.sender === RoleObject.ASSISTANT ? styles.bot : ''}`}>
                            {message.sender === RoleObject.ASSISTANT && (
                                <div className={`${styles.senderName} ${isDark ? styles.dark : styles.light}`}>
                                    Helper Bot
                                </div>
                            )}

                            <div className={styles.messageWrapper}>
                                <div
                                    className={`${styles.messageBubble} ${styles[message.sender]}`}
                                    style={{
                                        backgroundColor: message.sender === RoleObject.USER ? config.primaryColor : undefined,
                                    }}
                                >
                                    {message.text}
                                </div>

                                {message.sender === RoleObject.ASSISTANT && (
                                    <div className={styles.feedbackButtons}>
                                        <button
                                            className={`${styles.feedbackButton} ${styles.thumbsUp} ${isDark ? styles.dark : styles.light}`}
                                            onClick={() => console.log('Thumbs up:', message.id)}
                                        >
                                            <svg className={styles.feedbackIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                        </button>
                                        <button
                                            className={`${styles.feedbackButton} ${styles.thumbsDown} ${isDark ? styles.dark : styles.light}`}
                                            onClick={() => console.log('Thumbs down:', message.id)}
                                        >
                                            <svg className={styles.feedbackIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className={styles.typingIndicator}>
                        <div className={styles.avatar}>
                            <img
                                src={RobotIcon}
                                alt="Helper Bot"
                                className={styles.avatarImage}
                            />
                        </div>

                        <div className={styles.messageContent}>
                            <div className={`${styles.senderName} ${isDark ? styles.dark : styles.light}`}>
                                Helper Bot
                            </div>

                            <div className={`${styles.messageBubble} ${styles.bot}`}>
                                <div className={styles.typingDots}>
                                    <div className={styles.typingDot}></div>
                                    <div className={styles.typingDot}></div>
                                    <div className={styles.typingDot}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className={`${styles.inputForm} ${isDark ? styles.dark : styles.light}`}>
                <div className={styles.inputContainer}>
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={config.placeholder}
                        className={`${styles.textarea} ${isDark ? styles.dark : styles.light}`}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = config.primaryColor
                            e.currentTarget.style.borderWidth = '3px'
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
                            e.currentTarget.style.borderWidth = '1px'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className={styles.sendButton}
                        style={{
                            backgroundColor: config.primaryColor,
                        }}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatPopup 