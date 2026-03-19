const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date } = req.body || {};

        // Validate required fields
        if(!source || !amount){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    }catch(err){
        res.status(500).json({ message: "Error adding income source", error: err.message });
    }
}

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    }catch(err){
        res.status(500).json({ message: "Error fetching income sources", error: err.message });
    }
}

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income source deleted successfully" });
    }catch(err){
        res.status(500).json({ message: "Error deleting income source", error: err.message });  
    }
}

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({ userId }).sort({ date: -1 });
        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb  = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    }catch(err){
        res.status(500).json({ message: "Error downloading income data", error: err.message });
    }
}