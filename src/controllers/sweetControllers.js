const addSweet = require("../services/addSweet");
const viewAllSweets = require("../services/viewAllSweets");

const addSweetController = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const viewAllSweetsController = async (req, res) => {
  try {
    const sweets = await viewAllSweets();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addSweetController,
  viewAllSweetsController
};