# PROJECT SETUP

1. npx create-react-app edviron_frontend

2. Install dependencies
npm install

3. Start the development server
npm start


# PROJECT STRUCTURE

src/
│             
|--Components/            #  Shared UI components
│   |-- FrontPage.js
│   |-- Dashboard.js
│   |-- CustomTable.js
│-- Pages/
│   |-- Auth/
│   │   |--Login.js
│   │   |-- Signup.js
│   |-- Dashboard/
│       |-- TransactionOverview.js
│       |-- TransactionDetailsSchool.js
│       |-- TransactionStatus.js
│── Styles/      
|   |-- Auth.css
App.css
App.js
index.css
index.js
.env


# DETAILED DOCUMENTATION

1. Authentication Pages

Login Page (/)

Users log in with email + password.

On success → JWT Token stored in localStorage.
Redirects to Dashboard/Transactions 

Signup Page (/signup)

Users can register with email, name, role, and password.
On success → Redirected to login page.

2. Dashboard Pages

Accessible only after login. Includes top navigation with:
Transaction History                    ---|
Transaction School History                |=>  Main 3 pages
Transaction Status                     ---|
Theme Switcher (Light/Dark Mode)
Logout Button

Transaction Overview (/dashboard/transactions):

  Fetches transaction data from API.
  
  Features:
  a> Sorting & filtering (status, date). 
  b> Pagination (limit,skip).
  c> Table with Collect ID, School ID, Date, Order Amount, Transaction Amount, Gateway, Status, Student Name, Custom Order ID.

Transaction Details School (/dashboard/transactions-school-details):

  Filter transactions by School ID (dropdown).

  Displays results in a paginated table.

Transaction Status (/dashboard/transactions-status)

  Shows transaction status history for entered Custom Id.

  Useful for tracking failed/success/pending payments for a particular Custom Id.

3. Shared Components

CustomTable.js

  Reusable table using Ant Design Table.
  
  Supports:
  a> Search (by Collect ID, School ID, Student Name, Gateway).
  b> Filter by Date.
  c> Filter by Status.
  d> Rows per page selector.
  e> Custom styling (even/odd row highlights).

# SCREENSHOTS

Login Page:
<img src="Screenshots\Login.png" width="500" />

Signup Page:
<img src="Screenshots\Signup.png" width="500" />

Dashboard with Navigation:
<img src="Screenshots\Dashboard_Navigation.png" width="500" />

Transaction History Table:
<img src="Screenshots\Dashboard_TransactionHistory.png" width="500" />

Transaction School History Page:
<img src="Screenshots\Dashboard_TransactionSchoolHistory.png"  width="500" />

Transaction Status Page:
<img src="Screenshots\Dashboard_TransactionStatus.png" width="500" />
