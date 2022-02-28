const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { Op } = require("sequelize");

const User = require("../models").user;
const MyExpenses = require("../models").my_expenses;
const Category = require("../models").category;
const Goal = require("../models").goal;
const { DATEONLY } = require("sequelize");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findAll({ include: [MyExpenses] });
    console.log("User info: ", user);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/my_expenses/:id", async (req, res) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const firstOfTheMonth = `${currentYear}/${currentMonth}/01`;
  const endOfTheMonth = `${currentYear}/${currentMonth}/31`;
  // // console.log(
  //   `date:${currentDate},month: ${currentMonth}, year: ${currentYear}`
  // );
  // const currentMonthExpenses = await MyExpenses.findAll({
  //   where: { date: { [Op.between]: [firstOfTheMonth, endOfTheMonth] } },
  // });
  //console.log("All expenses of current month", currentMonthExpenses);
  // const currentMonthExpenses1 = await MyExpenses.findAll({
  //   where: { date: { [Op.between]: [firstOfTheMonth, endOfTheMonth] } },
  // });
  // console.log("All expenses of current month", currentMonthExpenses1);
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

router.get("/category", async (req, res) => {
  try {
    const category = await Category.findAll();
    console.log("Category table info", category);
    res.send(category);
  } catch (e) {
    console.log(e.message);
  }
});

//search expense by month
router.get("/my_expenses/month/:month", async (req, res) => {
  const month = req.params.month;
  const currentYear = new Date().getFullYear();
  const startDateToSearch = `${currentYear}/${month}/01`;
  const endDateToSearch = `${currentYear}/${month}/31`;
  console.log("month=", month);
  console.log("date to search=", startDateToSearch);
  try {
    // const year = req.params.year;
    const monthlyExpenses = await MyExpenses.findAll({
      include: [Category],
      where: { date: { [Op.between]: [startDateToSearch, endDateToSearch] } },
    });
    console.log("Monthly Expenses", monthlyExpenses);
    // const monthlyExpense = await MyExpenses.findByPk(monthlyExpenses.id, {
    //   include: [Category],
    // });
    res.send(monthlyExpenses);
  } catch (e) {
    console.log(e.message);
  }
});

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

router.get("/savings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const detailSaving = await Goal.findAll({ where: { id: id } });
    console.log("Saving details: ", detailSaving);
    res.send(detailSaving);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
