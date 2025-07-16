const Sweet = require('../models/Sweet');


const addSweet = async (sweetData) => {
    const {name} = sweetData;
    try{

       if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Sweet name is required and must be a non-empty string.');
  }
        const sweet = new Sweet(sweetData);
        const savedSweet = await sweet.save();
        return savedSweet;
    }catch (error) {
        console.error('Error adding sweet:', error);
        throw new Error(error.message);
    }
}

module.exports = addSweet;