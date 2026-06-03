# X-Laptop

A modern, full-featured e-commerce platform for browsing, purchasing, and managing laptop orders. Built with React, TypeScript, and Material-UI, featuring a sleek dark-themed UI with responsive design across all devices.

## Features

### Product Browsing
- **Dynamic Product Catalog** — Browse laptops with advanced filtering by category, RAM, storage, and search queries
- **Product Detail Pages** — High-resolution image galleries with Swiper carousel, detailed specs, pricing, and stock availability
- **Customer Reviews** — Star ratings, review breakdowns, and verified purchase badges
- **Popular & New Arrivals** — Curated sections showcasing top-viewed and recently added laptops

### Shopping Experience
- **Shopping Cart** — Add, remove, and manage cart items with localStorage persistence
- **Real-time Cart Management** — Quantity adjustments, item deletion, and clear-all functionality via custom `useBasket` hook
- **Order Creation** — Seamless checkout flow that converts cart items into orders via the backend API

### User Authentication & Profiles
- **Signup / Login** — Modal-based authentication with session management via cookies and localStorage
- **Profile Management** — Update nickname, phone, address, description, and profile image (with file upload support)
- **Logout** — Secure session termination with state cleanup
- **Top Users Leaderboard** — Community engagement showcase on the homepage

### Order Management
- **Order Dashboard** — View orders across multiple statuses: Processing, Paused, and Finished
- **Order Updates** — Modify order status and track order lifecycle
- **Order History** — Paginated order retrieval with status-based filtering

### UI/UX
- **Dark Theme Design** — Professional dark UI with MUI theming, custom shadows, and typography
- **Responsive Layout** — Mobile-first design with hamburger drawer navigation and adaptive grids
- **Toast Notifications** — Real-time feedback using Sonner for user actions
- **Smooth Animations** — Swiper carousels, hover effects, and transition animations
- **Help & FAQ Page** — Built-in support section with return policy, shipping, and warranty information

## Tech Stack

### Core
- **React 19** — UI library with latest concurrent features
- **TypeScript 5.9** — Type-safe development across the entire codebase
- **Vite 8** — Fast build tooling with HMR and optimized production builds

### State Management & Routing
- **Redux Toolkit 2** — Centralized state management with slices for Home, Items, and Orders
- **React Router DOM 7** — Client-side routing with nested routes and location-aware navigation

### UI & Styling
- **Material-UI 7** — Comprehensive component library with custom theme configuration
- **Emotion** — CSS-in-JS styling engine for dynamic styles
- **Swiper 12** — Touch-enabled slider for product image galleries

### HTTP & Data
- **Axios** — HTTP client with interceptors and credential-based requests
- **Universal Cookie** — Cookie management for session handling

### Testing & Quality
- **Vitest 3** — Unit and integration testing framework
- **Testing Library** — React component testing with DOM assertions
- **ESLint 9** — Code linting with React Hooks and React Refresh plugins
- **Prettier 3** — Consistent code formatting

### Utilities
- **Sonner** — Toast notification system
- **SweetAlert2** — Custom alert and confirmation dialogs

## Project Structure

```
src/
├── app/
│   ├── App.tsx                     # Root component with routing
│   ├── store.ts                    # Redux store configuration
│   ├── hooks.ts                    # Typed Redux hooks
│   ├── MaterialTheme/              # Custom MUI theme (styled, shadow, typography)
│   ├── components/
│   │   ├── auth/                   # Authentication modal (login/signup)
│   │   ├── context/                # Global context provider
│   │   ├── footer/                 # Site footer
│   │   ├── header/                 # Navbar components (HomeNavbar, OtherNavbar, Basket)
│   │   └── hooks/                  # Custom hooks (useBasket, useGlobals, UseScroll)
│   ├── services/
│   │   ├── MemberService.ts        # User authentication & profile API
│   │   ├── OrderService.ts         # Order CRUD operations
│   │   └── ProductService.ts       # Product catalog API
│   └── screens/
│       ├── homePage/               # Landing page (popular, new, video, top users, news)
│       ├── itemsPage/              # Product listing & detail (LaptopList, ChosenLaptop, StoreMap)
│       ├── ordersPage/             # Order management (Process, Paused, Finished orders)
│       ├── userPage/               # User profile & settings
│       └── helpPage/               # FAQ and support
├── lib/
│   ├── config.ts                   # API endpoint configuration
│   ├── data.ts                     # Static data (events/plans)
│   ├── data/
│   │   ├── faq.ts                  # FAQ content
│   │   └── terms.ts                # Terms of service
│   ├── enums/                      # TypeScript enums (order, member, item, view)
│   └── types/                      # TypeScript interfaces (cart, item, member, orders, screen)
├── css/
│   └── main.css                    # Global styles
├── main.tsx                        # Application entry point
└── test/                           # Vitest test files
```

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Yarn** or **npm**

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd X-laptop-frontend
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Configure environment variables:
```bash
# .env
VITE_API_URL=http://localhost:3003
```

4. Start the development server:
```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`.

## VPS Deployment

This frontend is a Vite static app. For a real VPS, the recommended setup is:

- build the frontend into `dist/`
- serve `dist/` with **Nginx**
- proxy `/api` from Nginx to your backend app
- use `VITE_API_URL=/api` in production so login cookies work on the same domain

### 1. Production env

Create a production env file from the example:

```bash
cp .env.production.example .env.production
```

Recommended value:

```bash
VITE_API_URL=/api
```

If your backend is on another domain, use a full URL instead:

```bash
VITE_API_URL=https://api.example.com
```

### 2. Build the frontend

You can build locally and upload `dist/`, or build directly on the VPS.

```bash
yarn install
yarn build
```

### 3. Upload project to the VPS

Example target path:

```bash
/var/www/x-laptop/current
```

Typical flow on the VPS:

```bash
cd /var/www
git clone <your-repo-url> x-laptop
cd x-laptop
yarn install
cp .env.production.example .env.production
# edit .env.production
yarn build
```

### 4. Install and configure Nginx

Use the provided template:

```bash
sudo cp deploy/nginx.x-laptop.conf /etc/nginx/sites-available/x-laptop
```

Then edit these values:

- `server_name example.com www.example.com`
- `root /var/www/x-laptop/current/dist`
- `proxy_pass http://127.0.0.1:3003/` to match your backend port

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/x-laptop /etc/nginx/sites-enabled/x-laptop
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Important note for auth and cookies

This app uses `withCredentials: true` for authentication and order/profile requests.

Best production setup:

- frontend: `https://example.com`
- backend API through Nginx: `https://example.com/api`

That avoids most CORS and cookie issues.

If you use a separate API domain like `https://api.example.com`, your backend must also be configured correctly for credentialed CORS:

- `Access-Control-Allow-Origin` must be the exact frontend origin, not `*`
- `Access-Control-Allow-Credentials: true`
- cookies should usually be `Secure`
- cross-site cookies usually require `SameSite=None`

### 6. HTTPS

After Nginx works on port 80, add SSL with Certbot:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d example.com -d www.example.com
```

### 7. Update flow

For each new deployment:

```bash
cd /var/www/x-laptop/current
git pull
yarn install
yarn build
sudo systemctl reload nginx
```

### 8. Backend requirement

This frontend will not function by itself. Your backend must already be running on the VPS, and the Nginx `/api/` proxy must point to it.

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with HMR |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview production build locally |
| `yarn test` | Run tests in watch mode |
| `yarn test:run` | Run tests once |
| `yarn test:ui` | Run tests with Vitest UI |
| `yarn lint` | Run ESLint |
| `yarn format` | Format code with Prettier |
| `yarn format:check` | Check formatting without writing |

## Architecture Highlights

### State Management
Redux Toolkit manages three main feature slices:
- **homePage** — Top laptops, new arrivals, and top users
- **itemsPage** — Product listings and filters
- **order** — Order state and status tracking

### API Integration
Service classes encapsulate all backend communication:
- `MemberService` — Authentication, profile updates, top users
- `ProductService` — Product listing, detail retrieval with filtering
- `OrderService` — Order creation, retrieval, and updates

All requests use `withCredentials: true` for cookie-based session authentication.

### Cart System
The `useBasket` hook provides a lightweight cart implementation:
- Persistent storage via `localStorage`
- Add, increment, decrement, remove, and clear operations
- Duplicate detection with automatic quantity updates

## License

Private — All rights reserved.
