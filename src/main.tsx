import React from 'react'
import { createRoot } from 'react-dom/client'
import ChatWidget from './components/ChatWidget'
import './main.css'

// Demo page component
const DemoPage: React.FC = () => {
  return (
    <div className="demo-page grayscale-bg">

      <main className="main-content center-content">
        <div className="circle-text-container">
          <svg width="400" height="400" viewBox="0 0 400 400" className="circle-text-svg">
            <defs>
              <path id="circlePath" d="M 200, 200 m -140, 0 a 140,140 0 1,1 280,0 a 140,140 0 1,1 -280,0" />
            </defs>
            <g className="rotating-text">
              <text fontSize="28" fontWeight="semibold" fontFamily="Arial, sans-serif" fill="#0050A5" letterSpacing="2">
                <textPath xlinkHref="#circlePath" startOffset="0">
                  Nestlé: Good food, Good life • Nestlé: Good food, Good life •
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </main>
      <a href="https://github.com/zzehli/boreal-chat" target="_blank" rel="noopener noreferrer">Front-end code</a>
      <a href="https://github.com/zzehli/boreal-api" target="_blank" rel="noopener noreferrer">Back-end code</a>

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
          primaryColor: '#0050A5',
          title: 'Nestlé bot',
          subtitle: "We're here to help!",
          placeholder: 'Type your message...'
        }} />
      </div>
    </div>
  )
}

// Render the demo page
createRoot(document.getElementById('root')!).render(<DemoPage />)
