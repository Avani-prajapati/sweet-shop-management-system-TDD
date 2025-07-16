const Sweet = require("../../src/models/Sweet");
const deleteSweet = require("../../src/services/deleteSweet");

// Mock the Sweet model
jest.mock("../../src/models/Sweet");

describe("Delete Controller", () => {
   test("should delete sweet successfully", async () => {
    const id = "1001";

    const mockDeletedSweet = {
      _id: id,
      name: "Kaju Katli",
      category: "Dry",
      price: 60,
      quantity: 10,
    };

    Sweet.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedSweet);

    const result = await deleteSweet(id);

    expect(result).toEqual(mockDeletedSweet);
    expect(Sweet.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  test("should throw error if sweet not found", async () => {
    Sweet.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await expect(deleteSweet("9999")).rejects.toThrow("Sweet not found");
  });

  test("should handle database error", async () => {
    Sweet.findByIdAndDelete = jest.fn().mockRejectedValue(new Error("Database error"));

    await expect(deleteSweet("1001")).rejects.toThrow("Database error");
  });

  test("should throw error if ID is not provided", async () => {
    await expect(deleteSweet()).rejects.toThrow("ID is required to delete a sweet.");
  });
});
