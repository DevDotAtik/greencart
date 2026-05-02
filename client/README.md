# Client

This project already uses Next.js as the frontend, so the chatbot client lives in the existing app instead of a separate React app.

## Chat UI entry points

- Page: [app/chat/page.tsx](D:\projects\greencart\app\chat\page.tsx:1)
- Main UI component: [components/chat/chat-assistant.tsx](D:\projects\greencart\components\chat\chat-assistant.tsx:1)

## Features implemented

- WhatsApp-like left/right message bubbles
- Timestamps on every message
- Typing indicator
- Input box + send button
- Suggested prompts
- Session-based chat history loading

## How it talks to backend

- `GET /api/chat?sessionId=...` -> load message history
- `POST /api/chat` -> send message and receive bot response
