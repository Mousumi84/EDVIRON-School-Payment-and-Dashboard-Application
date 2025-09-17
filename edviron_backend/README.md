# PROJECT SETUP
1. npm install express

2. Create a .env file in the project root:
PORT, MONGO_ATLAS, SESSION_SECRET, JWT_SECRET, SALT, PAYMENT_API_KEY, PG_KEY

3. Run the project
npm start


# PROJECT STRUCTURE


|-- index.js            
|-- ConfigModule.js
|-- Routers/      
|    |-- AuthRouter.js 
|    |-- PaymentRouter.js 
|    |-- TransactionRouter.js 
|    |-- webhookLogRouter.js 
|-- Controllers/   
|    |-- AuthController.js 
|    |-- PaymentController.js 
|    |-- TransactionController.js 
|    |-- WebhookController.js    
|-- Models/   
|    |-- AuthModel.js 
|    |-- PaymentModel.js 
|    |-- TransactionModel.js 
|    |-- WebhookModel.js     
|-- Schemas/    
|    |-- OrderSchema.js 
|    |-- OrderStatusSchema.js 
|    |-- UserSchema.js 
|    |-- WebhookLogSchema.js          
|-- Middlewares/ 
|    |-- isAuth.js 

# API DOCUMENTATION

1. Authentication (/api/auth)

POST /api/auth/signup:
Register a new user.

POST /api/auth/login:
Login user and create session.
JWT token is generated here and send to the user 

POST /api/auth/logout:
Logout the current user. Requires authentication.

2. Payments (/api/payment)

POST /api/payment/create-payment:
Create a payment request. Requires auth.

GET /api/payment/check-payment-status:
Check payment status for the last created request. Requires auth.

3. Transactions (/api/transactions)

GET /api/transactions:
Fetch all transactions with pagination, sorting.
Query params: skip, limit, sort, order

Example:
/api/transactions?skip=0&limit=10&sort=payment_time&order=desc

GET /api/transactions/school/:schoolId:
Fetch transactions by school.

GET /api/transaction-status/:custom_order_id:
Fetch status for a specific custom order.

4. Webhook (/api/webhook)

POST /api/webhook:
Process payment gateway webhook updates. Requires auth.

# AUTHENTICATION & SECURITIES

a> Uses JWT for token generation.
b> Uses express-session with MongoDB session store.
c> isAuth middleware protects private routes.
d> Used bcrypt to hash password.


