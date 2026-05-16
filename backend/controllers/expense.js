const Expense = require("../models/expense");

const addExpense = async (req, res) => {
  try {
    const { groupId, amount, description, paidBy, involvedMembers } = req.body;

    // 1️⃣ Validation
    if (
      !groupId ||
      !amount ||
      !description ||
      !paidBy ||
      !Array.isArray(involvedMembers) ||
      involvedMembers.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Ensure payer is included
    if (!involvedMembers.includes(paidBy)) {
      involvedMembers.push(paidBy);
    }

    // 3️⃣ Equal split with rounding
    const totalMembers = involvedMembers.length;
    const baseShare = Math.floor((amount / totalMembers) * 100) / 100;

    let remaining = amount;

    const splits = involvedMembers.map((member, index) => {
      let share =
        index === totalMembers - 1 ? remaining : baseShare;

      remaining = Number((remaining - share).toFixed(2));

      return {
        userId: member,
        amount: share
      };
    });

    // 4️⃣ Save expense
    const expense = await Expense.create({
      groupId,
      amount,
      description,
      paidBy,
      splitType: "equal",
      splits
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense
    });

  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense };
