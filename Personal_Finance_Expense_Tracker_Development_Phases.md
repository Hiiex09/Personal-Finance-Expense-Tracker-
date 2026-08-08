# Personal Finance & Expense Tracker

## Phased Development Plan and Manual Verification Guide

**Project level:** Beginner full-stack developer  
**Architecture:** Feature-sliced MERN application with TypeScript  
**Companion document:** Personal Finance & Expense Tracker Functional Specification  
**Document version:** 1.0  

---

## 1. Purpose of This Document

This document turns the project specification into an ordered development plan. Complete one phase at a time. A phase is complete only when its deliverables work and its manual checks pass.

The goal is to learn the complete full-stack flow for every feature:

1. Define the user requirement.
2. Define the data and business rules.
3. Build and manually test the backend behavior.
4. Connect the frontend to the API.
5. Test success, failure, empty, loading, and permission states.
6. Record issues and correct them before starting the next phase.

This is a guidance document. It intentionally provides no implementation code.

## 2. Recommended Development Rules

### 2.1 Phase Gate Rule

Do not start the next phase while a required exit criterion remains incomplete. If a defect affects authentication, data ownership, calculations, or data loss, treat it as a blocker.

### 2.2 Vertical Slice Rule

Complete a feature from database to interface instead of building the entire backend first and the entire frontend later. The usual order inside a feature is:

1. Data model and validation
2. Route and authentication middleware
3. Controller and service behavior
4. Manual API testing
5. Frontend API module and query/mutation hook
6. Page, form, and components
7. End-to-end manual testing

### 2.3 Definition of Done

A task is done when:

- The expected behavior works.
- Invalid input is rejected with a helpful message.
- A user cannot access another user's records.
- Loading, empty, error, and success states are handled.
- Relevant manual checks pass.
- No secret or environment file is committed.
- The change is committed with a clear Git message.

### 2.4 Manual Test Record

For every test, record:

| Item | What to record |
| --- | --- |
| Test ID | A stable identifier such as `AUTH-M01` |
| Date | Date the check was performed |
| Environment | Local client, local API, test database, or deployed application |
| Steps | What the tester did |
| Expected result | Correct application behavior |
| Actual result | What happened |
| Status | Pass, Fail, or Blocked |
| Evidence | Screenshot, API response, console output, or database record |
| Issue reference | Defect number when the test fails |

---

## 3. Development Roadmap

| Phase | Feature or focus | Main result |
| --- | --- | --- |
| 0 | Planning and project controls | Scope, workflow, and acceptance rules are clear |
| 1 | Environment and foundation | Client, API, and database run locally |
| 2 | Authentication and users | Users can securely register, sign in, and sign out |
| 3 | Categories | Users can manage valid income and expense categories |
| 4 | Transactions | Users can complete transaction CRUD safely |
| 5 | Dashboard calculations | Totals and recent activity are accurate |
| 6 | Filtering and transaction history | Users can find and navigate their records |
| 7 | Analytics and charts | Aggregated financial data is visualized accurately |
| 8 | Profile and account settings | Users can maintain basic account preferences |
| 9 | Quality, security, and responsiveness | The MVP is reliable and portfolio-ready |
| 10 | Deployment and release | The application works in production |
| 11 | Portfolio handoff and review | The project is documented and demonstrated |

---

## 4. Phase 0 — Planning and Project Controls

### Goal

Establish the MVP boundary, user journeys, data ownership, and working method before development begins.

### Logic to Follow

- Build only the agreed MVP features first.
- Every transaction and custom category belongs to one authenticated user.
- Financial calculations use validated transaction data, not values supplied by the dashboard interface.
- Keep future features in a backlog rather than adding them during the MVP.

### Tasks

- Review the functional specification.
- Write the main user stories for authentication, categories, transactions, dashboard, analytics, and profile.
- Define acceptance criteria for every user story.
- Create a project board with Backlog, Ready, In Progress, Review/Test, and Done columns.
- Create an issue format for bugs and an issue format for features.
- Decide naming conventions for branches and commits.
- Sketch the key screens: login, registration, dashboard, transactions, analytics, and profile.
- Confirm PHP as the initial display currency unless the scope changes.

### Deliverables

- Approved MVP feature list
- Prioritized backlog
- Screen sketches or wireframes
- Definition of Done
- Manual test record template

### Manual Check

- [ ] Every MVP feature has at least one user story and acceptance criterion.
- [ ] Out-of-scope features are recorded separately.
- [ ] Every record type has a stated owner.
- [ ] The main navigation and user journey are understandable without code.
- [ ] The team can explain what “done” means.

### Exit Criteria

The MVP scope and expected behavior are clear enough to begin setup without making major product assumptions.

---

## 5. Phase 1 — Environment, Tech Stack, and Project Foundation

### Goal

Create a stable local development environment where the React client, Express API, and MongoDB database can communicate.

### Tools and Stack

| Area | Recommended tool |
| --- | --- |
| Runtime | Current Node.js LTS |
| Language | TypeScript |
| Package manager | npm |
| Frontend | React with Vite |
| Backend | Express |
| Database | MongoDB Atlas development database or local MongoDB |
| ODM | Mongoose |
| Styling | Tailwind CSS |
| API client/state | TanStack Query |
| Forms and validation | React Hook Form and Zod |
| Charts | Recharts, installed when analytics begins |
| API manual testing | Bruno or Postman |
| Source control | Git and GitHub |
| Editor | VS Code with ESLint and Prettier support |

### Logic to Follow

- Keep `client` and `server` as separate applications inside one repository.
- Use feature folders from the start, but create only folders currently needed.
- Store configuration in environment variables.
- Commit an example environment file containing variable names but no secrets.
- Use one consistent API response and error structure.
- Make the API expose a health endpoint before building business features.

### Tasks

- Install and verify Node.js, npm, Git, and VS Code.
- Create the repository and root project documentation.
- Initialize the React/TypeScript client.
- Initialize the Express/TypeScript server.
- Add linting and formatting rules.
- Establish the feature-sliced folder structure.
- Configure environment variables for API URL, server port, database URI, JWT settings, and client origin.
- Connect Mongoose to the development database.
- Add API health-check behavior.
- Configure Cross-Origin Resource Sharing and cookie support for local development.
- Add global not-found and error-handling behavior.
- Add development scripts that run the client and API predictably.

### Deliverables

- Running client application
- Running API with health response
- Successful development database connection
- Environment example files
- Initial folder structure
- Linting and formatting configuration
- Initial Git commit

### Manual Check

- [ ] A fresh terminal can install all dependencies without errors.
- [ ] The client opens in the browser.
- [ ] The API health endpoint returns a successful response.
- [ ] The server reports a successful MongoDB connection.
- [ ] The client can request the health endpoint.
- [ ] An unknown API route returns the standard not-found response.
- [ ] A forced server error uses the standard error response and does not expose a stack trace to the client.
- [ ] Stopping the API produces a clear frontend error rather than a broken screen.
- [ ] No real secret appears in Git-tracked files.
- [ ] Lint and type-check commands pass.

### Exit Criteria

The three main layers—browser, API, and database—run reliably, and another developer could start the project by following the setup instructions.

---

## 6. Phase 2 — Authentication and User Slice

### Goal

Allow a person to register, log in, remain authenticated, access protected pages, and log out securely.

### Feature Ownership

**Server slice:** User model, auth validation, auth service, auth controller, auth routes, authentication middleware, and session-cookie behavior.  
**Client slice:** Registration page, login page, auth API module, auth context/session query, protected-route behavior, and logout action.

### Logic to Follow

- Normalize email addresses before uniqueness checks.
- Never store or return a plain-text password.
- Store the signed token in an HTTP-only cookie.
- Return only safe user fields to the client.
- Protected routes must verify the server session; a frontend redirect alone is not security.
- Use generic login failure wording so the application does not reveal whether an email exists.

### Tasks

- Define the User schema and validation rules.
- Implement register, login, current-user/session, and logout behaviors.
- Add password hashing and password comparison.
- Add cookie creation and clearing rules.
- Add authentication middleware.
- Build registration and login forms.
- Add form validation and server-error display.
- Add initial session checking when the application loads.
- Add protected and guest-only navigation behavior.

### Manual Check

- [ ] `AUTH-M01`: Register with valid details; the account is created and the password is hashed in the database.
- [ ] `AUTH-M02`: Register with an existing email in different letter casing; the request is rejected.
- [ ] `AUTH-M03`: Register with missing or weak values; field-level validation appears.
- [ ] `AUTH-M04`: Log in with correct credentials; the user reaches the dashboard.
- [ ] `AUTH-M05`: Log in with incorrect credentials; a safe error appears.
- [ ] `AUTH-M06`: Refresh a protected page; the session remains valid.
- [ ] `AUTH-M07`: Open a protected URL while logged out; access is denied and the user is redirected appropriately.
- [ ] `AUTH-M08`: Log out; the session cookie is cleared and protected API calls fail.
- [ ] `AUTH-M09`: Inspect the client-accessible user object; no password hash is present.
- [ ] `AUTH-M10`: Submit forms repeatedly; duplicate submissions are prevented while loading.

### Exit Criteria

All authentication manual checks pass, and protected API endpoints can identify the current user without accepting a user ID from the browser as proof of ownership.

---

## 7. Phase 3 — Category Slice

### Goal

Provide valid income and expense categories for transaction classification.

### Feature Ownership

**Server slice:** Category model, validation, service, controller, routes, default-category strategy, and ownership rules.  
**Client slice:** Category API module, queries and mutations, category list, create/edit form, and deletion confirmation.

### Logic to Follow

- Every category has exactly one type: income or expense.
- Custom category names must be unique for the same user and type.
- A user can read and modify only their own custom categories.
- A category referenced by transactions must not be silently deleted.
- The selected transaction type controls which categories are available.

### Tasks

- Define category fields and indexes.
- Decide whether defaults are global records or copied to each new user.
- Implement list, create, update, and delete behaviors.
- Add ownership filtering to every database operation.
- Define the delete rule for categories already in use.
- Build the category management interface.
- Connect category selections to type changes in the transaction form design.

### Manual Check

- [ ] `CAT-M01`: A new user can see the correct default income and expense categories.
- [ ] `CAT-M02`: Create a valid custom category; it appears under the correct type.
- [ ] `CAT-M03`: Create the same name and type twice; duplication is rejected.
- [ ] `CAT-M04`: Use the same name once for income and once for expense; behavior matches the specification.
- [ ] `CAT-M05`: Edit a category; dependent screens display the new name.
- [ ] `CAT-M06`: Attempt to delete an in-use category; the defined safe behavior occurs.
- [ ] `CAT-M07`: Use another account to request the category by identifier; access is denied or the record is not found.
- [ ] `CAT-M08`: Invalid colors, names, or types are rejected.
- [ ] `CAT-M09`: Empty, loading, error, and successful list states are understandable.

### Exit Criteria

Category management works, ownership is enforced by the API, and the category type rules are ready for transaction entry.

---

## 8. Phase 4 — Transaction CRUD Slice

### Goal

Allow authenticated users to record, view, update, and delete their financial transactions.

### Feature Ownership

**Server slice:** Transaction model, validation, service, controller, routes, ownership rules, query rules, and category compatibility checks.  
**Client slice:** Transaction API module, queries/mutations, list, form, edit flow, delete confirmation, and feedback states.

### Logic to Follow

- Store amounts as positive numeric values; use the transaction type to determine financial effect.
- Reject zero, negative, nonnumeric, or unreasonably precise amounts.
- Confirm that the chosen category exists, is accessible to the user, and matches the transaction type.
- Determine ownership from the authenticated session.
- Dates must be stored consistently and presented in the user's expected timezone.
- Editing or deleting must target a record owned by the current user.

### Tasks

- Define transaction fields, indexes, and validation.
- Implement create, list, detail, update, and delete operations.
- Add ownership to every query.
- Add category/type compatibility validation.
- Build a reusable transaction form for create and edit.
- Build transaction cards or table rows.
- Add deletion confirmation.
- Refresh or invalidate affected transaction, dashboard, and analytics data after mutations.

### Manual Check

- [ ] `TXN-M01`: Create a valid income transaction; all fields persist correctly.
- [ ] `TXN-M02`: Create a valid expense transaction; all fields persist correctly.
- [ ] `TXN-M03`: Submit zero, negative, text, blank, and excess-decimal amounts; each is rejected correctly.
- [ ] `TXN-M04`: Select an expense category for income or vice versa; submission is rejected.
- [ ] `TXN-M05`: Edit amount, date, type, category, and description; the saved record reflects the changes.
- [ ] `TXN-M06`: Delete a transaction; it disappears and cannot be fetched again.
- [ ] `TXN-M07`: Cancel deletion; no data changes.
- [ ] `TXN-M08`: User A attempts to read, edit, or delete User B's transaction; every attempt fails safely.
- [ ] `TXN-M09`: Double-click save; only one transaction is created.
- [ ] `TXN-M10`: Test dates around midnight and month boundaries; the displayed date remains correct.
- [ ] `TXN-M11`: Test a long description and unsupported values; validation and layout remain usable.
- [ ] `TXN-M12`: Loading, empty, error, and successful states appear correctly.

### Exit Criteria

Transaction CRUD is reliable from interface to database, invalid combinations are rejected, and cross-user access is impossible through tested API paths.

---

## 9. Phase 5 — Dashboard and Financial Calculations

### Goal

Show accurate total income, total expenses, current balance, and recent transactions.

### Calculation Rules

- **Total income** = sum of income transaction amounts in the selected scope.
- **Total expenses** = sum of expense transaction amounts in the selected scope.
- **Current balance** = total income minus total expenses.
- The server calculates totals from records owned by the authenticated user.
- The dashboard and transaction list must use the same date-scope definition.
- Empty results return zero values, not missing or invalid numbers.

### Tasks

- Define the default dashboard period and timezone boundaries.
- Create a dashboard summary service and endpoint.
- Return totals and a limited recent-transactions collection.
- Build summary cards.
- Build the recent activity section.
- Format values as PHP currency for display.
- Refresh dashboard data after transaction changes.

### Manual Check

- [ ] `DASH-M01`: With no transactions, all totals display as ₱0.00 and the empty state appears.
- [ ] `DASH-M02`: Add income of ₱10,000 and expenses of ₱2,500 and ₱500; totals show ₱10,000, ₱3,000, and ₱7,000.
- [ ] `DASH-M03`: Add expenses greater than income; the negative balance is displayed clearly.
- [ ] `DASH-M04`: Edit an amount; all affected totals update.
- [ ] `DASH-M05`: Delete a transaction; all affected totals update.
- [ ] `DASH-M06`: Change an income transaction to an expense; both totals and balance update correctly.
- [ ] `DASH-M07`: Transactions outside the selected period are excluded.
- [ ] `DASH-M08`: Month-boundary transactions follow the agreed timezone rule.
- [ ] `DASH-M09`: A second user's data never affects the current user's totals.
- [ ] `DASH-M10`: Recent transactions use the correct order and maximum count.

### Exit Criteria

All totals match independently calculated test data, refresh after mutations, and remain isolated per user.

---

## 10. Phase 6 — Transaction History, Filters, Sorting, and Pagination

### Goal

Help users find transactions efficiently without loading an unlimited dataset.

### Logic to Follow

- Filters are applied by the API for the authenticated user's records.
- Supported filters include date range, transaction type, and category.
- The API owns pagination and stable sorting.
- Resetting filters returns to the agreed default state.
- Invalid filter combinations receive validation errors.

### Tasks

- Define query parameters and default sorting.
- Add server validation for filters, page, and limit.
- Add database indexes that support common list queries.
- Add filter controls and active-filter indicators.
- Synchronize useful filter state with the URL when appropriate.
- Add pagination controls and result information.
- Preserve or reset page position predictably when filters change.

### Manual Check

- [ ] `HIST-M01`: Filter by income and then expense; only matching records appear.
- [ ] `HIST-M02`: Filter by category; only the selected category appears.
- [ ] `HIST-M03`: Filter by date range; both boundary dates follow the documented inclusive/exclusive rule.
- [ ] `HIST-M04`: Combine type, category, and date filters; the intersection is correct.
- [ ] `HIST-M05`: Reset filters; the default history returns.
- [ ] `HIST-M06`: Navigate between pages; no duplicate or missing records appear.
- [ ] `HIST-M07`: Change a filter while on a later page; page behavior remains valid.
- [ ] `HIST-M08`: Refresh or revisit a filtered URL; supported filter state is restored.
- [ ] `HIST-M09`: Invalid dates, page numbers, limits, and category IDs are rejected safely.
- [ ] `HIST-M10`: Records with equal dates retain a stable order.

### Exit Criteria

Users can navigate and filter a realistic transaction dataset, and the results remain correct, stable, and user-isolated.

---

## 11. Phase 7 — Analytics and Chart Visualization

### Goal

Transform transaction data into understandable category and monthly trends without duplicating stored financial records.

### Logic to Follow

- Charts consume aggregated API results.
- Expense-by-category includes expense transactions only.
- Monthly comparison groups income and expenses into consistent calendar periods.
- Chart totals must reconcile with the summary for the same filters.
- Tooltips, legends, labels, and fallback text must make data understandable.

### Tasks

- Define analytics endpoint inputs and output shapes.
- Implement category aggregation.
- Implement monthly income-versus-expense aggregation.
- Add date-period selection.
- Build the expense-category chart.
- Build the monthly comparison chart.
- Add accessible text summaries or tables where useful.
- Handle empty, one-value, large-value, loading, and error states.

### Manual Check

- [ ] `ANA-M01`: Seed known category values; every chart segment and total matches manual arithmetic.
- [ ] `ANA-M02`: Confirm income never appears in the expense-category chart.
- [ ] `ANA-M03`: Confirm monthly income and expense values match transactions in each month.
- [ ] `ANA-M04`: Change the date period; all charts update consistently.
- [ ] `ANA-M05`: Compare analytics totals with dashboard totals using identical scope; they reconcile.
- [ ] `ANA-M06`: With no matching data, an informative empty state replaces a misleading chart.
- [ ] `ANA-M07`: Long category names and many categories remain readable.
- [ ] `ANA-M08`: Hover or keyboard interaction reveals useful values where supported.
- [ ] `ANA-M09`: User A's charts never include User B's data.
- [ ] `ANA-M10`: Charts resize correctly on desktop, tablet, and mobile widths.

### Exit Criteria

Charts accurately represent server-calculated data, reconcile with known totals, and remain understandable across screen sizes and empty states.

---

## 12. Phase 8 — Profile and Account Preferences

### Goal

Allow users to maintain basic identity and display preferences without weakening account security.

### Logic to Follow

- Email uniqueness and normalization rules remain consistent with registration.
- Sensitive changes require appropriate verification.
- Currency preference changes display formatting; they do not silently convert historical amounts.
- The API returns the updated safe user object after a change.

### Tasks

- Build profile retrieval and update behavior.
- Allow supported name and preference changes.
- Decide whether email and password changes are included in the MVP or deferred.
- Build the profile form and feedback states.
- Make display currency available to relevant formatting utilities.

### Manual Check

- [ ] `PRO-M01`: Update the name; navigation and profile display the new value.
- [ ] `PRO-M02`: Submit invalid or duplicate email data if email editing is supported; it is rejected.
- [ ] `PRO-M03`: Change currency display preference; supported values render correctly without changing stored transaction amounts.
- [ ] `PRO-M04`: Refresh after saving; changes persist.
- [ ] `PRO-M05`: Manipulate a request to target another user; access is denied.
- [ ] `PRO-M06`: No password hash or internal security field appears in the response.

### Exit Criteria

Supported profile updates persist safely and cannot be used to read or change another user's account.

---

## 13. Phase 9 — Quality, Security, Accessibility, and Responsive Design

### Goal

Harden the complete MVP and make it reliable enough for portfolio review.

### Logic to Follow

- Security rules must be enforced by the API.
- Test business-critical services and endpoint behavior, not only visual components.
- A successful path is insufficient; failure and boundary behavior must also work.
- Accessibility and mobile usability are release requirements.

### Tasks

- Review authentication, authorization, ownership, cookie, CORS, and environment configuration.
- Confirm validation exists on both frontend and backend.
- Add request-size and basic abuse protections appropriate to the project.
- Add tests for calculations, authentication, transaction validation, and ownership.
- Add API integration tests for critical endpoints.
- Add component tests for important forms and states.
- Review keyboard navigation, labels, focus, contrast, and chart alternatives.
- Test common mobile, tablet, laptop, and desktop widths.
- Remove debugging output and resolve warnings.
- Perform regression testing across all earlier manual checklists.

### Manual Check

- [ ] Direct protected API requests without a valid session fail.
- [ ] Modified record IDs cannot bypass ownership checks.
- [ ] Invalid request bodies do not crash the API.
- [ ] Cookies use appropriate development and production settings.
- [ ] Error messages do not reveal secrets, hashes, database details, or stack traces.
- [ ] Forms are usable with a keyboard and show associated labels and errors.
- [ ] Focus returns to a sensible place after dialogs close.
- [ ] Main pages work at approximately 320px, 768px, 1024px, and large desktop widths.
- [ ] Automated tests, type checking, and linting pass.
- [ ] Browser and server consoles contain no unexplained errors.
- [ ] Full regression checks for Phases 2–8 pass.

### Exit Criteria

There are no open critical or high-severity defects, critical automated checks pass, and the application is usable by keyboard and across target screen sizes.

---

## 14. Phase 10 — Deployment and Production Release

### Goal

Deploy the client, API, and database configuration and verify that production behavior matches local behavior.

### Recommended Services

- Client: Vercel
- API: Render
- Database: MongoDB Atlas
- Source: GitHub

### Logic to Follow

- Production secrets belong in hosting environment settings.
- Production client origin, API URL, cookie security, and CORS must agree.
- Use a dedicated database user with only the permissions the application requires.
- Run release checks against the deployed application, not only local machines.

### Tasks

- Push the reviewed project to GitHub.
- Create production builds locally and resolve build errors.
- Configure the production database and network access safely.
- Deploy the API and set environment variables.
- Deploy the client and set the API base URL.
- Configure production CORS and cookies.
- Add or verify the API health endpoint.
- Run smoke and regression checks.
- Document the deployed URLs and release version.

### Manual Check

- [ ] The production client loads directly and after page refresh.
- [ ] Register, login, current-session, and logout work in production.
- [ ] Protected pages and endpoints remain protected.
- [ ] Category and transaction CRUD work against the production database.
- [ ] Dashboard totals and charts update after changes.
- [ ] Cross-origin cookie behavior works without browser warnings.
- [ ] Unknown frontend routes and API routes behave correctly.
- [ ] No secret is visible in the repository or browser bundle.
- [ ] Mobile layout works on an actual phone or device emulation.
- [ ] A production error produces safe user feedback and useful server-side diagnostics.

### Exit Criteria

The deployed MVP passes its production smoke tests and all critical user journeys work through the public application.

---

## 15. Phase 11 — Portfolio Documentation and Project Review

### Goal

Present the completed project as evidence of full-stack development ability and identify the next learning targets.

### Tasks

- Write a clear README with purpose, features, architecture, stack, setup, environment-variable names, scripts, screenshots, and deployed link.
- Add an architecture explanation showing interface-to-database flow.
- Document important business rules and security decisions.
- Create realistic demo data that contains no personal financial information.
- Prepare a short demonstration script.
- Record known limitations and future enhancements.
- Review which tasks were difficult, which defects repeated, and which concepts require more study.

### Suggested Demonstration Flow

1. Register or log in.
2. Create custom categories.
3. Add income and expenses.
4. Edit and delete a transaction.
5. Review updated totals.
6. Filter transaction history.
7. Explain the analytics charts.
8. Show responsive behavior.
9. Briefly explain ownership and password security.

### Manual Check

- [ ] A new developer can run the project from the README.
- [ ] All screenshots reflect the final application.
- [ ] The deployed link works.
- [ ] Demo accounts contain no real credentials or sensitive financial data.
- [ ] The developer can explain one feature across frontend, API, service, and database layers.
- [ ] Known limitations are stated honestly.
- [ ] The repository history contains understandable commits.

### Exit Criteria

The project can be demonstrated confidently, installed by another developer, and discussed as a complete full-stack portfolio project.

---

## 16. Recommended Weekly Execution Pattern

Use this as a flexible cadence rather than a deadline.

| Work period | Focus |
| --- | --- |
| Day 1 | Review the phase goal, refine acceptance criteria, and design data/API behavior |
| Day 2 | Implement and manually test the model, validation, service, and endpoint |
| Day 3 | Complete remaining backend behavior and negative API tests |
| Day 4 | Build frontend API access, state handling, and core interface |
| Day 5 | Complete interface states and end-to-end manual checks |
| Day 6 | Fix defects, add focused automated tests, and refactor responsibly |
| Day 7 | Review learning, update documentation, commit cleanly, and approve the phase gate |

If a phase needs more than one week, repeat the pattern. Do not reduce testing merely to meet the schedule.

## 17. Project Manager Progress Report

Update this at the end of every working session.

| Field | Entry |
| --- | --- |
| Current phase | |
| Current feature/task | |
| Completed today | |
| Manual tests passed | |
| Defects found | |
| Blockers | |
| Decision required | |
| Next task | |
| Target phase exit date | |

### Phase Status Summary

| Phase | Status | Completion | Open blockers | Exit approved |
| --- | --- | ---: | ---: | --- |
| 0 — Planning | Not started | 0% | 0 | No |
| 1 — Foundation | Not started | 0% | 0 | No |
| 2 — Authentication | Not started | 0% | 0 | No |
| 3 — Categories | Not started | 0% | 0 | No |
| 4 — Transactions | Not started | 0% | 0 | No |
| 5 — Dashboard | Not started | 0% | 0 | No |
| 6 — History and filters | Not started | 0% | 0 | No |
| 7 — Analytics | Not started | 0% | 0 | No |
| 8 — Profile | Not started | 0% | 0 | No |
| 9 — Quality and security | Not started | 0% | 0 | No |
| 10 — Deployment | Not started | 0% | 0 | No |
| 11 — Portfolio handoff | Not started | 0% | 0 | No |

## 18. Final MVP Release Checklist

- [ ] Registration, login, session restoration, and logout work.
- [ ] Users cannot access one another's records.
- [ ] Category management follows type and deletion rules.
- [ ] Transaction CRUD handles valid and invalid input.
- [ ] Dashboard totals reconcile with transaction records.
- [ ] Filters and pagination return correct results.
- [ ] Analytics reconcile with the dashboard for the same period.
- [ ] Profile preferences persist correctly.
- [ ] Loading, empty, error, and success states are present.
- [ ] The interface is responsive and keyboard-usable.
- [ ] Critical automated and manual checks pass.
- [ ] Production configuration exposes no secrets.
- [ ] The deployed client, API, and database communicate successfully.
- [ ] The README and portfolio demonstration are complete.

## 19. Recommended Starting Action

Begin with Phase 0 and mark its checklist honestly. Then complete Phase 1 and verify the browser-to-API-to-database connection. Do not begin authentication until the Phase 1 exit criteria pass.
