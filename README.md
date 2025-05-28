# Chat widget
## Local Development
Pull the codebase, install the dependencies with pnpm:
```
pnpm install
```
Start the development server
```
pnpm run dev
```
## Features
* Embedded widget plug into any website as a script tag

Simple integration
```
<script src="https://your-domain.com/chat-widget.iife.js" 
        data-chat-widget
        data-title="Custom Support"
        data-primary-color="#3B82F6"></script>
```
Or manual initialization
```
<script src="https://your-domain.com/chat-widget.iife.js"></script>
<script>
  window.ChatWidget.init({
    title: 'Custom Support',
    primaryColor: '#3B82F6',
    subtitle: "We're here to help!",
    placeholder: 'Type your message...',
    position: 'bottom-right',
  });
</script>
```
* Fully customizable elements: `data-title`, `data-primary-color`, `data-subtitle`, `data-placeholder` and `data-position`.
* fast: minimum dependencies, only React and react-markdown.