const Sweet = require('../models/Sweet');

const addSweet = async (sweetData) => {
    const sweet = new Sweet(sweetData);
    const savedSweet = await sweet.save();
    return savedSweet;
}

module.exports = addSweet;