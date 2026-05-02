# Database

The chatbot reads website knowledge from the main application database.

## Main collections used by chatbot

- `products`
- `users`
- `orders`
- `chatmessages`

## Mongoose models

- [models/Product.ts](D:\projects\greencart\models\Product.ts:1)
- [models/User.ts](D:\projects\greencart\models\User.ts:1)
- [models/Order.ts](D:\projects\greencart\models\Order.ts:1)
- [models/ChatMessage.ts](D:\projects\greencart\models\ChatMessage.ts:1)

## Chat history storage

Each chat message stores:
- `id`
- `sessionId`
- `userId`
- `role`
- `content`
- `source`
- `createdAt`

## Sample data

See [chatbot-sample-data.json](D:\projects\greencart\database\chatbot-sample-data.json:1)
