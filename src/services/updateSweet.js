const Sweet = require("../models/Sweet");

const updateSweet = async (id, updateData) => {
  if (!id) {
    throw new Error("ID is required to update a sweet.");
  }

  const { name, category, price, quantity } = updateData;

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    throw new Error("Sweet name must be a non-empty string.");
  }

  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    throw new Error("Price must be a positive number.");
  }

  if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 0)) {
    throw new Error("Quantity must be a non-negative integer.");
  }

  const updatedSweet = await Sweet.findByIdAndUpdate(id, updateData, { new: true });

  if (!updatedSweet) {
    throw new Error("Sweet not found");
  }

  return updatedSweet;
};

module.exports = updateSweet;
