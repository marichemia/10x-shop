# 10X Shop

10X Shop is a responsive single-page e-commerce application built for the 10X Front-end graduation project. It uses React, TypeScript, Tailwind CSS, and the DummyJSON products API to demonstrate a complete simulated shopping flow, from browsing products to confirming an order.

The project focuses on the **CORE** requirements. Authentication and checkout are simulations: there is no real user account system, payment processing, or backend order database.

## Features

### Implemented CORE features

- **Product catalog:** load products from DummyJSON and display product cards, with loading, error, and empty states.
- **Product details:** navigate to `/products/:id` to view a product, its description, images, price, stock, and quantity controls.
- **Shopping cart:** add products, adjust quantities, remove items, clear the cart, and view discounted totals.
- **Shared cart state:** React Context keeps the cart and the header cart counter synchronized across routes.
- **Simulated login:** a controlled login form updates authentication state locally.
- **Protected checkout:** guests visiting checkout are redirected to login and can continue afterward.
- **Simulated checkout:** a validated form displays an order confirmation and clears the cart after submission.
- **Responsive design:** layouts adapt for mobile and desktop.
- **Basic error handling:** invalid routes, API errors, and an Error Boundary are handled in the UI.

### Not implemented (FULL / optional)

Advanced catalog search, category filtering, sorting, pagination, saved order history, editable profile, product reviews, and real payments are outside the current implemented scope.

## Tech stack

- React 19 and React Router
- TypeScript (strict configuration)
- Vite
- Tailwind CSS v4
- React Context API and React Hooks (`useState`, `useEffect`, `useContext`)
- DummyJSON REST API
- ESLint

## Application routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Product catalog | Public |
| `/products/:id` | Product details | Public |
| `/cart` | Shopping cart | Public |
| `/login` | Simulated login | Public |
| `/checkout` | Place a simulated order | Login required |
| `*` | Not-found page | Public |

## Project architecture

The main application is organized approximately as follows.

```text
src/
├── components/           # Header, Footer, ProductCard, ProductGrid, ErrorBoundary
├── context/              # CartContext/CartProvider and AuthContext/AuthProvider
├── pages/                # CatalogPage, ProductPage, CartPage, LoginPage,
│                         # CheckoutPage, NotFoundPage
├── routes/               # ProtectedRoute
├── types/                # Typed product and cart data
├── utils/                # Formatting and pricing helpers
└── App.tsx               # Providers and application routes
```

`App.tsx` defines the routes and places the cart and authentication providers above the pages that need them. Catalog and product-detail components load data from DummyJSON using `fetch` and `useEffect`, while product information is passed to reusable cards through props. `CartProvider` owns the shared cart state and exposes actions such as `addItem`, `removeItem`, and `setQuantity` through Context; this keeps the header counter and cart page synchronized. `AuthProvider` stores the simulated login state, and `ProtectedRoute` restricts checkout to logged-in users.

## Getting started

### Prerequisites

- Node.js and npm

### Run locally

```bash
git clone https://github.com/marichemia/10x-shop-mariamchemia.git
cd 10x-shop-mariamchemia
npm install
npm run dev
```

Open the local address shown in the Vite terminal (often `http://localhost:5173/`).

### Other scripts

```bash
npm run lint
npm run build
```

## Live demo

https://10x-shop-mariamchemia.netlify.app

## Limitations

- Product information is read from the DummyJSON test API and depends on its availability.
- Authentication and checkout are simulations, with no real accounts, payments, or order processing.
- The cart currently lives in React state; a full browser reload resets it.
- FULL-level functionality is not implememted.

## Development documentation

- [`PLAN.md`](PLAN.md) — original project plan and scope
- [`REPORT.md`](REPORT.md) — delivered work, checks, limitations, and retrospective
- [`DEBUG-LOG.md`](DEBUG-LOG.md) — real debugging incidents and their fixes

## Credits

Developed as an individual 10X Front-end graduation project. ChatGPT was used as a coding-learning and debugging assistant, including guidance on React concepts, architecture, troubleshooting, and documentation.

