import React, { useState, useRef, useEffect } from 'react'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
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
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim())
            setInputValue('')
        }
    }

    const isDark = config.theme === 'dark'

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                width: '320px',
                height: '384px',
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                color: isDark ? '#ffffff' : '#111827',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${config.primaryColor}20`,
                zIndex: 999999,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: config.primaryColor,
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px'
                }}
            >
                <div style={{ color: 'white' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>{config.title}</h3>
                    <p style={{ fontSize: '12px', opacity: '0.9', margin: '0' }}>{config.subtitle}</p>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        color: 'white',
                        background: 'none',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                >
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div style={{
                flex: '1',
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {messages.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        fontSize: '14px'
                    }}>
                        <p style={{ margin: '0' }}>👋 Hello! How can I help you today?</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            display: 'flex',
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '240px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                backgroundColor: message.sender === 'user'
                                    ? config.primaryColor
                                    : isDark
                                        ? '#374151'
                                        : '#f3f4f6',
                                color: message.sender === 'user'
                                    ? 'white'
                                    : isDark
                                        ? 'white'
                                        : '#111827'
                            }}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: isDark ? '#374151' : '#f3f4f6'
                        }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '50%',
                                    animation: 'bounce 1.4s infinite'
                                }}></div>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '50%',
                                    animation: 'bounce 1.4s infinite 0.1s'
                                }}></div>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '50%',
                                    animation: 'bounce 1.4s infinite 0.2s'
                                }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{
                padding: '16px',
                borderTop: '1px solid #e5e7eb'
            }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={config.placeholder}
                        style={{
                            flex: '1',
                            padding: '8px 12px',
                            border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: isDark ? '#374151' : '#ffffff',
                            color: isDark ? '#ffffff' : '#111827',
                            outline: 'none'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = config.primaryColor
                            e.currentTarget.style.boxShadow = `0 0 0 2px ${config.primaryColor}40`
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: config.primaryColor,
                            color: 'white',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                            opacity: inputValue.trim() ? '1' : '0.5'
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