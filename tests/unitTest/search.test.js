const Sweet = require("../../src/models/Sweet");
const searchSweets = require("../../src/services/searchSweets");

// Mock the Sweet model
jest.mock("../../src/models/Sweet");

describe("Search Sweets Controller", () => {
  test("should return sweets filtered by name", async () => {
    const filters = { name: "Kaju Katli" };
    const mockSweets = [
      { name: "Kaju Katli", category: "Dry", price: 60, quantity: 10 },
    ];

    Sweet.find.mockResolvedValue(mockSweets);

    const result = await searchSweets(filters);
    expect(result).toEqual(mockSweets);
    expect(Sweet.find).toHaveBeenCalledWith({ name: "Kaju Katli" });
  });

   test("should return empty array if sweet name not found", async () => {
    const filters = { name: "Unknown Sweet" };

    Sweet.find.mockResolvedValue([]);

    const result = await searchSweets(filters);
    expect(result).toEqual([]);
    expect(Sweet.find).toHaveBeenCalledWith({ name: "Unknown Sweet" });
  });

  test("should return sweets filtered by category", async () => {
    const filters = { category: "Dry" };
    const mockSweets = [
      { name: "Kaju Katli", category: "Dry", price: 60, quantity: 10 },
    ];

    Sweet.find.mockResolvedValue(mockSweets);

    const result = await searchSweets(filters);
    expect(result).toEqual(mockSweets);
    expect(Sweet.find).toHaveBeenCalledWith({ category: "Dry" });
  });

  test("should return not found if no sweets match filters", async () => {
    const filters = { category: "Non-Existent" };
    
    Sweet.find.mockResolvedValue([]);

    const result = await searchSweets(filters);
    expect(result).toEqual([]);
    expect(Sweet.find).toHaveBeenCalledWith({ category: "Non-Existent" });
  });

  test("should return sweets filtered by price", async () => {
    const filters = { price: 40 };
    const mockSweets = [
      { name: "Rasgulla", category: "Chilled", price: 40, quantity: 20 },
    ];

    Sweet.find.mockResolvedValue(mockSweets);

    const result = await searchSweets(filters);
    expect(result).toEqual(mockSweets);
    expect(Sweet.find).toHaveBeenCalledWith({ price: 40 });
  });

  test("should return empty array if sweet with given price not found", async () => {
    const filters = { price: 9999 };

    Sweet.find.mockResolvedValue([]);

    const result = await searchSweets(filters);
    expect(result).toEqual([]);
    expect(Sweet.find).toHaveBeenCalledWith({ price: 9999 });
  });

  test("should handle database error", async () => {
    Sweet.find.mockRejectedValue(new Error("Database error"));

    await expect(searchSweets({ category: "Dry" })).rejects.toThrow("Database error");
  });
});
