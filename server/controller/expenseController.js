import Expense from "../models/Expense.js";
import Audit from "../models/Auditing.js";


//create new Expense
export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, notes } = req.body;

    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      date,
      notes,
    });

    await expense.save();

    await Audit.create({
      user: req.user.id,
      action: "created an expense",
      expense: expense._id,
    });

    res.status(201).json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create expense", error: err.message });
  }
};


//Employee view own expense 
export const getMyExpense = async(req , res) =>{
    try {
        const expenses  = await Expense.find({user:req.user.id}).sort({date:-1});
        res.json(expenses)
    } catch (error) {
      res.status(500).json({message:"Failed to fetch expenses",error:error.message});  
    }
};


// admin view all Expenses 

export const getAllExpenses = async(req , res) =>{
    try {
        const {status} = req.query;
        const query = status?{status}:{};
        const expense = await Expense.find(query).populate("user","name email").sort({date : -1});
        res.json(expense);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch expense ",error :error.message});
    }
};


//admin update 

export  const updateExpenseStatus = async (req , res) =>{
    try {
        const {id} = req.params;
        const {status} = req.body;

        if(!["pending","Approved","Rejected"].includes(status)){
           return res.status(400).json({message :"Invalid Status Value"}); 
        }

const expense = await Expense.findByIdAndUpdate(
    id,
    {status},
    {new:true}
);

if(!expense) 
    return res.status(404).json({message:"Expense Not Found"});


await Audit.create({
    user : req.user.id,
    action:`changed Status to ${status}`,
    expense:expense._id
});

res.json(expense);

    } catch (error) {
        res.status(500).json({message:"Failed to update expense",error:error.message});
    }
};