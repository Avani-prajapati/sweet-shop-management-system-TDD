const addSweet = require("../services/addSweet");

const addSweetController = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addSweetController
};