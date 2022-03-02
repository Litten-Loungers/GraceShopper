/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Order },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Order routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe.only("/api/orders/", () => {
    it("GET /api/orders", async () => {
      const res = await request(app).get("/api/orders").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(1);
    });

    it("GET /api/orders/:id", async () => {
      const res = await request(app).get("/api/orders/1").expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.status).to.equal("NEW");
    });

    it("POST /api/orders", async () => {
      const res = await request(app).post("/api/orders").expect(201);

      expect(res.body.status).to.equal("NEW");
    });

    it("DELETE /api/orders", async () => {
      const res = await request(app).del("/api/orders/1").expect(204)
    })
  }); // end describe('/api/orders')
}); // end describe('order routes')
