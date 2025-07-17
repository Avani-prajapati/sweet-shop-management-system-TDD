const Sweet = require("../../src/models/Sweet");
const restockSweet = require("../../src/services/restockSweet");

jest.mock("../../src/models/Sweet");

describe("Restock Sweet Controller", () => {
   test("should successfully restock sweet and increase quantity", async () => {
    const sweetId = "1001";
    const restockQty = 10;

    const existingSweet = {
      _id: sweetId,
      name: "Kaju Katli",
      quantity: 5,
      save: jest.fn().mockResolvedValue({ _id: sweetId, name: "Kaju Katli", quantity: 15 }),
    };

    Sweet.findById = jest.fn().mockResolvedValue(existingSweet);

    const result = await restockSweet(sweetId, restockQty);

    expect(Sweet.findById).toHaveBeenCalledWith(sweetId);
    expect(existingSweet.save).toHaveBeenCalled();
    expect(result.quantity).toBe(15);
  });

  test("should throw error if sweet is not found", async () => {
    Sweet.findById = jest.fn().mockResolvedValue(null);

    await expect(restockSweet("9999", 5)).rejects.toThrow("Sweet not found");
  });

  test("should throw error if restock quantity is invalid", async () => {
    await expect(restockSweet("1002", 0)).rejects.toThrow("Restock quantity must be a positive integer");
    await expect(restockSweet("1002", -3)).rejects.toThrow("Restock quantity must be a positive integer");
  });

  test("should handle database error", async () => {
    Sweet.findById = jest.fn().mockRejectedValue(new Error("Database error"));

    await expect(restockSweet("1001", 5)).rejects.toThrow("Database error");
  });

  test("should throw error if ID is not provided", async () => {
  await expect(restockSweet(null, { name: "Barfi" }))
    .rejects.toThrow("weet ID is required");
  });
});
