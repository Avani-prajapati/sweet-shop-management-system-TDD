const addSweet = require("../services/addSweet");
const viewAllSweets = require("../services/viewAllSweets");
const updateSweet = require("../services/updateSweet");
const deleteSweet = require("../services/deleteSweet");

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

const updateSweetController = async (req, res) => {
  try { 
    const updated = await updateSweet(req.params.id, req.body);
    res.status(200).json(updated); 
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};   

const deleteSweetController = async (req, res) => {
  try {
    const result = await deleteSweet(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  addSweetController,
  viewAllSweetsController,
  updateSweetController,
  deleteSweetController
};