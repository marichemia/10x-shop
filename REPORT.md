10X Shop — Project Report
Project: 10X Shop, 10X Front-end graduation project

1. Project goal and scope
The goal was to develop a responsive React and TypeScript single-page shop that supports the CORE customer journey: catalog browsing, product details, adding and updating cart items, simulated login, and checkout confirmation. The implementation uses the DummyJSON API for product information and React Context for application-wide cart and authentication state.

 I prioritized completing a working CORE experience before adding optional advanced features.
2. Planned versus delivered
| Area | Planned CORE scope | Current reported implementation | Final verification |
| --- | --- | --- | --- |
| Setup | Vite, React, strict TypeScript, Tailwind v4 | Application configured | Confirm `typecheck` script and config |
| Routing | Catalog, product, cart, login, checkout, 404 | Routes and shared Layout implemented | Check each route and direct refresh |
| Catalog | DummyJSON fetch; loading/error/empty UI | Catalog and product cards implemented | Retest API errors/empty states |
| Product details | Fetch by ID; display product data and add to cart | Product page and quantity controls implemented | Test valid and invalid IDs |
| Cart | Shared state; add/remove/quantity/totals | CartProvider and CartPage implemented | Test stock limits and totals |
| Login | Controlled form; local auth and redirect | AuthProvider, LoginPage, protected route implemented | Test guest checkout and return |
| Checkout | Controlled form, validation, confirmation and cart reset | Checkout and confirmation implemented | Test invalid/valid form submits |
| UI | Responsive layout, interaction states | Mobile/desktop layouts previously tested | Final 375px and keyboard checks |
| Error handling | Error Boundary, API and not-found handling | Error Boundary and NotFoundPage implemented | Verify fallback and errors |
| Documentation | PLAN, README, REPORT, DEBUG-LOG | PLAN previously created; remaining documents drafted | Replace placeholders and review |

3. Implementation decisions
Components and routing
I separated pages from reusable components so the same product-card presentation could be used wherever needed. React Router handles page navigation without full browser reloads, while a shared layout contains the header and footer.
Product data
The catalog and product details use DummyJSON endpoints. useEffect starts the external fetch when the relevant page mounts or its fetch dependency changes; useState tracks data and loading/error conditions. TypeScript interfaces describe the expected product and API response structures.
Cart state
Cart state belongs to CartProvider instead of CartPage because several routes and the header need the same information. Components use useContext(CartContext) to access cart items and actions. Quantity and item updates use new state values rather than directly mutating existing state.
Authentication and checkout
Login is deliberately local and simulated, as required by the assignment. Checkout uses controlled form fields and client-side validation. After a valid simulated order, the application displays confirmation and clears the shared cart; it does not transmit payment or order data to a backend.
4. Scope and limitations
- CORE functionality took priority over optional FULL features such as advanced search/filter/sort, order history, profile editing, reviews, and sophisticated cart logic.
- The application uses a public test product API. There is no production backend, real authentication, actual payment processing, or real order persistence.
- Cart data currently resides in React state and is not preserved across a full browser reload.
- No Lighthouse performance scores or cross-browser compatibility results are claimed until measured.
5. Use of AI tools
I used ChatGPT for explanations of unfamiliar React/TypeScript concepts, suggestions for component structure, help investigating compiler and runtime errors, and drafting documentation. I reviewed changes by running the application, inspecting the code, and asking follow-up questions to understand how the pieces worked. I retained responsibility for selecting the project scope and verifying that the finished application meets the assignment requirements.

