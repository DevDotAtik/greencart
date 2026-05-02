# Server

The chatbot backend is implemented inside the existing Node.js stack.

## Next.js backend

- Route: [app/api/chat/route.ts](D:\projects\greencart\app\api\chat\route.ts:1)
- Logic: [lib/services/chatbot.ts](D:\projects\greencart\lib\services\chatbot.ts:1)

## Express backend

- File: [api/server.ts](D:\projects\greencart\api\server.ts:1)
- Endpoints:
  - `GET /chat`
  - `POST /chat`

## Responsibilities

- Validate incoming chat payload
- Load or store chat history
- Interpret user intent
- Query MongoDB or fallback mock data
- Use OpenAI for intent help and general answers
- Return clean text responses
