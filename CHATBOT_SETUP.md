# Chatbot Setup

This document explains how to run the chatbot feature in Krishi Bazaar.

## Stack used

- Frontend: Next.js / React
- Backend: Next.js Route Handlers + Express
- Database: MongoDB + Mongoose
- AI: OpenAI API via official Node SDK

## Files to know

- Chat UI: [components/chat/chat-assistant.tsx](D:\projects\greencart\components\chat\chat-assistant.tsx:1)
- Chat page: [app/chat/page.tsx](D:\projects\greencart\app\chat\page.tsx:1)
- Next API: [app/api/chat/route.ts](D:\projects\greencart\app\api\chat\route.ts:1)
- Express API: [api/server.ts](D:\projects\greencart\api\server.ts:1)
- Chat logic: [lib/services/chatbot.ts](D:\projects\greencart\lib\services\chatbot.ts:1)
- Chat DB model: [models/ChatMessage.ts](D:\projects\greencart\models\ChatMessage.ts:1)

## Environment variables

Add these to `.env`:

```env
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
MONGODB_URI=your-mongodb-uri
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

`.env.example` already includes the OpenAI entries.

## Install

```bash
npm install
```

The project now uses:
- `openai`

## Run the app

Frontend + Next backend:

```bash
npm run dev
```

Optional Express backend:

```bash
npm run api:dev
```

## Chat endpoints

Next.js:
- `GET /api/chat?sessionId=...`
- `POST /api/chat`

Express:
- `GET /chat?sessionId=...`
- `POST /chat`

## Example POST body

```json
{
  "sessionId": "chat-demo-123",
  "message": "Price of tomatoes?"
}
```

## Example response

```json
{
  "sessionId": "chat-demo-123",
  "intent": "price_lookup",
  "assistantMessage": {
    "role": "assistant",
    "content": "Desi Tomatoes costs ?40 for 1 kg."
  }
}
```

## Behavior summary

- Product list questions -> database product list
- Product price questions -> product lookup in database
- Order questions -> user-specific order lookup
- Account questions -> signed-in user lookup
- Shipping/payment/support questions -> FAQ fallback
- General questions -> OpenAI fallback

## Notes

- If MongoDB is unavailable, the chatbot can still answer many product/order questions from fallback mock data.
- If `OPENAI_API_KEY` is missing, the chatbot still works for database and FAQ-style answers.
