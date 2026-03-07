import express from "express";
import dotenv from "dotenv";
import connectDB from "./connect/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import chartRoutes from "./routes/chartRoutes.js";
import expenseRoute from "./routes/expenseRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;



app.use(cors());
app.use(express.json());


//useRoutes
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/expenses", expenseRoute);


app.get("/", (req, res) => {
  res.send("connected server");
});


connectDB();
app.listen(PORT, () => {
  console.log(`server connected ${PORT}`);
});

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`server connected ${PORT}`);
// });
