const { Router } = require("express");
const authMiddleware = require("../auth/middleware");

const User = require("../models").user;
const MyExpenses = require("../models").my_expenses;
const Category = require("../models").category;

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
  try {
    const id = parseInt(req.params.id);
    const expenses = await MyExpenses.findAll({
      include: [Category],
      where: { userId: id },
    });
    console.log("My expenses:", expenses);
    res.send(expenses);
  } catch (error) {
    console.log(error.message);
  }
});

// router.post("/my_expenses/:id", async (req, res) => {
//   const { amount, date } = req.body;
//   if (!amount || !date) {
//     return res.status(400).send("Please provide an amount and date");
//   }
//   try {
//     const newExpense = await MyExpenses.create({
//       amount,
//       date,

//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

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
