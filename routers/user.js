const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { Op } = require("sequelize");

const User = require("../models").user;
const MyExpenses = require("../models").my_expenses;
const Category = require("../models").category;
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
  const endOfTheMonth = `${currentYear}/${currentMonth}/30`;
  console.log(
    `date:${currentDate},month: ${currentMonth}, year: ${currentYear}`
  );
  const currentMonthExpenses = await MyExpenses.findAll({
    where: { date: { [Op.between]: [firstOfTheMonth, endOfTheMonth] } },
  });
  //console.log("All expenses of current month", currentMonthExpenses);
  const currentMonthExpenses1 = await MyExpenses.findAll({
    where: { date: { [Op.gte]: [firstOfTheMonth] } },
  });
  console.log("All expenses of current month", currentMonthExpenses1);
  try {
    const id = parseInt(req.params.id);
    const expenses = await MyExpenses.findAll({
      include: [Category],
      where: { userId: id, date: { [Op.gte]: [firstOfTheMonth] } },
      order: [["date", "DESC"]],
    });
    // console.log("My expenses:", expenses);
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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const firstOfTheMonth = `01/${currentMonth}/${currentYear}`;
  console.log(
    `date:${currentDate},month: ${currentMonth}, year: ${currentYear}`
  );
  //   const where = {
  //     [Op.or]: [{
  //         from: {
  //             [Op.between]: [startDate, endDate]
  //         }
  //     }, {
  //         to: {
  //             [Op.between]: [startDate, endDate]
  //         }
  //     }]
  // };
  const currentMonthExpenses = await MyExpenses.findAll({
    where: { date: { from: { [Op.gte]: firstOfTheMonth } } },
  });
  console.log("All expenses of current month", currentMonthExpenses);
  try {
    const newExpense = await MyExpenses.create({
      amount,
      date,
      categoryId,
      userId: req.params.id,
    });
    // console.log("New expense", newExpense);
    res.send(newExpense);
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

module.exports = router;
