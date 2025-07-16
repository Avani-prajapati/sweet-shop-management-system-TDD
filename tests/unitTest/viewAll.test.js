const Sweet = require("../../src/models/Sweet");
const viewAllSweets = require("../../src/services/viewAllSweets");

// Mock the Sweet model
jest.mock("../../src/models/Sweet");

describe("View All Sweets Controller", () => {
   test("should return all sweets successfully", async () => {
    const mockSweets = [
      {
        _id: "1",
        name: "Kaju Katli",
        category: "Dry",
        price: 60,
        quantity: 10,
      },
      {
        _id: "2",
        name: "Rasgulla",
        category: "Chilled",
        price: 40,
        quantity: 20,
      },
    ];

    Sweet.find.mockResolvedValue(mockSweets);

    const result = await viewAllSweets();

    expect(result).toEqual(mockSweets);
    expect(Sweet.find).toHaveBeenCalledTimes(1);
  });

  test("should return empty array if no sweets found", async () => {
    Sweet.find.mockResolvedValue([]);

    const result = await viewAllSweets();

    expect(result).toEqual([]);
    expect(Sweet.find).toHaveBeenCalledTimes(1);
  });

  test("should handle database errors", async () => {
    Sweet.find.mockRejectedValue(new Error("Database error"));

    await expect(viewAllSweets()).rejects.toThrow("Database error");
    expect(Sweet.find).toHaveBeenCalledTimes(1);
  });
});
