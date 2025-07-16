const Sweet = require("../../src/models/Sweet");
const purchaseSweet = require("../../src/services/purchaseSweet");

jest.mock("../../src/models/Sweet");

describe("Purchase Sweet Controller", () => {
   test("should successfully purchase sweet and reduce quantity", async () => {
    const sweetId = "1001";
    const purchaseQty = 5;

    const existingSweet = {
      _id: sweetId,
      name: "Kaju Katli",
      quantity: 10,
      save: jest.fn().mockResolvedValue({ ...this, quantity: 5 }),
    };

    Sweet.findById = jest.fn().mockResolvedValue(existingSweet);

    const result = await purchaseSweet(sweetId, purchaseQty);

    expect(Sweet.findById).toHaveBeenCalledWith(sweetId);
    expect(existingSweet.save).toHaveBeenCalled();
    expect(result.quantity).toBe(5);
  });

  test("should throw error if sweet is not found", async () => {
    Sweet.findById = jest.fn().mockResolvedValue(null);

    await expect(purchaseSweet("9999", 2)).rejects.toThrow("Sweet not found");
  });

  test("should throw error if requested quantity exceeds stock", async () => {
    const sweetId = "1002";
    const purchaseQty = 15;

    const existingSweet = {
      _id: sweetId,
      name: "Rasgulla",
      quantity: 10,
    };

    Sweet.findById = jest.fn().mockResolvedValue(existingSweet);

    await expect(purchaseSweet(sweetId, purchaseQty)).rejects.toThrow(
      "Insufficient stock available"
    );
  });

  test("should throw error if quantity is invalid", async () => {
    await expect(purchaseSweet("1003", 0)).rejects.toThrow("Purchase quantity must be a positive integer");
    await expect(purchaseSweet("1003", -1)).rejects.toThrow("Purchase quantity must be a positive integer");
  });

  test("should handle database error", async () => {
    Sweet.findById = jest.fn().mockRejectedValue(new Error("Database error"));

    await expect(purchaseSweet("1001", 2)).rejects.toThrow("Database error");
  });
});
