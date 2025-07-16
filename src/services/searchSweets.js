const Sweet = require("../models/Sweet");

const searchSweets = async (filters) => {
  try {
    const query = {};

    // Apply filters based on presence
    if (filters.name) {
      query.name = filters.name;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.price !== undefined) {
      query.price = filters.price;
    }

    const sweets = await Sweet.find(query);
    return sweets;
  } catch (error) {
    console.error("Error searching sweets:", error.message);
    throw new Error(error.message);
  }
};

module.exports = searchSweets;
