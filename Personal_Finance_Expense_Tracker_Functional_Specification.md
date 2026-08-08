# Personal Finance & Expense Tracker

## Beginner-Friendly Functional Specification and Project Guide

**Project type:** Full-stack portfolio project  
**Recommended level:** Beginner progressing toward intermediate  
**Architecture:** Feature-sliced modular monolith  
**Document version:** 1.0  

---

## 1. Project Vision

Build a web application where a registered user can record income and expenses, organize transactions into categories, review their current financial position, and understand spending habits through charts.

The main learning objective is not only to complete CRUD operations. This project should teach you how a full-stack feature moves through the entire application:

1. The user interacts with a page or form.
2. The frontend validates and submits data.
3. The API authenticates and validates the request.
4. The controller coordinates the operation.
5. The service applies business rules.
6. The model reads or writes MongoDB data.
7. The API returns a consistent response.
8. The frontend refreshes the affected data and user interface.

## 2. Recommended Project Scope

### Minimum Viable Product (MVP)

- User registration, login, logout, and protected pages
- Dashboard with total income, total expenses, and current balance
- Create, view, edit, and delete transactions
- Income and expense transaction types
- Default and user-created categories
- Transaction filtering by date, type, and category
- Spending breakdown chart by category
- Income-versus-expense chart by month
- Profile and basic account settings
- Responsive desktop and mobile layout

### Out of Scope for the First Version

Do not include these until the MVP works reliably:

- Bank or e-wallet integration
- Automated transaction imports
- Multi-currency conversion
- Shared household accounts
- Recurring transactions
- Budget alerts and notifications
- Receipt scanning
- AI financial advice
- Native mobile application

These are useful future enhancements, but adding them early will make a beginner project unnecessarily difficult.

## 3. Recommended Tech Stack

| Layer | Technology | Purpose | Why it fits this project |
| --- | --- | --- | --- |
| Frontend | React with Vite and TypeScript | User interface | Fast setup and teaches reusable typed components |
| Routing | React Router | Page navigation and protected routes | Clear routing without requiring a full framework |
| Styling | Tailwind CSS | Responsive styling | Fast, consistent, and portfolio-friendly |
| UI components | shadcn/ui or a small custom component set | Forms, dialogs, cards, tables | Reduces repetitive UI work while retaining control |
| Server state | TanStack Query | Fetching, caching, mutations, and loading states | Separates API data from local UI state |
| Local UI state | React state/context | Dialogs, filters, and auth session access | Sufficient for the MVP; Redux is not required |
| Forms | React Hook Form | Form state and submission | Reduces form boilerplate |
| Validation | Zod | Shared validation concepts | Provides clear and reusable schemas |
| Charts | Recharts | Financial charts | React-friendly and simple for beginners |
| Backend | Node.js, Express, and TypeScript | REST API | Straightforward full-stack JavaScript learning path |
| Database | MongoDB Atlas | Persistent application data | Flexible document storage and easy deployment |
| ODM | Mongoose | Schemas, validation, and queries | Matches the requested MongoDB learning goal |
| Authentication | JWT in an HTTP-only cookie | Secure browser session | Avoids exposing the token to frontend JavaScript |
| Password security | bcrypt | Password hashing | Standard password storage practice |
| Testing | Vitest, React Testing Library, and Supertest | Unit, UI, and API tests | Covers the most important application layers |
| API testing | Bruno or Postman | Manual endpoint testing | Makes backend development easier to verify |
| Deployment | Vercel for client; Render for API; MongoDB Atlas for data | Hosting | Beginner-friendly deployment workflow |

### Why TypeScript Is Recommended

TypeScript adds a small learning cost, but it helps you understand application data shapes. A transaction, category, authenticated user, and API response should have predictable fields across the frontend and backend. This is especially helpful when calculations depend on correct numeric data.

### Important State-Management Rule

Use different tools for different kinds of state:

- **TanStack Query:** Transactions, categories, dashboard summaries, and analytics returned by the API.
- **React state:** Open dialogs, selected tabs, temporary filter controls, and form UI behavior.
- **Auth context:** The currently authenticated user and initial session check.

Do not place all API data into one global store. That creates extra complexity without improving this project.

## 4. Architecture Approach

Use a **feature-sliced modular monolith**. The client and server remain separate applications, but each application groups files by business feature instead of grouping the entire project only by technical type.

Each feature should own the files needed for its behavior. For example, authentication owns its pages, forms, API requests, controller, service, model, routes, and validation. A transaction feature follows the same pattern.

### Responsibility Flow

| Layer | Main responsibility | Should not do |
| --- | --- | --- |
| Route | Match URL and HTTP method; attach middleware | Perform calculations or database queries |
| Controller | Read request data and return HTTP response | Contain large business rules |
| Service | Apply business rules and coordinate data operations | Know about React or UI behavior |
| Model/Repository | Define data structure and perform persistence operations | Decide HTTP status codes |
| Validation | Confirm request shape and allowed values | Save data |
| Frontend API module | Communicate with backend endpoints | Render the UI |
| Hook | Expose feature data and actions to components | Implement server business rules |
| Component/Page | Present data and collect user input | Access MongoDB directly |

## 5. Recommended Folder Structure

```text
personal-finance-tracker/
├── README.md
├── package.json
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── router/
│   │   │   ├── providers/
│   │   │   └── layouts/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── schemas/
│   │   │   │   └── types/
│   │   │   ├── dashboard/
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   └── pages/
│   │   │   ├── transactions/
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── schemas/
│   │   │   │   └── types/
│   │   │   ├── categories/
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   └── types/
│   │   │   ├── analytics/
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   └── pages/
│   │   │   └── profile/
│   │   │       ├── api/
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       ├── pages/
│   │   │       └── schemas/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── assets/
│   │   ├── main.tsx
│   │   └── styles.css
│   └── tests/
└── server/
    ├── src/
    │   ├── app/
    │   │   ├── app.ts
    │   │   ├── server.ts
    │   │   └── routes.ts
    │   ├── config/
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── auth.controller.ts
    │   │   │   ├── auth.service.ts
    │   │   │   ├── auth.routes.ts
    │   │   │   └── auth.validation.ts
    │   │   ├── users/
    │   │   │   ├── user.model.ts
    │   │   │   ├── user.controller.ts
    │   │   │   ├── user.service.ts
    │   │   │   ├── user.routes.ts
    │   │   │   └── user.validation.ts
    │   │   ├── transactions/
    │   │   │   ├── transaction.model.ts
    │   │   │   ├── transaction.controller.ts
    │   │   │   ├── transaction.service.ts
    │   │   │   ├── transaction.routes.ts
    │   │   │   └── transaction.validation.ts
    │   │   ├── categories/
    │   │   │   ├── category.model.ts
    │   │   │   ├── category.controller.ts
    │   │   │   ├── category.service.ts
    │   │   │   ├── category.routes.ts
    │   │   │   └── category.validation.ts
    │   │   └── analytics/
    │   │       ├── analytics.controller.ts
    │   │       ├── analytics.service.ts
    │   │       ├── analytics.routes.ts
    │   │       └── analytics.validation.ts
    │   ├── middleware/
    │   ├── shared/
    │   │   ├── errors/
    │   │   ├── types/
    │   │   └── utils/
    │   └── tests/
    └── scripts/
```

### Folder Rules

- A file used only by one feature stays inside that feature.
- A component or utility moves into `shared` only when at least two features genuinely use it.
- Feature folders may use shared code, but shared code must not depend on a specific feature.
- The analytics feature may read transaction data through a service, but it should not duplicate transaction records.
- Avoid creating folders with no current purpose. Add a folder when the first relevant file is needed.

## 6. Core Data Model

### 6.1 User

**Purpose:** Stores account identity and basic preferences.

| Field | Expected data | Rules |
| --- | --- | --- |
| Name | Text | Required; trimmed; reasonable length limit |
| Email | Text | Required; unique; stored in normalized lowercase form |
| Password hash | Text | Required; never returned by the API |
| Preferred currency | Text | Defaults to PHP for this project |
| Created date | Date/time | Set automatically |
| Updated date | Date/time | Set automatically |

### 6.2 Category

**Purpose:** Classifies income and expenses.

| Field | Expected data | Rules |
| --- | --- | --- |
| Owner | User reference or system designation | Custom categories belong to one user |
| Name | Text | Required; unique per user and type |
| Type | Income or Expense | Required |
| Color | Valid color value | Used by charts and labels |
| Icon | Supported icon name | Optional presentation setting |
| Is default | Boolean | Identifies system-provided categories |
| Created date | Date/time | Set automatically |

Suggested default expense categories: Groceries, Rent, Utilities, Transportation, Entertainment, Healthcare, and Other.

Suggested default income categories: Salary, Freelance, Business, Gift, and Other.

### 6.3 Transaction

**Purpose:** Stores one financial movement owned by one user.

| Field | Expected data | Rules |
| --- | --- | --- |
| Owner | User reference | Required; derived from authenticated session |
| Type | Income or Expense | Required |
| Amount | Positive numeric value | Required; must be greater than zero |
| Category | Category reference | Required; must belong to user or be an allowed default |
| Description | Text | Optional with length limit |
| Transaction date | Date | Required; may default to today |
| Created date | Date/time | Set automatically |
| Updated date | Date/time | Set automatically |

### Money Storage Decision

For this beginner project, store monetary values as integer centavos rather than floating-point numbers. For example, PHP 125.50 is stored as 12,550 centavos. This avoids common decimal rounding problems. The UI formats the integer as currency for display.

## 7. Feature Specifications

## 7.1 Authentication Feature

### Goal

Allow a user to create an account and securely access only their own financial records.

### Frontend Responsibilities

- Registration page and form
- Login page and form
- Initial authenticated-session check
- Logout action
- Protected route behavior
- Friendly validation and authentication errors
- Redirect authenticated users away from login and registration pages

### Backend Responsibilities

- Register a unique user account
- Hash the password before saving
- Authenticate email and password
- Issue the session token in a secure HTTP-only cookie
- Return the safe current-user profile
- Clear the session cookie during logout
- Reject protected requests without a valid session

### Functional Rules

- Email comparison is case-insensitive.
- Password has a documented minimum length.
- Generic login errors should not reveal whether an email exists.
- Password hashes and session tokens never appear in response bodies.
- Registration may create the user's default categories.

### Suggested Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create account and begin session |
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/logout` | End session |
| GET | `/api/auth/me` | Return current authenticated user |

### Acceptance Criteria

- A new user can register with valid information.
- A duplicate email is rejected.
- A user can log in and remain authenticated after refreshing the browser.
- An unauthenticated user cannot access dashboard data.
- Logging out prevents further access to protected endpoints.

## 7.2 Transaction Feature

### Goal

Allow a user to manage their income and expense records.

### Frontend Responsibilities

- Transaction list or table
- Add-transaction form
- Edit-transaction form or dialog
- Delete confirmation
- Empty, loading, and error states
- Filters for type, category, and date range
- Pagination when the list becomes large
- Currency and date formatting

### Backend Responsibilities

- Create, read, update, and delete transactions
- Filter and sort only the authenticated user's records
- Validate transaction type, amount, date, and category
- Verify ownership before returning or modifying a record
- Return paginated results and pagination metadata

### Functional Rules

- Amount must be greater than zero.
- Type must be either income or expense.
- Category type must match transaction type.
- The owner comes from authentication and is never trusted from submitted form data.
- A user cannot access or change another user's transaction by guessing its identifier.
- Default ordering is newest transaction date first.
- Deleting a transaction immediately affects totals and charts after refetching.

### Suggested Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/transactions` | List owned transactions with filters and pagination |
| POST | `/api/transactions` | Create a transaction |
| GET | `/api/transactions/:id` | View one owned transaction |
| PATCH | `/api/transactions/:id` | Update one owned transaction |
| DELETE | `/api/transactions/:id` | Delete one owned transaction |

### Acceptance Criteria

- A user can create valid income and expense records.
- Invalid or zero amounts are rejected.
- Filters can be combined without leaking other users' data.
- Editing changes the history, totals, and charts.
- Deletion requires confirmation in the UI.

## 7.3 Category Feature

### Goal

Provide meaningful classifications for transactions and charts.

### Frontend Responsibilities

- Category selector grouped by income and expense
- Category management view or dialog
- Color and optional icon selection
- Clear handling when a category is already used

### Backend Responsibilities

- List allowed categories for the authenticated user
- Create and update custom categories
- Prevent duplicate category names for the same user and type
- Control deletion when transactions reference the category

### Functional Rules

- Income categories cannot be assigned to expense transactions, and vice versa.
- Default categories may be read-only in the MVP.
- A used category should not be hard-deleted. The beginner-friendly choice is to prevent deletion until its transactions are reassigned.
- Category names should be unique within the same type for one user.

### Suggested Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/categories` | List available categories |
| POST | `/api/categories` | Create a custom category |
| PATCH | `/api/categories/:id` | Update a custom category |
| DELETE | `/api/categories/:id` | Delete an unused custom category |

## 7.4 Dashboard Feature

### Goal

Give the user an immediate summary of their selected financial period.

### Dashboard Content

- Total income
- Total expenses
- Current balance
- Recent transactions
- Spending-by-category chart
- Income-versus-expense chart
- Date-period control, such as current month, last month, or custom range

### Calculation Rules

- **Total income:** Sum of income transactions in the selected period.
- **Total expenses:** Sum of expense transactions in the selected period.
- **Current balance:** Total income minus total expenses.
- Values are calculated on the backend from the authenticated user's transactions.
- When no data exists, all totals display zero and charts show an informative empty state.

### Important Product Decision

Label period-filtered values clearly. If the dashboard is set to “This Month,” the balance card should say “Balance for This Month” rather than implying it is the user's lifetime balance.

### Suggested Endpoint

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/analytics/summary` | Return totals and recent activity for a date range |

## 7.5 Analytics Feature

### Goal

Transform transaction records into information the user can understand visually.

### Chart 1: Expense Breakdown by Category

- Suggested chart: Donut or pie chart
- Data: Expense total grouped by category
- Filter: Selected date range
- Tooltip: Category, formatted total, and percentage of expenses
- Empty state: “No expense data for this period”

### Chart 2: Income vs. Expenses Over Time

- Suggested chart: Bar chart
- Data: Monthly income total and monthly expense total
- Default range: Last six months
- Missing months must still appear with zero values

### Backend Responsibilities

- Use MongoDB aggregation to group and total transactions.
- Filter by authenticated owner before aggregation.
- Return chart-ready data with labels and numeric values.
- Keep calculation logic on the server so all clients receive consistent results.

### Suggested Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/analytics/category-breakdown` | Return expense totals grouped by category |
| GET | `/api/analytics/monthly-trend` | Return monthly income and expense totals |

## 7.6 Profile Feature

### Goal

Allow the user to view and update basic account settings.

### MVP Responsibilities

- View name and email
- Update display name
- Select preferred display currency, starting with PHP as the default
- Show account creation date

Email changes and password resets can be scheduled after the core MVP because they require additional security decisions.

## 8. API Standards

### Successful Responses

Use a consistent response shape containing:

- A success indicator
- The requested data
- An optional human-readable message
- Pagination metadata for list endpoints

### Error Responses

Use a consistent error shape containing:

- A success value of false
- A safe error message
- A stable error code
- Optional field-level validation errors

### Suggested HTTP Status Behavior

| Status | Use |
| --- | --- |
| 200 | Successful read, update, or logout |
| 201 | Successful resource creation |
| 400 | Invalid input or business-rule violation |
| 401 | Authentication required or invalid session |
| 403 | Authenticated but not allowed |
| 404 | Owned resource does not exist or is not accessible |
| 409 | Duplicate email or category conflict |
| 500 | Unexpected server error |

## 9. Security and Data Integrity Requirements

- Hash passwords using an established password-hashing library.
- Store authentication tokens in HTTP-only cookies.
- Configure cookie security differently for local development and production.
- Configure CORS for the exact frontend origin and allow credentials.
- Validate all request bodies, route parameters, and query parameters.
- Derive record ownership from the verified session.
- Never return password hashes.
- Keep environment secrets outside source control.
- Add a centralized error handler.
- Limit login attempts as a post-MVP security improvement.
- Use secure headers and sensible request-size limits.
- Create database indexes for transaction owner and date, and for unique normalized email.

## 10. Main Pages and User Experience

| Route | Page | Access | Main content |
| --- | --- | --- | --- |
| `/register` | Registration | Public | Name, email, password, confirmation |
| `/login` | Login | Public | Email and password |
| `/dashboard` | Dashboard | Protected | Summary cards, charts, recent transactions |
| `/transactions` | Transactions | Protected | Filters, list, pagination, add action |
| `/transactions/new` | Add transaction | Protected | Transaction form |
| `/categories` | Category settings | Protected | Income and expense category management |
| `/analytics` | Detailed analytics | Protected | Expanded charts and date controls |
| `/profile` | Profile | Protected | Account information and preferences |

### Every Data-Driven Page Must Handle

- Initial loading
- Successful data display
- No-data state
- Validation failure
- Server failure
- Unauthorized session
- Mobile layout

## 11. Development Phases

Build vertically by feature. A vertical slice includes database, backend, API testing, frontend, and acceptance testing for one usable behavior.

### Phase 0: Planning and Setup

**Deliverables**

- Confirm MVP and out-of-scope features.
- Create repository and client/server applications.
- Establish environment-variable templates.
- Connect the API to a development database.
- Add formatting, linting, and basic error handling.
- Define the common API response format.

**Skill focus:** Project setup, environment configuration, HTTP fundamentals, and Git workflow.

### Phase 1: Authentication Slice

**Deliverables**

- User model
- Registration endpoint and page
- Login endpoint and page
- Session check and logout
- Authentication middleware
- Protected dashboard placeholder
- Auth acceptance tests

**Completion test:** A user can register, log in, refresh, access a protected placeholder, and log out.

### Phase 2: Category Slice

**Deliverables**

- Category model
- Default category creation strategy
- Category list endpoint
- Category selector component
- Optional custom category CRUD

**Completion test:** An authenticated user can see suitable income and expense categories, and one user's custom categories are invisible to others.

### Phase 3: Transaction Slice

Build one operation at a time:

1. Create transaction
2. List transactions
3. Edit transaction
4. Delete transaction
5. Filter and paginate transactions

**Completion test:** A user can complete the full transaction lifecycle and cannot access another user's records.

### Phase 4: Dashboard Slice

**Deliverables**

- Server-side summary calculations
- Income, expense, and balance cards
- Recent transactions section
- Date-period filter
- Loading and empty states

**Completion test:** The displayed totals match a manually calculated test dataset.

### Phase 5: Analytics Slice

**Deliverables**

- Category breakdown aggregation
- Monthly trend aggregation
- Recharts components
- Chart tooltips, legends, responsive sizing, and empty states

**Completion test:** Chart totals reconcile with transaction totals for the same period.

### Phase 6: Profile and Quality

**Deliverables**

- Profile view and basic update
- Responsive layout review
- Accessibility pass
- Error-message review
- Unit and integration tests for critical calculations
- README with setup instructions and screenshots

### Phase 7: Deployment

**Deliverables**

- Production database
- Deployed API and client
- Correct CORS and cookie configuration
- Production environment variables
- Smoke test of registration, transaction CRUD, dashboard, and charts

## 12. Testing Strategy

### Highest-Priority Service Tests

- Total income calculation
- Total expense calculation
- Balance calculation
- Date-range filtering
- Category grouping
- Monthly grouping including zero-value months
- Category type matches transaction type
- Ownership restrictions

### API Integration Tests

- Register and login
- Reject invalid login
- Reject unauthenticated transaction request
- Create and retrieve an owned transaction
- Prevent access to another user's transaction
- Update and delete an owned transaction
- Return correct summary for known seed data

### Frontend Tests

- Form validation messages appear correctly.
- Transaction list renders returned data.
- Dashboard handles loading and empty states.
- Successful mutation invalidates or refreshes affected queries.
- Protected routes redirect unauthenticated users.

### Manual Calculation Test Dataset

Before trusting charts, create a very small dataset that you can calculate by hand. For example, use two income transactions and three expense transactions across two categories. Confirm the API totals first, then confirm the cards, and finally confirm the chart values.

## 13. Git and Project-Management Workflow

Use one branch and one focused deliverable per task.

Suggested task naming:

- `setup/project-foundation`
- `feature/auth-register`
- `feature/auth-login`
- `feature/category-list`
- `feature/transaction-create`
- `feature/transaction-history`
- `feature/dashboard-summary`
- `feature/analytics-category-chart`

### Definition of Done for Every Task

- Functional requirement is satisfied.
- Validation and expected errors are handled.
- Another user's data cannot be accessed.
- Loading, error, and empty states are considered when applicable.
- Manual or automated tests pass.
- No secrets or debug logs are committed.
- Documentation is updated when behavior changes.
- Commit message explains the completed behavior.

## 14. Recommended Learning Milestones

| Milestone | What you should be able to explain afterward |
| --- | --- |
| Authentication | How identity moves from login to protected API request |
| Transaction CRUD | How one feature passes through UI, API, service, and database |
| Validation | Why client validation improves UX but server validation protects data |
| Ownership | Why filtering by record ID alone is insecure |
| Server state | How queries, caching, mutations, and invalidation work |
| Aggregation | How raw transactions become totals and chart datasets |
| Testing | How known data proves financial calculations are correct |
| Deployment | How origins, cookies, environment variables, API, and database connect |

## 15. Common Beginner Mistakes to Avoid

- Building every model before completing one working feature
- Storing passwords without hashing
- Trusting a submitted user identifier instead of the authenticated session
- Using floating-point values directly for money
- Calculating totals only in the browser from one paginated transaction page
- Mixing controller, database, and response logic in one large function
- Placing every component and utility into a global shared folder
- Adding Redux before there is a real need for it
- Ignoring loading, empty, and error states
- Building charts before verifying the underlying calculations
- Adding advanced features before the MVP can be deployed

## 16. Future Enhancement Backlog

Complete these only after the MVP:

1. Monthly category budgets and progress indicators
2. Recurring income and expenses
3. CSV import and export
4. Receipt image upload
5. Savings goals
6. Password reset and email verification
7. Multi-currency support
8. Dark mode
9. Progressive Web App support
10. Automated deployment checks

## 17. Final MVP Acceptance Checklist

- [ ] A user can register, log in, refresh the page, and log out.
- [ ] Protected API endpoints reject unauthenticated requests.
- [ ] Each user can access only their own data.
- [ ] A user can create, list, edit, and delete transactions.
- [ ] Transactions support income and expense categories.
- [ ] Amount and category rules are validated on the server.
- [ ] The dashboard shows correct income, expenses, and balance.
- [ ] Date filters use a consistent interpretation across totals and charts.
- [ ] Expense breakdown and monthly trend charts are accurate.
- [ ] All major pages support loading, empty, error, and mobile states.
- [ ] Critical calculations and ownership rules have tests.
- [ ] The deployed client can authenticate with and call the deployed API.
- [ ] The README explains setup, features, architecture, and deployment.

## 18. Recommended First Action

Start with **Phase 0**, then complete the authentication slice from database to UI. Do not begin transaction forms until you can prove that protected routes identify the current user correctly. Every financial record will depend on that ownership foundation.

Once authentication is complete, implement one transaction creation flow end to end before building the full dashboard. This keeps the learning process small, testable, and visible.
