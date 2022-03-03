/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Product },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Product routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/products/", () => {
    it("GET /api/products", async () => {
      const res = await request(app).get("/api/products").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(7);
    });
    it("GET /api/products/:id", async () => {
      const res = await request(app).get("/api/products/1").expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.name).to.equal("Batman Begins");
    });
    it("POST /api/products/", async () => {
      const res = await request(app).post("/api/products")
      .send({ name: "ZXZ", description: "ZZZZZZZZ", available: true })
      .expect(201);

      expect(res.body.name).to.equal("ZXZ");
    })
    it("DELETE /api/products/:id", async () => {
      const res = await request(app).del("/api/products/1").expect(204)
    })
  }); // end describe('/api/products')
}); // end describe('order routes')
