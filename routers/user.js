const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { Op } = require("sequelize");

const User = require("../models").user;
const MyExpenses = require("../models").my_expenses;
const Category = require("../models").category;
const Goal = require("../models").goal;
const { DATEONLY } = require("sequelize");

const router = new Router();

//Get user details
router.get("/", async (req, res) => {
  try {
    const user = await User.findAll({ include: [MyExpenses] });
    console.log("User info: ", user);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

//Get expense for current month
router.get("/my_expenses/:id", async (req, res) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const firstOfTheMonth = `${currentYear}/${currentMonth}/01`;
  const endOfTheMonth = `${currentYear}/${currentMonth}/31`;

  try {
    const id = parseInt(req.params.id);
    const expenses = await MyExpenses.findAll({
      include: [Category],
      where: {
        userId: id,
        date: { [Op.between]: [firstOfTheMonth, endOfTheMonth] },
      },
      order: [["date", "DESC"]],
    });
    console.log("My expenses:", expenses);
    res.send(expenses);
  } catch (error) {
    console.log(error.message);
  }
});

//Create new expense
router.post("/my_expenses/:id", async (req, res) => {
  const { amount, date, categoryId } = req.body;
  if (!amount || !date || !categoryId) {
    return res.status(400).send("Please provide an amount, date and category");
  }

  try {
    const newExpense = await MyExpenses.create({
      amount,
      date,
      categoryId,
      userId: req.params.id,
    });
    // console.log("New expense", newExpense);
    const expense = await MyExpenses.findByPk(newExpense.id, {
      include: [Category],
    });
    res.send(expense);
  } catch (error) {
    console.log(error.message);
  }
});

//Get all categories
router.get("/category", async (req, res) => {
  try {
    const category = await Category.findAll();
    console.log("Category table info", category);
    res.send(category);
  } catch (e) {
    console.log(e.message);
  }
});

//Get(search) expense by month
router.get("/my_expenses/month/:month", async (req, res) => {
  const month = req.params.month;
  const currentYear = new Date().getFullYear();
  const startDateToSearch = `${currentYear}/${month}/01`;
  const endDateToSearch = `${currentYear}/${month}/31`;
  console.log("month=", month);
  console.log("date to search=", startDateToSearch);
  try {
    const monthlyExpenses = await MyExpenses.findAll({
      include: [Category],
      where: { date: { [Op.between]: [startDateToSearch, endDateToSearch] } },
    });
    console.log("Monthly Expenses", monthlyExpenses);

    res.send(monthlyExpenses);
  } catch (e) {
    console.log(e.message);
  }
});

//Delete expense
router.delete("/my_expenses/delete/:id", async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await MyExpenses.findByPk(expenseId);
    console.log("Got expense", expense);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }
    await expense.destroy();
    res.send({ message: "Ok", expenseId });
  } catch (e) {
    console.log(e.message);
  }
});

//Get all savings
router.get("/:id/savings", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const goals = await Goal.findAll({ where: { userId: id } });
    console.log("Goals", goals);
    res.send(goals);
  } catch (e) {
    console.log(e.message);
  }
});

//Create new saving goal
router.post("/new_savings/:id", async (req, res) => {
  const { goal_name, target_amount, desire_date } = req.body;
  if (!goal_name || !target_amount || !desire_date) {
    return res
      .status(400)
      .send("Please provide name, target amount and desire date");
  }
  try {
    const newGoal = await Goal.create({
      goal_name,
      target_amount,
      desire_date,
      userId: req.params.id,
    });
    console.log("new Goal", newGoal);
    res.send(newGoal);
  } catch (e) {
    console.log(e.message);
  }
});

//Get saving details
router.get("/savings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const detailSaving = await Goal.findByPk(id);
    if (!detailSaving) {
      return res.status(404).send("Saving not found");
    }
    console.log("Saving details: ", detailSaving);
    res.send(detailSaving);
  } catch (e) {
    console.log(e.message);
  }
});

//Update saving amount
router.patch("/addSaving/:id", async (req, res) => {
  try {
    const saved_amount = req.body;
    const goal = await Goal.findByPk(req.params.id);
    if (!goal) {
      return res.status(404).send("Saving not found to add saved amount");
    }
    await goal.update(saved_amount);
    return res.send(goal);
  } catch (error) {
    res.send("Something went wrong");
  }
});

//Update desire date for saving goal
router.patch("/savings/:id", async (req, res) => {
  try {
    const desire_date = req.body;
    const updateDate = await Goal.findByPk(req.params.id);
    if (!updateDate) {
      return res.status(404).send("saving not found to update the date");
    }
    await updateDate.update(desire_date);
    return res.send(updateDate);
  } catch (error) {
    res.send("Something went wrong");
  }
});

//Delete saving goal
router.delete("/saving/delete/:id", async (req, res) => {
  try {
    const savingID = req.params.id;
    const saving = await Goal.findByPk(savingID);
    console.log("Got saving", saving);
    if (!saving) {
      return res.status(404).send("This Saving not found");
    }
    await saving.destroy();
    res.send({ message: "Ok", savingID });
  } catch (error) {
    res.send("Something went wrong");
  }
});

module.exports = router;
