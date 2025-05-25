import React from 'react'

interface ChatButtonProps {
    onClick: () => void
    isOpen: boolean
    config: any
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen, config }) => {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'fixed',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: config.primaryColor,
                color: 'white',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                zIndex: 999998,
                bottom: '20px',
                right: '20px'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = `${isOpen ? 'rotate(45deg)' : 'rotate(0deg)'} scale(1.1)`
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
            }}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
            {isOpen ? (
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )}
        </button>
    )
}

export default ChatButton 