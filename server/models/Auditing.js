import mongoose from "mongoose";


const AuditSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    action:{
        type:String,
        required:true
    },

    expense:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Expense"

    },
    timeStamp:{
       type:Date,
       default:Date.now
    }
});


const Audit = mongoose.model("Audit",AuditSchema);

export default Audit;