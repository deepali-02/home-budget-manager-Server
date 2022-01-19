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

module.exports = router;
