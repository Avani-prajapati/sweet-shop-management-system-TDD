const Sweet = require("../models/Sweet");

const purchaseSweet = async (id, quantity) => {
  try {

    if (!id) {
     const message = "Sweet ID is required";
     throw new Error(message);
    }


    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Purchase quantity must be a positive integer");
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    if (sweet.quantity < quantity) {
      throw new Error("Insufficient stock available");
    }

    sweet.quantity -= quantity;

    const updatedSweet = await sweet.save();
    return updatedSweet;
  } catch (error) {
    console.error("Error purchasing sweet:", error.message);
    throw new Error(error.message);
  }
};

module.exports = purchaseSweet;
