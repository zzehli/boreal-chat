import React from 'react'
import { createRoot } from 'react-dom/client'
import ChatWidget from './components/ChatWidget'
import './widget.css'

// Demo page component
const DemoPage: React.FC = () => {
  return (
    <div>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        padding: '40px',
        lineHeight: '1.6',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1>Chat Widget Demo</h1>
        <p>This page demonstrates the chat widget integration. The widget should appear in the bottom-right corner.</p>

        <h2>Integration Methods</h2>

        <h3>Method 1: Auto-initialization with data attributes</h3>
        <div style={{
          background: '#f4f4f4',
          padding: '15px',
          borderRadius: '5px',
          margin: '20px 0',
          overflowX: 'auto'
        }}>
          <code>
            {`<script src="./dist/chat-widget.iife.js" 
        data-chat-widget
        data-title="Support Chat"
        data-subtitle="We're online now"
        data-primary-color="#10B981"
        data-theme="light"
        data-position="bottom-right"></script>`}
          </code>
        </div>

        <h3>Method 2: Manual initialization</h3>
        <div style={{
          background: '#f4f4f4',
          padding: '15px',
          borderRadius: '5px',
          margin: '20px 0',
          overflowX: 'auto'
        }}>
          <code>
            {`<script src="./dist/chat-widget.iife.js"></script>
<script>
  const widget = window.ChatWidget.init({
    title: 'Custom Chat',
    primaryColor: '#3B82F6',
    theme: 'dark',
    position: 'bottom-left'
  });
</script>`}
          </code>
        </div>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      {/* Chat Widget for Demo */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <ChatWidget config={{
          theme: 'light',
          position: 'bottom-right',
          primaryColor: '#3B82F6',
          title: 'Support Chat',
          subtitle: "We're here to help!",
          placeholder: 'Type your message...'
        }} />
      </div>
    </div>
  )
}

// Render the demo page
createRoot(document.getElementById('root')!).render(<DemoPage />)
