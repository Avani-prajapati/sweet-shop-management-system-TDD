const Sweet = require('../../src/models/Sweet');
const addSweet = require('../../src/services/addSweet');

// Mock the Sweet model
jest.mock('../../src/models/Sweet');


describe('Add Controller', () => {

  test('should add new sweet successfully', async () => {
    const sweetData = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    const mockSavedSweet = {
        _id: "mock-id-123",
        ...sweetData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

     Sweet.prototype.save = jest.fn().mockResolvedValue(mockSavedSweet);

      const result = await addSweet(sweetData);

      expect(result).toEqual(mockSavedSweet);
      expect(Sweet.prototype.save).toHaveBeenCalledTimes(1);
    });

});