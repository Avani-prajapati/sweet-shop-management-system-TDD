const Sweet = require("../models/Sweet");

const restockSweet = async (id, quantityToAdd) => {
  try {
    if (!id) {
      throw new Error("Sweet ID is required");
    }

    if (!Number.isInteger(quantityToAdd) || quantityToAdd <= 0) {
      throw new Error("Restock quantity must be a positive integer");
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    sweet.quantity += quantityToAdd;

    const updatedSweet = await sweet.save();
    return updatedSweet;
  } catch (error) {
    console.error("Error restocking sweet:", error.message);
    throw new Error(error.message);
  }
};

module.exports = restockSweet;
