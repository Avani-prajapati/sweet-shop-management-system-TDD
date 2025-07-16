const Sweet = require('../../src/models/Sweet');
const updateSweet = require('../../src/services/updateSweet');

jest.mock('../../src/models/Sweet');

describe('Update Sweet Service', () => {
     test("should update sweet successfully", async () => {
    const id = "1001";
    const updateData = {
      name: "Kaju Katli",
      price: 60,
    };

    const mockUpdatedSweet = {
      _id: id,
      name: "Kaju Katli",
      category: "Dry",
      price: 60,
      quantity: 20,
      updatedAt: new Date(),
    };

    Sweet.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedSweet);

    const result = await updateSweet(id, updateData);

    expect(result).toEqual(mockUpdatedSweet);
    expect(Sweet.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, { new: true });
  });

  test("should throw error if sweet not found", async () => {
    Sweet.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await expect(updateSweet("9999", { name: "Ladoo" })).rejects.toThrow("Sweet not found");
  });

  test("should throw validation error for invalid price", async () => {
    const invalidData = { price: -10 };

    await expect(updateSweet("1001", invalidData)).rejects.toThrow("Price must be a positive number.");
  });

  test("should handle database error", async () => {
    Sweet.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error("Database error"));

    await expect(updateSweet("1001", { name: "Rasgulla" })).rejects.toThrow("Database error");
  });
})