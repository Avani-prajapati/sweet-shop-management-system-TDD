const Sweet = require("../models/Sweet");

const viewAllSweets = async () => {
  try {
    const sweets = await Sweet.find();
    return sweets;
  } catch (error) {
    console.error("Error fetching sweets:", error.message);
    throw new Error(error.message);
  }
};

module.exports = viewAllSweets;
