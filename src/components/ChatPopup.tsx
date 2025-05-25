import React, { useState, useRef, useEffect } from 'react'
import RobotIcon from '../assets/Robot-icon.png'
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
    const [isVisible, setIsVisible] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

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
    const backgroundColorLight = generateAnalogousColor(config.primaryColor, false)
    const backgroundColorDark = generateAnalogousColor(config.primaryColor, true)

    // Responsive sizing based on screen width
    const getResponsiveSize = () => {
        if (typeof window !== 'undefined') {
            const screenWidth = window.innerWidth
            if (screenWidth >= 1200) {
                // Large screens (desktop)
                return { width: '420px', height: '600px' }
            } else if (screenWidth >= 768) {
                // Medium screens (tablet)
                return { width: '380px', height: '500px' }
            } else {
                // Small screens (mobile)
                return { width: '320px', height: '384px' }
            }
        }
        // Default size for SSR
        return { width: '320px', height: '384px' }
    }

    const { width, height } = getResponsiveSize()

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                width: width,
                height: height,
                backgroundColor: isDark ? backgroundColorDark : backgroundColorLight,
                color: isDark ? '#ffffff' : '#111827',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                zIndex: 999999,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                // Smooth entrance animation
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'bottom right'
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                }}
            >
                <div style={{ color: isDark ? '#ffffff' : '#111827' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>{config.title}</h3>
                    <p style={{ fontSize: '12px', opacity: '0.7', margin: '0' }}>{config.subtitle}</p>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        color: isDark ? '#ffffff' : '#111827',
                        background: 'none',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
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
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            alignItems: 'flex-start',
                            gap: '8px'
                        }}
                    >
                        {message.sender === 'bot' && (
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '4px',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={RobotIcon}
                                    alt="Helper Bot"
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: message.sender === 'user'
                                ? `${parseInt(width) * 0.75}px`  // 75% of popup width
                                : `${parseInt(width) * 0.65}px`  // 65% of popup width
                        }}>
                            {message.sender === 'bot' && (
                                <div style={{
                                    fontSize: '11px',
                                    color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                                    marginBottom: '4px',
                                    fontWeight: '500'
                                }}>
                                    Helper Bot
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flexDirection: 'column' }}>
                                <div
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        fontSize: '14px',
                                        backgroundColor: message.sender === 'user'
                                            ? config.primaryColor
                                            : '#ffffff',
                                        color: message.sender === 'user'
                                            ? 'white'
                                            : '#111827',
                                        boxShadow: message.sender === 'bot' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        border: message.sender === 'bot' ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {message.text}
                                </div>

                                {message.sender === 'bot' && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '8px',
                                        marginTop: '2px'
                                    }}>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '2px',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                                e.currentTarget.style.color = '#10B981'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent'
                                                e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
                                            }}
                                            onClick={() => console.log('Thumbs up:', message.id)}
                                        >
                                            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                        </button>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '2px',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                                e.currentTarget.style.color = '#EF4444'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent'
                                                e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
                                            }}
                                            onClick={() => console.log('Thumbs down:', message.id)}
                                        >
                                            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '4px',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={RobotIcon}
                                alt="Helper Bot"
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                fontSize: '11px',
                                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                                marginBottom: '4px',
                                fontWeight: '500'
                            }}>
                                Helper Bot
                            </div>

                            <div style={{
                                padding: '10px 14px',
                                borderRadius: '16px 16px 16px 4px',
                                fontSize: '14px',
                                backgroundColor: '#ffffff',
                                color: '#111827',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                lineHeight: '1.4'
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
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{
                padding: '16px',
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
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
                            padding: '10px 14px',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                            color: isDark ? '#ffffff' : '#111827',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = config.primaryColor
                            e.currentTarget.style.borderWidth = '3px'
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '20px',
                            backgroundColor: config.primaryColor,
                            color: 'white',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                            opacity: inputValue.trim() ? '1' : '0.5',
                            transition: 'all 0.2s ease',
                            transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            if (inputValue.trim()) {
                                e.currentTarget.style.transform = 'scale(1.02)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
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