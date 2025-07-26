import Audit from "../models/Auditing.js";

export const getAuditLog = async (req, res) => {
  try {
    const logs = await Audit.find().populate("user","name email")
    .populate("expense","amount category")
    .sort({ timestamp: -1});

    res.json(logs);
  } catch (error) {
    res.status(500).json({message : "failed to fetch logs",error:error.message});
  }
};
