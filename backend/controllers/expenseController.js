const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Income Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body || {};

        // Validate required fields
        if(!category || !amount || !date){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    }catch(err){
        res.status(500).json({ message: "Error adding expense", error: err.message });
    }
}

// Get All Income Sources
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    }catch(err){
        res.status(500).json({ message: "Error fetching expenses", error: err.message });
    }
}

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense source deleted successfully" });
    }catch(err){
        res.status(500).json({ message: "Error deleting expense source", error: err.message });  
    }
}

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        const data = expense.map(item => ({
            Category: item.category,
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