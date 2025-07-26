#  Expense Tracker App (Full Stack)

A full-stack web application to help remote teams track and review expenses with role-based access, admin insights, and audit logs.

##  Features

###  Authentication & Role-Based Access
- JWT-based secure login
- Roles: **Employee** and **Admin**

###  Employee
- Add new expenses (amount, category, date, notes)
- View only own expenses

###  Admin
- View all employee expenses
- Filter expenses by status
- Approve or Reject expenses
- View audit logs of key actions
- Insights:
  -  Total expenses by category (Bar Chart)
  -  Monthly expense breakdown (Line Chart)

###  Audit Logging
- Tracks actions like:
  - Expense creation
  - Status updates

---

##  Tech Stack

| Layer       | Tech                               |
|-------------|------------------------------------|
| Frontend    | React.js, Tailwind CSS, Chart.js   |
| Backend     | Node.js, Express.js                |
| Database    | MongoDB (via Mongoose)             |
| Auth        | JWT (JSON Web Token)               |
| Charts      | chart.js + react-chartjs-2         |

---

##  Folder Structure

root/
│

├── client/React Frontend + Tailwind CSS 

└── server/ Node.js + Express Backend

##  Local Setup

### 1 Clone Repo
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```


## 2 Backend Setup (/server)
```
cd server
npm install
```
 ## Create a .env file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key
```

## Run server:
```
nodemon server.js
```

### 3 Frontend Setup (/client)
```
cd client
npm install
npm  run  start
Visit http://localhost:3000
```



### Developed with ❤️ by Your Nayab Gul 
