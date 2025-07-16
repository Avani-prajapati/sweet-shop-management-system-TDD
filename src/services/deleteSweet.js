const Sweet = require("../models/Sweet");

const deleteSweet = async (id) => {
  if (!id) {
    throw new Error("ID is required to delete a sweet.");
  }

  try {
    const deletedSweet = await Sweet.findByIdAndDelete(id);

    if (!deletedSweet) {
      throw new Error("Sweet not found");
    }

    return deletedSweet;
  } catch (error) {
    console.error("Failed to delete sweet:", error.message);
    throw new Error(error.message); 
  }
};

module.exports = deleteSweet;
