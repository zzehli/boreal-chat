import React from 'react'
import { createRoot } from 'react-dom/client'
import ChatWidget from './components/ChatWidget'
import './widget.css'

// Global interface for the widget
interface ChatWidgetConfig {
    apiKey?: string
    theme?: 'light' | 'dark'
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    primaryColor?: string
    title?: string
    subtitle?: string
    placeholder?: string
}
class ChatWidgetManager {
    private container: HTMLDivElement | null = null
    private root: any = null
    private config: ChatWidgetConfig

    constructor(config: ChatWidgetConfig = {}) {
        this.config = {
            theme: 'light',
            position: 'bottom-right',
            primaryColor: '#3B82F6',
            title: 'Chat with us',
            subtitle: 'We\'re here to help',
            placeholder: 'Type your message...',
            ...config
        }
        this.init()
    }

    private init() {
        // Create container with isolated styles
        this.container = document.createElement('div')
        this.container.id = 'chat-widget-container'
        this.container.style.cssText = `
      position: fixed;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `

        // Set position based on config
        this.setPosition()

        document.body.appendChild(this.container)

        // Render React component
        this.root = createRoot(this.container)
        this.root.render(React.createElement(ChatWidget, { config: this.config }))
    }

    private setPosition() {
        if (!this.container) return

        const positions = {
            'bottom-right': { bottom: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'top-left': { top: '20px', left: '20px' }
        }

        const pos = positions[this.config.position!]
        Object.assign(this.container.style, pos)
    }

    public destroy() {
        if (this.root) {
            this.root.unmount()
        }
        if (this.container) {
            document.body.removeChild(this.container)
        }
    }

    public updateConfig(newConfig: Partial<ChatWidgetConfig>) {
        this.config = { ...this.config, ...newConfig }
        if (this.root) {
            this.root.render(React.createElement(ChatWidget, { config: this.config }))
        }
    }
}

// Global API
declare global {
    interface Window {
        ChatWidget: {
            init: (config?: ChatWidgetConfig) => ChatWidgetManager
        }
    }
}

// Auto-initialize if config is provided
window.ChatWidget = {
    init: (config?: ChatWidgetConfig) => new ChatWidgetManager(config)
}

// Auto-initialize with data attributes
document.addEventListener('DOMContentLoaded', () => {
    const script = document.querySelector('script[data-chat-widget]')
    if (script) {
        const config: ChatWidgetConfig = {}

        // Read configuration from data attributes
        if (script.getAttribute('data-api-key')) {
            config.apiKey = script.getAttribute('data-api-key')!
        }
        if (script.getAttribute('data-theme')) {
            config.theme = script.getAttribute('data-theme') as 'light' | 'dark'
        }
        if (script.getAttribute('data-position')) {
            config.position = script.getAttribute('data-position') as any
        }
        if (script.getAttribute('data-primary-color')) {
            config.primaryColor = script.getAttribute('data-primary-color')!
        }
        if (script.getAttribute('data-title')) {
            config.title = script.getAttribute('data-title')!
        }

        window.ChatWidget.init(config)
    }
})

export default ChatWidgetManager 