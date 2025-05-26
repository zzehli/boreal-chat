import React from 'react'
import styles from './ChatButton.module.css'

interface ChatButtonProps {
    onClick: () => void
    isOpen: boolean
    config: any
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen, config }) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.chatButton} ${isOpen ? styles.open : ''}`}
            style={{
                backgroundColor: config.primaryColor,
            }}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
            {isOpen ? (
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )}
        </button>
    )
}

export default ChatButton 