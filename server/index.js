import express from "express";
import dotenv from "dotenv";
import connectDB from "./connect/connectDB.js";
import authRoutes from "../server/routes/anthRoutes.js";
import logRoutes from "../server/routes/logRoutes.js";
import chartRoutes from "../server/routes/chartRoutes.js";
import expenseRoute from "../server/routes/expenseRoutes.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

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

app.listen(PORT, () => {
  connectDB();
  console.log(`server connected ${PORT}`);
});
