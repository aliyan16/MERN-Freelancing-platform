## Work-ify - Freelancing Platform (MERN + Redis + Azure)

A full‑stack freelancing marketplace built with the MERN stack. Sellers can create and manage gigs with images stored on Azure Blob Storage; buyers can place orders. The backend uses Redis for caching and token storage, and Azure SAS URLs for secure, time‑limited access to media. The frontend is a React app with Redux Toolkit and React Router.

🌐 **Live Application**: [https://work-ify.vercel.app/](https://work-ify.vercel.app/)

### Tech Stack
- **Frontend**: React 18, React Router, Redux Toolkit, Axios, Tailwind CSS/PostCSS
- **Backend**: Node.js, Express 5, JavaScript (ES Modules)
- **Database**: MongoDB Atlas (Mongoose 8)
- **Cache/Session**: Redis Cloud (token caching, response caching)
- **Cloud Storage**: Azure Blob Storage (SAS URLs for secure access)
- **Auth**: JWT (bcryptjs for password hashing)
- **Uploads**: Multer in‑memory → Azure Blob
- **Security**: Helmet, express-mongo-sanitize, CORS; route rate limiting

### Deployment
- **Frontend**: [Vercel](https://vercel.com/) - [https://work-ify.vercel.app/](https://work-ify.vercel.app/)
- **Backend**: [Render](https://render.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cache**: [Redis Cloud](https://redis.com/cloud/)
- **Image Storage**: [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs/)

### Key Features
- **User auth**: Register, login, logout with JWT; tokens cached in Redis
- **Gig management**: Create, read, update, delete; pause/unpause; Azure image upload
- **Orders**: Create orders, list by buyer/seller; gig order counters
- **Media security**: Time‑limited SAS URLs for images; server never exposes keys
- **Caching**:
  - Gigs list and gig details cached in Redis (`gigs_all`, `gig_<id>`)
  - SAS URLs cached per blob (`sas_<blobName>`) to reduce churn
- **Pagination**: Cursor/offset style pagination on list endpoints with `page`/`limit`
- **Database indexing**: Indexes on frequently queried fields to speed up search/sort
- **Rate limiting**: Per‑IP limits on public routes to mitigate abuse
- **Request hardening**: Helmet headers and MongoDB query injection sanitization

---

## Project Structure
```
MERN-Freelancing-platform/
├── freelanceapp/
│   ├── client/                    # React Frontend Application
│   │   ├── public/                # Static assets
│   │   ├── src/
│   │   │   ├── Pages/             # React pages (login, register, dashboard, gig, order, etc.)
│   │   │   ├── components/        # Reusable components (header, footer, dashboard components)
│   │   │   ├── slices/            # Redux slices (authSlice, gigSlice, orderSlice)
│   │   │   ├── appstore/          # Redux store configuration
│   │   │   ├── Routing/           # Route configuration (public/private routes)
│   │   │   ├── App.tsx            # Main App component
│   │   │   └── index.tsx          # Entry point
│   │   ├── package.json
│   │   └── build/                 # Production build output
│   │
│   └── server/                    # Node.js Backend Application
│       ├── src/
│       │   ├── config/
│       │   │   └── db.js          # MongoDB connection (MongoDB Atlas)
│       │   ├── controllers/
│       │   │   └── authController.js
│       │   ├── middleware/
│       │   │   └── authMiddleware.js
│       │   ├── models/            # Mongoose models
│       │   │   ├── user.js
│       │   │   ├── gig.js
│       │   │   └── order.js
│       │   ├── routes/            # API routes
│       │   │   ├── authRoutes.js
│       │   │   ├── gigRoutes.js
│       │   │   ├── orderRoutes.js
│       │   │   └── pageRoutes.js
│       │   └── index.js           # Express server entry point
│       ├── utilities/
│       │   ├── azureUploads.js    # Azure Blob Storage client, upload, delete
│       │   └── redisClient.js     # Redis Cloud connection
│       └── package.json
└── README.md
```

---

## Backend Overview

- `freelanceapp/server/src/index.js`: wires CORS, JSON, security middleware (Helmet, express‑mongo‑sanitize), per‑IP rate limiter, and mounts:
  - `/api/auth` → `authRoutes`
  - `/api/gigs` → `gigRoutes`
  - `/api/orders` → `orderRoutes`
- `freelanceapp/server/src/config/db.js`: connects to MongoDB Atlas using `MONGO_URL`
- `freelanceapp/server/utilities/azureUploads.js`: creates container client and exports:
  - `uploadToAzure(file)` to upload memory buffer to Azure Blob Storage
  - `deleteFromAzure(blobName)` to remove blobs
  - helpers used by routes to generate SAS URLs
- `freelanceapp/server/utilities/redisClient.js`: connects to Redis Cloud using `REDIS_URL`

### API Endpoints (selected)
- Auth (`/api/auth`)
  - `POST /register` → hash password, create user, issue JWT, cache `jwt_<userId>`
  - `POST /login` → verify password, issue JWT, cache `jwt_<userId>`
  - `POST /logout` → delete cached `jwt_<userId>`
- Gigs (`/api/gigs`)
  - `POST /` (multipart `image`) → create gig, upload image to Azure, invalidate `gigs_all`
  - `GET /` → list gigs; supports `page`, `limit`, `sort`, `search`; cache enriched list with `imageUrl` SAS in `gigs_all`
  - `GET /:id` → get gig; cache as `gig_<id>` including `imageUrl`
  - `PUT /:id` (multipart `image`) → update gig; refresh caches
  - `DELETE /:id` → delete gig and blob; clear caches
  - `PATCH /:id/pause` → toggle status `active`/`paused`; clear caches
- Orders (`/api/orders`)
  - `POST /` (multipart `image`) → create order; increment gig `orders` count
  - `GET /buyer/:buyerId` → list purchases with seller/gig populated; supports `page`/`limit`
  - `GET /seller/:sellerId` → list sales with buyer/gig populated, include `imageUrl`; supports `page`/`limit`

#### Pagination & Querying
- Use `?page=1&limit=20` on list endpoints. Defaults can be configured via env.
- Optional: `sort` (e.g., `sort=createdAt:desc` or `price:asc`) and `search` (text match on gig title/keywords) if applicable.

Note: SAS URLs are generated with short lifetimes and, for gigs, are cached in Redis to reduce recomputation.

---

## Frontend Overview
- React app with Redux Toolkit slices: `authSlice`, `gigSlice`, `orderSlice`
- Routing with `react-router-dom` and guarded routes in `Routing/privateRoutes.tsx`
- API calls using Axios with base URL from `REACT_APP_BACKEND_URL` environment variable
- Tailwind CSS (via PostCSS) for styling
- Pages include: Login, Register, Dashboard, Create/Edit Gig, Order Management, Profile, Order History

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local) and a connection string
- Redis instance (Docker/local/managed)
- Azure Storage account with access key and a container named `gig-images`

### Environment Variables

#### Backend Environment Variables (Render)
Create environment variables in your Render dashboard or `.env` file in `freelanceapp/server/`:

```env
PORT=5000
MONGO_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://<redis-cloud-url>:<port>  # Redis Cloud connection string
AZURE_STORAGE_ACCOUNT_NAME=your_azure_account
AZURE_STORAGE_ACCOUNT_KEY=your_azure_key
# Optional tuning
RATE_LIMIT_WINDOW_MS=900000          # 15 minutes
RATE_LIMIT_MAX=100                   # max requests per IP per window
PAGINATION_DEFAULT_LIMIT=20
```

#### Frontend Environment Variables (Vercel)
Create environment variables in your Vercel dashboard or `.env` file in `freelanceapp/client/`:

```env
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

**Note**: Replace `your-backend-url.onrender.com` with your actual Render backend URL.

### Install

#### Frontend
```bash
cd freelanceapp/client
npm install
```

#### Backend
```bash
cd freelanceapp/server
npm install
```

### Run Locally

#### Frontend (Development)
```bash
cd freelanceapp/client
npm start
```
Runs React dev server on http://localhost:3000

#### Backend (Development)
```bash
cd freelanceapp/server
npm start
```
Runs Express server on http://localhost:5000 (or PORT from env)

### Build

#### Frontend (Production)
```bash
cd freelanceapp/client
npm run build
```
Outputs production assets to `freelanceapp/client/build/`

---

## Deployment

### Frontend Deployment (Vercel)
1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/)
3. Set the root directory to `freelanceapp/client`
4. Configure environment variables:
   - `REACT_APP_BACKEND_URL`: Your Render backend URL
5. Deploy! Your app will be available at `https://work-ify.vercel.app/`

### Backend Deployment (Render)
1. Create a new Web Service in [Render](https://render.com/)
2. Connect your GitHub repository
3. Set the root directory to `freelanceapp/server`
4. Configure build command: `npm install`
5. Configure start command: `npm start`
6. Set environment variables:
   - `PORT`: 5000 (or let Render assign)
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `REDIS_URL`: Your Redis Cloud connection string
   - `AZURE_STORAGE_ACCOUNT_NAME`: Your Azure storage account name
   - `AZURE_STORAGE_ACCOUNT_KEY`: Your Azure storage account key
7. Deploy!

### Database Setup (MongoDB Atlas)
1. Create a cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist Render's IP addresses (or use 0.0.0.0/0 for development)
4. Get your connection string and set it as `MONGO_URL`

### Cache Setup (Redis Cloud)
1. Create a database in [Redis Cloud](https://redis.com/cloud/)
2. Get your connection URL (includes host, port, and password)
3. Set it as `REDIS_URL` in your Render environment variables

### Image Storage Setup (Azure Blob Storage)
1. Create a Storage Account in [Azure Portal](https://portal.azure.com/)
2. Create a container named `gig-images`
3. Get your storage account name and access key
4. Set `AZURE_STORAGE_ACCOUNT_NAME` and `AZURE_STORAGE_ACCOUNT_KEY` in Render

### Important Notes
- Ensure CORS is properly configured in your backend to allow requests from your Vercel frontend URL
- MongoDB Atlas: Whitelist Render's IP addresses or use 0.0.0.0/0 (less secure, but easier for development)
- Redis Cloud: Ensure your Redis instance is accessible from Render's servers
- Azure Blob Storage: The container `gig-images` must exist before deploying

---

## Security & Best Practices
- Passwords hashed with bcrypt; JWT signed with `JWT_SECRET`
- SAS URLs are time‑boxed and generated server‑side
- Redis used for caching JWTs and read responses; clear keys on mutations
- Never commit secrets; use environment variables or secret stores
- Apply secure headers with Helmet (X‑DNS‑Prefetch‑Control, X‑Frame‑Options, etc.)
- Sanitize request data to prevent MongoDB operator injection (express‑mongo‑sanitize)
- Enforce per‑IP rate limits on public endpoints; tune via env variables
- Validate and whitelist query parameters for pagination/sorting
- Create MongoDB indexes on fields used for filtering/sorting to avoid COLLSCAN

---

## Troubleshooting

### Common Issues

- **MongoDB connection error** → Verify `MONGO_URL` in Render, check MongoDB Atlas IP whitelist includes Render's IPs
- **Redis connection failure** → Check `REDIS_URL` in Render, ensure Redis Cloud allows connections from Render
- **Azure upload issues** → Confirm `AZURE_STORAGE_ACCOUNT_NAME` and `AZURE_STORAGE_ACCOUNT_KEY` are correct, verify `gig-images` container exists
- **Images not loading** → SAS URLs may be expired; refresh the page or clear Redis cache
- **CORS errors** → Ensure backend CORS settings allow your Vercel frontend URL
- **Frontend can't reach backend** → Verify `REACT_APP_BACKEND_URL` in Vercel matches your Render backend URL
- **Frequent 429 responses** → You're hitting the rate limiter; raise `RATE_LIMIT_MAX` or widen `RATE_LIMIT_WINDOW_MS` for dev
- **Build failures on Vercel** → Check that root directory is set to `freelanceapp/client` in Vercel settings

---

## Scripts

### Frontend (freelanceapp/client)
- `npm start` – start React dev server
- `npm run build` – build production bundle
- `npm test` – run tests

### Backend (freelanceapp/server)
- `npm start` – start Express server (production)

---

## License
This project is for learning and portfolio demonstration purposes.
