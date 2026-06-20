# Post-Assessment Verification Prep Guide

This guide breaks down every file, concept, and line block in the **Go Business Referral Dashboard** codebase. It is designed to help you understand exactly how the project works, so you can confidently explain, modify, or debug the code during your technical discussion.

---

## 💡 Core Web Concepts Explained (For Beginners)

Before looking at the code, here are the key concepts you need to know:

### 1. What is React?
* **Components:** Small, reusable blocks of code that return HTML (like `Navbar`, `Login`, or `ReferralTable`).
* **State (`useState`):** The "memory" of a component. If you type in a search box, the text is stored in state. When state changes, React updates the screen.
* **Effects (`useEffect`):** Actions that run automatically, usually when the page loads (like fetching data from the API).

### 2. What is User Authentication?
* **JWT (Json Web Token):** A secure key (like a movie ticket) returned by the server when you enter correct credentials.
* **Cookies:** A storage space in the browser. We save the token in a cookie named `jwt_token` so the browser remembers you are logged in even if you refresh the page.
* **Protected Routes:** Pages (like the Dashboard) that block users from viewing them unless the `jwt_token` cookie is present. If missing, it redirects them to `/login`.

### 3. What is React Router?
* It allows navigating between different pages (like `/login` or `/referral/5`) without reloading the entire website.
* `useNavigate()` is used to change pages programmatically.
* `useParams()` is used to read dynamic values in the URL (e.g., getting `5` from `/referral/5`).

---

## 📁 File-by-File Breakdown

Here is exactly what every file in your project does, block by block:

---

### 1. `src/api/auth.js` (Authentication Helpers)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/api/auth.js)
* **Purpose:** Manages the login token cookies and login network requests.
* **Key Code Blocks:**
  * `getToken()`, `setToken()`, `removeToken()`: Shortcuts using the `js-cookie` library to read, write, and delete the `jwt_token` cookie.
  * `signIn(email, password)`: Sends a `POST` request to the sign-in URL with the credentials. It returns the raw server response.

---

### 2. `src/api/referrals.js` (Referrals Data Helpers)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/api/referrals.js)
* **Purpose:** Handles data retrieval from the Referrals API.
* **Key Code Blocks:**
  * `fetchReferrals(search, sort)`: Appends search terms (`?search=john`) and sort parameters (`&sort=asc`) to the URL, reads the token using `getToken()`, and sends a `GET` request.
  * `fetchReferralById(id)`: Sends a `GET` request to retrieve a single referral record using `?id=value`.

---

### 3. `src/components/ProtectedRoute.jsx` (Route Guard)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/components/ProtectedRoute.jsx)
* **Purpose:** Secures dashboard routes.
* **Key Code Blocks:**
  * Checks if `getToken()` returns a token.
  * If yes, it renders the page (`children`).
  * If no, it redirects to `/login` using the `<Navigate>` tag.

---

### 4. `src/components/Navbar.jsx` (Header & Footer)
[Link to File:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/components/Navbar.jsx]
* **Purpose:** Displays the navigation bar at the top of pages and the site footer at the bottom.
* **Key Code Blocks:**
  * `logout()`: Clears the `jwt_token` cookie and redirects the user to `/login`.
  * `Navbar()`: Displays the "Go Business" brand link, a "Home" link, and a "Log out" button.
  * `Footer()`: Displays the copyright and links to "About" and "Privacy" pages.

---

### 5. `src/components/Overview.jsx` (Metric Grids)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/components/Overview.jsx)
* **Purpose:** Displays the statistics and summary details on the Dashboard.
* **Key Code Blocks:**
  * `Overview({ metrics })`: Receives an array of metrics from the API and loops through them (`metrics.map`) to render boxes for "Total Referrals", "Active Referrals", and "Total Earnings".
  * `ServiceSummary({ serviceSummary })`: Displays details for the current active service summary.

---

### 6. `src/components/ReferralTable.jsx` (Data Grid)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/components/ReferralTable.jsx)
* **Purpose:** Renders the referrals list in a grid table.
* **Key Code Blocks:**
  * `formatDate()`: Split-based formatter. Converts API date strings like `"2025-05-10"` into `"2025/05/10"` safely without timezone distortions.
  * `formatMoney()`: Formats numbers as USD currency with commas and no decimal places (e.g. `1200` becomes `$1,200`).
  * `ReferralTable({ visibleReferrals })`: Renders the table headers and rows. If no items match, it prints `"No matching entries"`.
  * `ReferralRow({ referral })`: Displays cell values. When clicked, it calls `navigate('/referral/id')` to open the details view.

---

### 7. `src/pages/Login.jsx` (Login Screen)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/pages/Login.jsx)
* **Purpose:** Displays the login form and processes authentication.
* **Key Code Blocks:**
  * `email` and `password` states: Listen to form input text changes.
  * `onSubmit()`: Runs when the user clicks "Sign in". It calls `signIn(email, password)`. If successful, it saves the cookie and navigates to the dashboard `/`. If it fails, it sets the `error` state to display the error text.
  * Form details: Inputs are not flagged with `required` so empty clicks are sent directly to the server as requested.

---

### 8. `src/pages/Dashboard.jsx` (Dashboard Hub)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/pages/Dashboard.jsx)
* **Purpose:** The main dashboard screen. Fetches referrals and manages searches, sorting, and page switches.
* **Key Code Blocks:**
  * States: `search` (text input), `sort` (`desc`/`asc`), `page` (current page number), `dashboard` (holds metrics, referrals, and summaries).
  * `loadReferrals()`: Fetches records automatically whenever `search` or `sort` states change. It saves the results to `dashboard` state.
  * `visibleReferrals`: Slices the referrals array to show exactly 10 rows per page:
    `dashboard.referrals.slice(startIndex, startIndex + 10)`
  * `CopyField`: Copy button helper. Uses `navigator.clipboard.writeText()` to copy links and codes.
  * Pagination Number Buttons: Renders page numbers (`1`, `2`, etc.) between the "Previous" and "Next" controls.

---

### 9. `src/pages/ReferralDetails.jsx` (Detail Inspector)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/pages/ReferralDetails.jsx)
* **Purpose:** Displays detailed metadata for a single referral.
* **Key Code Blocks:**
  * `useParams()`: Slices the referral ID from the URL path `/referral/:id`.
  * `loadReferral()`: Runs on load, fetches the item matching the ID using `fetchReferralById(id)`. If the ID doesn't match or the API errors, it displays `"Referral not found"`.

---

### 10. `src/pages/NotFound.jsx` (Fallback 404)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/pages/NotFound.jsx)
* **Purpose:** Shows when typing an invalid URL route. It displays `"404 - Page Not Found"` and a button linking back to the dashboard.

---

### 11. `src/App.js` (Routing Map)
[Link to File](file:///c:/Users/ashith/OneDrive/Documents/Nxtwave_Project/go-business-referral/src/App.js)
* **Purpose:** Sets up the page URLs and routes.
* **Key Code Blocks:**
  * Defines routes (`/login`, `/`, `/referral/:id`, `*`).
  * Wraps protected pages in `<ProtectedRoute>` to block unauthorized visitors.
  * Wraps everything in a `<BrowserRouter>`.

---

## 💬 Interview Q&A (Common Technical Questions)

Be prepared to answer these questions during your verification interview:

### Q1: How does user authentication work in your application?
> **Answer:** "When the user submits the login form, we send a `POST` request with the email and password to `/api/auth/signin`. If correct, the API returns a JWT token. We store this token in a browser cookie named `jwt_token` using the `js-cookie` library. All subsequent data requests read this cookie and attach it as a `Bearer` token in the `Authorization` request header."

### Q2: How did you protect pages from unauthenticated users?
> **Answer:** "I built a `ProtectedRoute` component that wraps the Dashboard and Referral Details routes in `App.js`. This component checks for the `jwt_token` cookie. If it exists, it lets the user view the page. If it is missing, it automatically redirects the user to `/login`."

### Q3: How is searching and sorting implemented?
> **Answer:** "Searching and sorting are handled server-side. In `Dashboard.jsx`, we listen to changes in the search box or the sorting dropdown. Whenever they change, we make a new API request appending query parameters, like `?search=john&sort=asc`. The API returns the filtered, sorted list, and we update our table state."

### Q4: How is pagination implemented?
> **Answer:** "Pagination is handled client-side. The API returns the full list of filtered/sorted referrals. In the code, we slice the array based on the current page number: we multiply the page number by the row limit (10) to determine the slice indices. We display 'Previous' and 'Next' buttons, as well as numbered page buttons, to navigate through the pages."

### Q5: Why did you split the project into separate folders?
> **Answer:** "The original code was entirely in a single `App.js` file, which is hard to scale and maintain. By splitting it into modular directories—`api` for network calls, `components` for shared elements, and `pages` for complete views—we follow standard React clean architecture, making the code readable, reusable, and easy to debug."

### Q6: How does the date formatting handle timezone differences?
> **Answer:** "Using `new Date()` can shift dates by a day depending on the client's timezone (e.g., displaying `2025-05-10` as `2025/05/09` in western zones). To prevent this, we wrote a timezone-independent date formatter that parses the date string directly using string splitting (`.split('-')`), ensuring the date always displays exactly as sent by the API."
