const addSweet = require("../services/addSweet");
const viewAllSweets = require("../services/viewAllSweets");
const updateSweet = require("../services/updateSweet");
const deleteSweet = require("../services/deleteSweet");
const searchSweets = require("../services/searchSweets");
const purchaseSweet = require("../services/purchaseSweet");

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

const searchSweetController = async (req, res) => {
  try {
    const { name, category, price } = req.query;

    // Count how many filters are passed
    const activeFilters = [name, category, price].filter((val) => val !== undefined && val !== "");

    if (activeFilters.length !== 1) {
      return res.status(400).json({ error: "Please provide only one filter at a time: name, category, or price." });
    }

    const filters = {};
    if (name) filters.name = name;
    if (category) filters.category = category;
    if (price !== undefined && price !== "") {
      const parsedPrice = Number(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ error: "Price must be a valid number." });
      }
      filters.price = parsedPrice;
    }

    const sweets = await searchSweets(filters);

    if (sweets.length === 0) {
      return res.status(404).json({ error: "No sweets found." });
    }

    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const purchaseSweetController = async (req, res) => {
  try {
    const { quantity } = req.body;
    const result = await purchaseSweet(req.params.id, quantity);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addSweetController,
  viewAllSweetsController,
  updateSweetController,
  deleteSweetController,
  searchSweetController,
  purchaseSweetController
};