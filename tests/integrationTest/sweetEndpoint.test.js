const request = require('supertest');
const app = require('../../src/app'); 
const Sweet = require('../../src/models/Sweet');
const mongoose = require('mongoose');
const {connectDB,disconnectDB} = require('../../src/config/mongodb');

let sweetId;

beforeAll(async () => {
  await connectDB();
  console.log("Connected to test database");
});

afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected from test database");
});

beforeEach(async () => {
  // Clear collection to avoid data leaks between tests
  await Sweet.deleteMany({});

  // Add one sweet before each test
  const res = await request(app).post("/api/sweets").send({
    id: 101,
    name: "Kaju Katli",
    category: "Dry",
    price: 50,
    quantity: 10,
  });
  sweetId = res.body._id;
});



describe('integration tests for sweet endpoints', () => {
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
  });

  test("POST /api/sweets - Fail on missing required fields", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .send({ name: "Bad Sweet" }); // Missing category, price, quantity

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch("Price must be a positive number.");
});

  test("GET /api/sweets - View all sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });


test("GET /api/sweets - Simulate DB failure", async () => {
  const spy = jest.spyOn(Sweet, 'find').mockImplementationOnce(() => {
    throw new Error("Simulated DB failure");
  });

  const res = await request(app).get("/api/sweets");

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/simulated db failure/i);

  spy.mockRestore(); // cleanup
});


   test("PUT /api/sweets/:id - Update sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .send({ price: 60 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(60);
  });

  test("PUT /api/sweets/:id - Fail to update non-existing sweet", async () => {
  const fakeId = new mongoose.Types.ObjectId(); // Valid ObjectId format, but not in DB

  const res = await request(app)
    .put(`/api/sweets/${fakeId}`)
    .send({ price: 99 });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/not found|no sweet/i);
});


  test("DELETE /api/sweets/:id - Delete sweet", async () => {
  const res = await request(app).delete(`/api/sweets/${sweetId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("_id", sweetId); 
  expect(res.body).toHaveProperty("name", "Kaju Katli"); 
});

test("DELETE /api/sweets/:id - Fail to delete non-existing sweet", async () => {
  const fakeId = new mongoose.Types.ObjectId(); // ID not in DB

  const res = await request(app).delete(`/api/sweets/${fakeId}`);

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/not found|no sweet/i);
});


test("GET /api/sweets/search?name=Kaju Katli - Search by name only", async () => {
  const res = await request(app).get("/api/sweets/search?name=Kaju Katli");
  expect(res.statusCode).toBe(200);
  expect(res.body[0]).toHaveProperty("name", "Kaju Katli");
});

test("GET /api/sweets/search?price=abc - Fail on invalid price input", async () => {
  const res = await request(app).get("/api/sweets/search?price=abc");

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/price must be a valid number/i);
});


test("GET /api/sweets/search?category=Dry - Search by category only", async () => {
  const res = await request(app).get("/api/sweets/search?category=Dry");
  expect(res.statusCode).toBe(200);
  expect(res.body[0]).toHaveProperty("category", "Dry");
});

test("GET /api/sweets/search?price=50 - Search by price only", async () => {
  const res = await request(app).get("/api/sweets/search?price=50");
  expect(res.statusCode).toBe(200);
  expect(res.body[0]).toHaveProperty("price", 50);
});


test("GET /api/sweets/search?name=UnknownSweet - No result found", async () => {
  const res = await request(app).get("/api/sweets/search?name=UnknownSweet");

  console.log(res.body); // optional for debugging

  expect(res.statusCode).toBe(404); // 🟢 this should now work
  expect(res.body.error).toMatch(/no sweets found/i);
});

test("GET /api/sweets/search - Simulate internal error (service failure)", async () => {
  const originalFind = Sweet.find;

  // Simulate DB failure by making Sweet.find() throw an error
  jest.spyOn(Sweet, 'find').mockImplementationOnce(() => {
    throw new Error("Simulated search failure");
  });

  const res = await request(app).get("/api/sweets/search?name=Kaju");

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/simulated search failure/i);

  Sweet.find = originalFind; // Restore original
});


test("POST /api/sweets/purchase/:id - Successful purchase", async () => {
  const res = await request(app)
    .post(`/api/sweets/purchase/${sweetId}`)
    .send({ quantity: 4 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(6); // originally 10 - 4
});

test("POST /api/sweets/purchase/:id - Fail on insufficient stock", async () => {
  const res = await request(app)
    .post(`/api/sweets/purchase/${sweetId}`)
    .send({ quantity: 100 });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/insufficient stock/i);
});


test("POST /api/sweets/stock/:id - Increase stock", async () => {
  const res = await request(app)
    .post(`/api/sweets/stock/${sweetId}`)
    .send({ quantity: 5 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(15); // originally 10 + 5
});

test("POST /api/sweets/stock/:id - Fail on negative quantity", async () => {
  const res = await request(app)
    .post(`/api/sweets/stock/${sweetId}`)
    .send({ quantity: -3 });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/Restock quantity must be a positive integer/i);
});


})