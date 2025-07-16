const Sweet = require("../../src/models/Sweet");
const addSweet = require("../../src/services/addSweet");

// Mock the Sweet model
jest.mock("../../src/models/Sweet");

describe("Add Controller", () => {
  test("should add new sweet successfully", async () => {
    const sweetData = {
      id: 1001,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
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

  test("should handle errors when adding sweet", async () => {
    const sweetData = {
      id: 1002,
      name: "Gulab Jamun",
      category: "Fried",
      price: 30,
      quantity: 15,
    };

    Sweet.prototype.save = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    await expect(addSweet(sweetData)).rejects.toThrow("Database error");
    expect(Sweet.prototype.save).toHaveBeenCalledTimes(1);
  });

  test("should throw error if sweet name is missing or invalid", async () => {
    const invalidData = {
      category: "Fried",
      price: 20,
      quantity: 10,
    };

    await expect(addSweet(invalidData)).rejects.toThrow(
      "Sweet name is required"
    );
  });

  test("should throw error if price is not positive", async () => {
    const invalidData = {
      name: "Barfi",
      category: "Dry",
      price: 0, // Invalid
      quantity: 10,
    };

    await expect(addSweet(invalidData)).rejects.toThrow(
      "Price must be a positive number"
    );
  });

  test("should throw error if quantity is negative", async () => {
    const invalidData = {
      name: "Halwa",
      category: "Chilled",
      price: 25,
      quantity: -5, // Invalid
    };

    await expect(addSweet(invalidData)).rejects.toThrow(
      "Quantity must be a non-negative integer"
    );
  });
});
