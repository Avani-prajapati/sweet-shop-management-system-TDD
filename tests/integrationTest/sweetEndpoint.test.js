const request = require('supertest');
const app = require('../../src/app'); 
const Sweet = require('../../src/models/Sweet');
const mongoose = require('mongoose');
const {connectDB,disconnectDB} = require('../../src/config/mongodb');

beforeAll(async () => {
  await connectDB();
  console.log("Connected to test database");
});

afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected from test database");
});


describe('integration tests for sweet endpoints', () => {
   let sweetId;

  test("POST /api/sweets - Add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        id: 101,
        name: "Kaju Katli",
        category: "Dry",
        price: 50,
        quantity: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Kaju Katli");
    sweetId = res.body._id;
  });

  test("GET /api/sweets - View all sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

})