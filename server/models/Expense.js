import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        enum:["Travel","Food","Office Supplies","Other"],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

    notes:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","Approved","Rejected"],
        default:"pending"
    },
},{timestamps:true});

const Expense = mongoose.model("Expense",ExpenseSchema);

export default Expense;