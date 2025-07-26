import Expense from "../models/Expense.js";

export const expenseByCategory = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          category: "$_id",
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch category status",
        error: error.message,
      });
  }
};

export const monthlyExpenses = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "id.year": 1, "id.month": 1 },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch monthly stats", error: err.message });
  }
};
