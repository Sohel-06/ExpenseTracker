const transactionsSchema = require("../models/transactions");

exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, description, date } = req.body;
    const income = transactionsSchema({
      title,
      amount,
      category,
      type,
      description,
      date,
    });
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All feilds are required" });
    }
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount should be positive number" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    const filters = req.query.filters || {};
    const transactions = await transactionsSchema
      .find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      const transactionsWithDateOnly = transactions.map(transaction => {
        return {
          ...transaction._doc,
          date: transaction.date.toISOString().slice(0, 10)
        };
      });
  
      res.status(200).json(transactionsWithDateOnly);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json("Invalid id");
    }
    await transactionsSchema.findByIdAndDelete(req.query.id);
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getInfo=async(req,res)=>{
  try {
    const result = await transactionsSchema.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
            $lt: new Date(new Date().getFullYear() + 1, 0, 1) // Start of the next year
          },
          type: req.query.type // Filter for transactions of type "income"
        }
      },
      {
        $group: {
          _id: { $month: '$date' }, // Grouping by month
          totalIncome: { $sum: '$amount' } // Summing the income (amount)
        }
      },
      {
        $sort: { '_id': 1 } // Sorting by month
      },
      
    ]);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const finalResult = months.map(month => {
      const match = result.find(item => item._id == month);
      return { month:match ?match._id:month, totalIncome:match ? match.totalIncome:0 }
    });
    res.status(200).json(finalResult);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.getAggregateSum=async(req,res)=>{
  try {
    const result = await transactionsSchema.aggregate([
      {
        $group: {
          _id: "$type", // Group by type (salary or expense)
          totalAmount: { $sum: "$amount" }, // Sum the amount
          count: { $sum: 1 } // Count the number of documents
        }
      },
      {
        $addFields: {
          typeName: "$_id" // Add typeName field to hold the type name
        }
      },
      {
        $project: {
          _id: 0,
          typeName: 1, // Include the typeName field
          totalAmount: 1,
          count: 1
        }
      }
      
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}