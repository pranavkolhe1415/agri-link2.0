# AgriLink — React + Express + MongoDB

This repository contains the supplied AgriLink React UI and a new Node.js/Express/MongoDB API.

## Architecture

- `src/` — existing React/Vite frontend. Existing visual components are retained.
- `backend/` — Express REST API, Mongoose models, JWT authentication, approval workflow, products, orders and notifications.
- MongoDB stores users, products, orders and notifications.
- Passwords are hashed with bcrypt. JWTs are sent in the `Authorization: Bearer <token>` header.

## Requirements

- Node.js 20+
- MongoDB local instance or MongoDB Atlas database
- npm

## 1. Configure the API

```bash
cd backend
cp .env.example .env
```

Set at least:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/agrilink
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@agriconnect.in
ADMIN_PASSWORD=use-a-strong-unique-password
```

The first server start creates the admin account only if the email does not already exist. Do not use a demo password in production.

### Email OTP

To deliver OTPs by email, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` in `backend/.env`.

If SMTP is not configured, OTPs are printed to the backend terminal only when `NODE_ENV=development`. No fixed/demo OTP is accepted. Configure SMTP before deploying.

### Image uploads

The existing frontend currently reads selected images as data URLs. Keep image sizes reasonable (the API JSON body limit is 8 MB). For production, configure Cloudinary and replace data-URL submissions with signed/validated uploads; never store large original images as MongoDB document strings.

## 2. Configure the frontend

At the repository root:

```bash
cp .env.example .env
```

Set:

```env
VITE_API_URL=http://localhost:5000/api
```

## 3. Install and run

Terminal 1 — API:

```bash
cd backend
npm install
npm run dev
```

Terminal 2 — frontend:

```bash
# from repository root
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

The root package also includes:

```bash
npm run dev:api
npm run dev:all
```

`dev:all` runs the Vite and API development servers together after dependencies are installed.

## API endpoints

### Authentication
- `POST /api/auth/register` — register Farmer or Industry; creates pending account and sends OTP
- `POST /api/auth/verify-otp` — verifies four-digit email OTP
- `POST /api/auth/resend-otp` — sends a new OTP
- `POST /api/auth/login` — Farmer, Industry or Admin login
- `GET /api/auth/me` — current authenticated user
- `POST /api/auth/logout` — logout acknowledgement; client removes JWT

### Admin (Admin JWT required)
- `GET /api/admin/overview`
- `GET /api/admin/pending`
- `GET /api/admin/users?role=farmer|industry&status=approved`
- `PATCH /api/admin/users/:id/approve`
- `PATCH /api/admin/users/:id/reject`
- `DELETE /api/admin/users/:id`

Only OTP-verified pending accounts appear in the approval queue. Approval updates the database status and creates a notification.

### Products
- `GET /api/products?category=vegetables&search=tomato`
- `POST /api/products` — Farmer only
- `GET /api/products/mine` — Farmer only
- `DELETE /api/products/:id` — owning Farmer or Admin

### Orders and notifications
- `POST /api/orders` — Industry only; atomically reserves stock and creates an order
- `GET /api/orders/mine` — role-specific order history
- `GET /api/notifications`
- `PATCH /api/notifications/read-all`

## Account workflow

1. Farmer/Industry submits registration.
2. API hashes the password, stores the account as `pending`, and sends a time-limited four-digit OTP.
3. OTP verification sets `otpVerifiedAt`; it does not approve the account.
4. Admin reviews the verified pending registration and approves or rejects it.
5. Only approved accounts can log in.
6. Farmer product uploads are stored in MongoDB and visible in the public product API.
7. Industry orders reserve inventory atomically so the order cannot exceed remaining quantity.

## Important production checklist

- Use MongoDB Atlas or a secured MongoDB deployment.
- Set a strong unique `JWT_SECRET` and Admin password.
- Configure SMTP for real OTP delivery.
- Configure Cloudinary/object storage for uploaded images and documents.
- Use HTTPS.
- Add a privacy policy and retention rules for sensitive identity documents.
- Add a payment gateway before treating orders as paid transactions. Current order creation records an order and adjusts inventory; it does not collect payment.
- Configure rate limits, backups, monitoring and deployment environment variables.

## Notes about this conversion

The original UI included a browser-local demo data provider. The supplied context and authentication forms have been changed to call the new API for registration, login, admin approvals, products, orders and notifications. Cart selections remain client-side in this iteration. Review any additional page-specific demo/mock data before production deployment.
