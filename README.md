## Freelancing Platform (MERN + Redis + Azure)

A full‑stack freelancing marketplace built with the MERN stack. Sellers can create and manage gigs with images stored on Azure Blob Storage; buyers can place orders. The backend uses Redis for caching and token storage, and Azure SAS URLs for secure, time‑limited access to media. The frontend is a React app with Redux Toolkit and React Router.

### Tech Stack
- **Frontend**: React 19, React Router, Redux Toolkit, React Hook Form, Zod, Tailwind/PostCSS
- **Backend**: Node.js, Express 5, TypeScript
- **Database**: MongoDB (Mongoose 8)
- **Cache/Session**: Redis (token caching, response caching)
- **Cloud Storage**: Azure Blob Storage (SAS URLs for secure access)
- **Auth**: JWT (bcryptjs for password hashing)
- **Uploads**: Multer in‑memory → Azure Blob

### Key Features
- **User auth**: Register, login, logout with JWT; tokens cached in Redis
- **Gig management**: Create, read, update, delete; pause/unpause; Azure image upload
- **Orders**: Create orders, list by buyer/seller; gig order counters
- **Media security**: Time‑limited SAS URLs for images; server never exposes keys
- **Caching**:
  - Gigs list and gig details cached in Redis (`gigs_all`, `gig_<id>`)
  - SAS URLs cached per blob (`sas_<blobName>`) to reduce churn

---

## Project Structure
```
src/
  server/
    src/
      config/db.tsx           # Mongo connection (MONGO_URL)
      index.ts                # Express bootstrap and routes
      controllers/authController.tsx
      middleware/authMiddleware.tsx    # (present in repo, can be extended)
      models/{user,gig,order}.tsx
      routes/{authRoutes,gigRoutes,orderRoutes}.tsx
    utilities/
      azureUploads.tsx        # Azure Blob client, upload, delete
      redisClient.tsx         # Redis connection and events
  Pages/                      # React pages (login, register, gig, orders, etc.)
  slices/                     # Redux slices (auth, gig, order)
  appstore/store.tsx          # Redux store
  Routing/                    # Public/private routes
```

---

## Backend Overview

- `src/server/src/index.ts`: wires CORS, JSON, and mounts:
  - `/api/auth` → `authRoutes`
  - `/api/gigs` → `gigRoutes`
  - `/api/orders` → `orderRoutes`
- `config/db.tsx`: connects to Mongo using `MONGO_URL`
- `utilities/azureUploads.tsx`: creates container client and exports:
  - `uploadToAzure(file)` to upload memory buffer to Blob Storage
  - `deleteFromAzure(blobName)` to remove blobs
  - helpers used by routes to generate SAS URLs
- `utilities/redisClient.tsx`: connects to Redis using `REDIS_URL`

### API Endpoints (selected)
- Auth (`/api/auth`)
  - `POST /register` → hash password, create user, issue JWT, cache `jwt_<userId>`
  - `POST /login` → verify password, issue JWT, cache `jwt_<userId>`
  - `POST /logout` → delete cached `jwt_<userId>`
- Gigs (`/api/gigs`)
  - `POST /` (multipart `image`) → create gig, upload image to Azure, invalidate `gigs_all`
  - `GET /` → list gigs; cache enriched list with `imageUrl` SAS in `gigs_all`
  - `GET /:id` → get gig; cache as `gig_<id>` including `imageUrl`
  - `PUT /:id` (multipart `image`) → update gig; refresh caches
  - `DELETE /:id` → delete gig and blob; clear caches
  - `PATCH /:id/pause` → toggle status `active`/`paused`; clear caches
- Orders (`/api/orders`)
  - `POST /` (multipart `image`) → create order; increment gig `orders` count
  - `GET /buyer/:buyerId` → list purchases with seller/gig populated
  - `GET /seller/:sellerId` → list sales with buyer/gig populated, include `imageUrl`

Note: SAS URLs are generated with short lifetimes and, for gigs, are cached in Redis to reduce recomputation.

---

## Frontend Overview
- React app with Redux Toolkit slices: `authSlice`, `gigSlice`, `orderSlice`
- Routing with `react-router-dom` and guarded routes in `Routing/privateRoutes.tsx`
- Forms managed via `react-hook-form` and validated with `zod`
- Tailwind CSS (via PostCSS) for styling

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local) and a connection string
- Redis instance (Docker/local/managed)
- Azure Storage account with access key and a container named `gig-images`

### Environment Variables
Create a `.env` file in the project root (CRA loads it) or ensure the backend process has these variables:

```
PORT=5000
MONGO_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
AZURE_STORAGE_ACCOUNT_NAME=your_account
AZURE_STORAGE_ACCOUNT_KEY=your_key
```

### Install
```
npm install
```

### Run (Frontend)
```
npm start
```
Runs CRA dev server on http://localhost:3000

### Run (Backend, TypeScript)
The repo includes a convenience script using `nodemon` and `ts-node`:
```
npm run dev
```
This executes the server entry at `src/server/src/index.ts` and watches for changes.

### Build
```
npm run build
```
Outputs production assets to `/build`.

---

## Deployment Notes
- Ensure the environment variables above are set in your hosting environment
- Provision Azure Blob Storage and create the `gig-images` container
- Open outbound access to Redis and MongoDB if using managed services
- Behind a reverse proxy, set proper CORS and trust proxy as needed

---

## Security & Best Practices
- Passwords hashed with bcrypt; JWT signed with `JWT_SECRET`
- SAS URLs are time‑boxed and generated server‑side
- Redis used for caching JWTs and read responses; clear keys on mutations
- Never commit secrets; use environment variables or secret stores

---

## Troubleshooting
- Mongo connect error → verify `MONGO_URL` and network access
- Redis connection failure → check `REDIS_URL` and that the server is running
- Azure upload issues → confirm account name/key and container existence
- Images not loading → SAS may be expired; refresh the page or clear Redis cache

---

## Scripts
- `npm start` – start CRA dev server
- `npm run dev` – run Express API with Nodemon + ts-node
- `npm run build` – build production bundle
- `npm test` – run tests (CRA)

---

## License
This project is for learning and portfolio demonstration purposes.
