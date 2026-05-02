# Krishi Bazaar Project TL;DR

This file is a fast architecture guide for the whole project.

Note:
- The visible brand name in the UI is now `Krishi Bazaar`.
- Some internal file names, repo names, and env defaults still use `greencart`.

## 1. What This Project Is

Krishi Bazaar is a full-stack farmer marketplace built with:
- Frontend: `Next.js 14 App Router + React + Tailwind CSS`
- Backend: `Next.js API Route Handlers` and an optional `Express` server
- Database: `MongoDB + Mongoose`
- Auth: `NextAuth credentials login`
- Client state: `Zustand`
- Validation: `Zod`

Main user roles:
- `buyer`: browses products, carts, orders, auctions, bids
- `farmer`: adds products, creates auctions
- `admin`: operational access and moderation-oriented pages

## 2. High-Level Architecture

```text
Browser UI
  -> Next.js App Router pages in /app
  -> React components in /components
  -> Zustand stores in /hooks

Frontend requests
  -> /app/api/* route handlers
  -> service layer in /lib/services/*
  -> Mongoose models in /models/*
  -> MongoDB

Optional standalone backend
  -> /api/server.ts (Express)
  -> reuses shared service layer
```

## 3. Main Folder Guide

### `app/`
Contains all pages and Next route handlers.

Important page routes:
- `/` Home
- `/login`
- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/orders`
- `/account`
- `/farmer/dashboard`
- `/admin`
- `/auctions`
- `/auctions/[id]`
- `/sell-on-greencart`
- `/bulk-order-enquiry`
- `/contact-us`

Important API routes:
- `/api/products`
- `/api/products/[id]`
- `/api/search`
- `/api/orders`
- `/api/users/register`
- `/api/farmer/products`
- `/api/enquiries`
- `/api/auctions`
- `/api/auctions/[id]`
- `/api/auctions/[id]/bids`
- `/api/market`
- `/api/weather`
- `/api/auth/[...nextauth]`

### `components/`
Reusable UI pieces.

Useful groups:
- `layout/`: navbar, footer
- `home/`: hero, mandi panel
- `products/`: cards, add-to-cart, wishlist
- `dashboard/`: farmer/admin dashboard widgets
- `auctions/`: auction card, bid form
- `forms/`: enquiry form
- `shared/`: logo, section heading, search bar, visuals

### `lib/`
Shared logic.

Important files:
- [lib/auth.ts](D:\projects\greencart\lib\auth.ts:1): NextAuth config
- [lib/db.ts](D:\projects\greencart\lib\db.ts:1): MongoDB connection
- [lib/env.ts](D:\projects\greencart\lib\env.ts:1): environment variables
- [lib/mock-data.ts](D:\projects\greencart\lib\mock-data.ts:1): fallback/sample data
- [lib/schemas.ts](D:\projects\greencart\lib\schemas.ts:1): Zod validation
- `lib/services/catalog.ts`: product/user/catalog access
- `lib/services/dashboard.ts`: homepage/admin/farmer dashboard data
- `lib/services/orders.ts`: order creation
- `lib/services/auctions.ts`: auction logic and bid rules
- `lib/services/seed.ts`: initial Mongo seed logic

### `models/`
Mongoose schemas for MongoDB collections.

### `hooks/`
Client-side state hooks.

Examples:
- `use-cart-store.ts`
- `use-wishlist-store.ts`
- `use-order-store.ts`
- `use-i18n.ts`

### `api/server.ts`
Optional Express server exposing shared backend features outside Next route handlers.

## 4. Frontend Structure

## Layout and common UI

- [app/layout.tsx](D:\projects\greencart\app\layout.tsx:1)
  - global metadata
  - fonts
  - wraps app in providers

- [app/providers.tsx](D:\projects\greencart\app\providers.tsx:1)
  - `SessionProvider` for auth
  - `LanguageProvider` for i18n toggle

- [components/layout/navbar.tsx](D:\projects\greencart\components\layout\navbar.tsx:1)
  - top navigation
  - auth-aware buttons
  - search bar
  - auctions link

- [components/layout/footer.tsx](D:\projects\greencart\components\layout\footer.tsx:1)
  - footer link groups

## Styling

- [app/globals.css](D:\projects\greencart\app\globals.css:1)
  - global theme, background, button styles, shared utility classes

- [tailwind.config.ts](D:\projects\greencart\tailwind.config.ts:1)
  - custom colors, shadows, border radii

## 5. Backend Structure

There are two backend entry styles:

### A. Next.js route handlers
Used by the actual web app.

Examples:
- [app/api/products/route.ts](D:\projects\greencart\app\api\products\route.ts:1)
- [app/api/users/register/route.ts](D:\projects\greencart\app\api\users\register\route.ts:1)
- [app/api/farmer/products/route.ts](D:\projects\greencart\app\api\farmer\products\route.ts:1)
- [app/api/enquiries/route.ts](D:\projects\greencart\app\api\enquiries\route.ts:1)
- [app/api/auctions/route.ts](D:\projects\greencart\app\api\auctions\route.ts:1)
- [app/api/auctions/[id]/bids/route.ts](<D:\projects\greencart\app\api\auctions\[id]\bids\route.ts:1>)

### B. Express server
Optional external API server.

- [api/server.ts](D:\projects\greencart\api\server.ts:1)

This server reuses the same service logic, especially:
- product listing
- search
- market/weather data
- orders
- auctions

## 6. Service Layer

This is the most important backend abstraction.

### `catalog.ts`
Handles:
- categories
- products
- product detail
- related products
- users by email
- farmers
- search suggestions

### `dashboard.ts`
Builds:
- homepage metrics
- mandi/weather cards
- farmer dashboard summaries
- admin dashboard summaries

### `orders.ts`
Handles order creation logic.

### `auctions.ts`
Handles:
- create auction
- active auction listing
- single auction lookup
- bid history
- place bid
- auto-finalize ended auctions
- concurrency-safe bidding logic

### `seed.ts`
Seeds Mongo with sample categories, farmers, products, and users if collections are empty.

## 7. Auth Flow

Auth is handled by NextAuth credentials.

Key file:
- [lib/auth.ts](D:\projects\greencart\lib\auth.ts:1)

Behavior:
- user logs in with email + password
- user is looked up through `getUserByEmail`
- password is checked with `bcryptjs`
- JWT stores:
  - `id`
  - `role`
  - `farmerId`

Session user shape:
- `id`
- `name`
- `email`
- `role`
- `farmerId`

Used for:
- farmer-only auction/product creation
- buyer-only auction bidding
- account-aware UI

## 8. Database Overview

Database: `MongoDB`
ODM: `Mongoose`
Connection: [lib/db.ts](D:\projects\greencart\lib\db.ts:1)

Current database name:
- `greencart`

## 9. Database Schema Summary

Below is the practical schema view you will care about most.

### `User`
File: [models/User.ts](D:\projects\greencart\models\User.ts:1)

Fields:
- `id`
- `name`
- `email`
- `mobile`
- `password`
- `role` = buyer | farmer | admin
- `avatar`
- `farmerId`
- `wishlist[]`
- `addresses[]`

Used by pages:
- login
- account
- auth-protected APIs
- auctions

### `Farmer`
File: [models/Farmer.ts](D:\projects\greencart\models\Farmer.ts:1)

Fields:
- `id`
- `userId`
- `farmName`
- `state`
- `district`
- `rating`
- `verified`
- `yearsActive`
- `speciality[]`
- `responseTime`

Used by pages:
- home
- product detail
- farmer dashboard

### `Category`
File: [models/Category.ts](D:\projects\greencart\models\Category.ts:1)

Fields:
- `id`
- `name`
- `slug`
- `description`
- `accent`

Used by pages:
- home category section
- products listing filters

### `Product`
File: [models/Product.ts](D:\projects\greencart\models\Product.ts:1)

Fields:
- `id`
- `name`
- `slug`
- `farmerId`
- `farmerName`
- `category`
- `state`
- `description`
- `tags[]`
- `unit`
- `stock`
- `organic`
- `price`
- `originalPrice`
- `deliveryTime`
- `rating`
- `reviewCount`
- `images[]`
- `color`
- `harvestDate`
- `featured`
- `trending`

Used by pages:
- home
- products
- product detail
- cart
- checkout
- farmer dashboard
- admin

### `Order`
File: [models/Order.ts](D:\projects\greencart\models\Order.ts:1)

Typical purpose:
- placed items
- totals
- user reference
- address
- payment mode
- status

Used by pages:
- checkout
- orders
- admin

### `Review`
File: [models/Review.ts](D:\projects\greencart\models\Review.ts:1)

Used by:
- product detail page

### `Cart`
File: [models/Cart.ts](D:\projects\greencart\models\Cart.ts:1)

Note:
- client cart currently relies heavily on Zustand
- model exists for future persistence/server storage

### `Wishlist`
File: [models/Wishlist.ts](D:\projects\greencart\models\Wishlist.ts:1)

Note:
- wishlist behavior is mostly client-driven right now
- model exists for database persistence

### `Address`
File: [models/Address.ts](D:\projects\greencart\models\Address.ts:1)

Used through:
- user addresses
- checkout/order delivery

### `Analytics`
File: [models/Analytics.ts](D:\projects\greencart\models\Analytics.ts:1)

Used for:
- future reporting/admin analytics expansion

### `Inquiry`
File: [models/Inquiry.ts](D:\projects\greencart\models\Inquiry.ts:1)

Fields:
- `type` = sell | bulk | contact
- `name`
- `email`
- `phone`
- `company`
- `subject`
- `requirement`

Used by pages:
- sell-on-greencart
- bulk-order-enquiry
- contact-us

### `Auction`
File: [models/Auction.ts](D:\projects\greencart\models\Auction.ts:1)

Fields:
- `id`
- `sellerUserId`
- `sellerFarmerId`
- `sellerName`
- `productName`
- `description`
- `quantity`
- `basePrice`
- `bidIncrement`
- `currentHighestBid`
- `highestBidderId`
- `highestBidderName`
- `winnerUserId`
- `winnerName`
- `endTime`
- `status` = active | ended
- `bidCount`

Used by pages:
- auctions list
- auction detail
- farmer dashboard

### `Bid`
File: [models/Bid.ts](D:\projects\greencart\models\Bid.ts:1)

Fields:
- `id`
- `auctionId`
- `bidderUserId`
- `bidderName`
- `amount`
- `createdAt`

Relationship:
- many bids belong to one auction

Used by pages:
- auction detail bid history

## 10. Page-by-Page Data Map

This section helps you understand which page talks to which backend/data.

### `/`
File: [app/page.tsx](D:\projects\greencart\app\page.tsx:1)

Uses:
- categories
- featured products
- trending products
- farmers
- mandi rates
- weather insights

Data sources:
- `getCategories()`
- `getFeaturedProducts()`
- `getTrendingProducts()`
- `getFarmers()`
- `getHomePageData()`

Database/models involved:
- `Category`
- `Product`
- `Farmer`
- external mandi/weather APIs

### `/login`
File: [app/login/page.tsx](D:\projects\greencart\app\login\page.tsx:1)

Uses:
- NextAuth sign-in
- registration API

Database/models:
- `User`
- `Farmer` when registering a farmer account

### `/products`
File: [app/products/page.tsx](D:\projects\greencart\app\products\page.tsx:1)

Uses:
- product list
- categories
- states filter

Database/models:
- `Product`
- `Category`

### `/products/[slug]`
File: [app/products/[slug]/page.tsx](<D:\projects\greencart\app\products\[slug]\page.tsx:1>)

Uses:
- product by slug
- related products
- farmer details
- reviews

Database/models:
- `Product`
- `Farmer`
- `Review`

### `/cart`
File: [app/cart/page.tsx](D:\projects\greencart\app\cart\page.tsx:1)

Uses:
- client cart store
- product lookups

Database/models:
- `Product`
- optional future `Cart`

### `/checkout`
File: [app/checkout/page.tsx](D:\projects\greencart\app\checkout\page.tsx:1)

Uses:
- cart items
- checkout form
- order creation API

Database/models:
- `Order`
- `Product`
- `User.addresses`

### `/orders`
File: [app/orders/page.tsx](D:\projects\greencart\app\orders\page.tsx:1)

Uses:
- user order history

Database/models:
- `Order`

### `/account`
File: [app/account/page.tsx](D:\projects\greencart\app\account\page.tsx:1)

Uses:
- session user
- addresses
- wishlist
- quick links

Database/models:
- `User`
- `Product`
- optional `Wishlist`

### `/farmer/dashboard`
File: [app/farmer/dashboard/page.tsx](D:\projects\greencart\app\farmer\dashboard\page.tsx:1)

Uses:
- farmer products
- seller auctions
- dashboard metrics

Database/models:
- `Product`
- `Auction`
- `Farmer`

### `/admin`
File: [app/admin/page.tsx](D:\projects\greencart\app\admin\page.tsx:1)

Uses:
- admin metrics
- product overview
- farmer summaries

Database/models:
- `Product`
- `Farmer`
- `Analytics`
- `Order` indirectly for metrics

### `/auctions`
File: [app/auctions/page.tsx](D:\projects\greencart\app\auctions\page.tsx:1)

Uses:
- all active auctions

Database/models:
- `Auction`

### `/auctions/[id]`
File: [app/auctions/[id]/page.tsx](<D:\projects\greencart\app\auctions\[id]\page.tsx:1>)

Uses:
- auction detail
- bid form
- bid history

Database/models:
- `Auction`
- `Bid`

### `/sell-on-greencart`
File: [app/sell-on-greencart/page.tsx](D:\projects\greencart\app\sell-on-greencart\page.tsx:1)

Uses:
- enquiry form for seller onboarding

Database/models:
- `Inquiry`

### `/bulk-order-enquiry`
File: [app/bulk-order-enquiry/page.tsx](D:\projects\greencart\app\bulk-order-enquiry\page.tsx:1)

Uses:
- bulk requirement form

Database/models:
- `Inquiry`

### `/contact-us`
File: [app/contact-us/page.tsx](D:\projects\greencart\app\contact-us\page.tsx:1)

Uses:
- contact form

Database/models:
- `Inquiry`

## 11. API Map

### Catalog APIs
- `GET /api/products`
- `GET /api/products/[id]`
- `GET /api/search`

### Auth/User APIs
- `POST /api/users/register`
- `POST /api/auth/[...nextauth]`

### Commerce APIs
- `GET /api/orders`
- `POST /api/orders`

### Farmer APIs
- `GET /api/farmer/products`
- `POST /api/farmer/products`

### Auction APIs
- `GET /api/auctions`
- `POST /api/auctions`
- `GET /api/auctions/[id]`
- `GET /api/auctions/[id]/bids`
- `POST /api/auctions/[id]/bids`

### Utility APIs
- `GET /api/market`
- `GET /api/weather`
- `POST /api/enquiries`

## 12. Auction Rules Summary

Auction logic lives in [lib/services/auctions.ts](D:\projects\greencart\lib\services\auctions.ts:1).

Rules:
- only `farmer` or `admin` can create auctions
- only `buyer` or `admin` can bid
- seller cannot bid on own auction
- first bid must be at least `basePrice`
- next bids must be at least `currentHighestBid + bidIncrement`
- bids after `endTime` are rejected
- winner is set when auction is finalized

Concurrency handling:
- uses Mongo session transactions
- optimistic check on `updatedAt`
- retries concurrent bid conflicts

## 13. Data Source Behavior

The app supports two modes:

### With Mongo configured
- reads/writes go through Mongoose models
- seed data populates empty collections

### Without Mongo configured
- many screens fall back to `lib/mock-data.ts`
- some write operations return config errors because they require Mongo

## 14. Environment Variables

Important env variables:
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `MONGODB_URI`
- `DATA_GOV_API_KEY`
- `DATA_GOV_MANDI_RESOURCE_ID`
- `DATA_GOV_RAINFALL_RESOURCE_ID`
- `DATA_GOV_SCHEMES_RESOURCE_ID`
- `EXPRESS_PORT`

Files:
- [lib/env.ts](D:\projects\greencart\lib\env.ts:1)
- [\.env.example](D:\projects\greencart\.env.example:1)

## 15. If You Want To Understand This Project Fast

Read these files in this order:

1. [PROJECT_TLDR.md](D:\projects\greencart\PROJECT_TLDR.md:1)
2. [app/layout.tsx](D:\projects\greencart\app\layout.tsx:1)
3. [app/page.tsx](D:\projects\greencart\app\page.tsx:1)
4. [components/layout/navbar.tsx](D:\projects\greencart\components\layout\navbar.tsx:1)
5. [lib/services/catalog.ts](D:\projects\greencart\lib\services\catalog.ts:1)
6. [lib/services/auctions.ts](D:\projects\greencart\lib\services\auctions.ts:1)
7. [lib/auth.ts](D:\projects\greencart\lib\auth.ts:1)
8. [models/Product.ts](D:\projects\greencart\models\Product.ts:1)
9. [models/User.ts](D:\projects\greencart\models\User.ts:1)
10. [models/Auction.ts](D:\projects\greencart\models\Auction.ts:1)

## 16. Short Mental Model

Think of the project like this:

- `app/` = screens + HTTP endpoints
- `components/` = reusable UI pieces
- `lib/services/` = business logic
- `models/` = Mongo schema definitions
- `lib/mock-data.ts` = fallback/sample dataset
- `lib/auth.ts` = login/session rules
- `api/server.ts` = optional Express wrapper around shared logic

If you want, I can also make:
- a `SYSTEM_FLOW.md` with request lifecycle diagrams
- a `DATABASE_RELATIONS.md` focused only on Mongo collections and relationships
- a `PAGE_FLOW.md` that shows exactly how each page loads and mutates data
