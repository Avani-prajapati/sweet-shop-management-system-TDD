const Sweet = require('../models/Sweet');


const addSweet = async (sweetData) => {
    try{
        const sweet = new Sweet(sweetData);
        const savedSweet = await sweet.save();
        return savedSweet;
    }catch (error) {
        console.error('Error adding sweet:', error);
        throw new Error(error.message);
    }
}

module.exports = addSweet;