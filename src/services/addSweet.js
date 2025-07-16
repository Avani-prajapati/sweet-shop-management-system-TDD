const Sweet = require('../models/Sweet');


const addSweet = async (sweetData) => {
    const {name,price,quantity} = sweetData;
    try{

    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Sweet name is required and must be a non-empty string.');
     }

     if (typeof price !== 'number' || price <= 0) {
       throw new Error('Price must be a positive number.');
     }

     if (!Number.isInteger(quantity) || quantity < 0) {
       throw new Error('Quantity must be a non-negative integer.');
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