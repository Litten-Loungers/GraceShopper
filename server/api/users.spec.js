/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { User },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("User routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe.only("/api/users/", () => {
    it("GET /api/users", async () => {
      const res = await request(app).get("/api/users").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(8);
    });

    it("GET /api/users/:id", async () => {
      const user = await User.findByPk(3);
      const res = await request(app).get("/api/users/3").expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.username).to.equal(user.dataValues.username);
    });

    // it('POST /api/users/', async () => {
    //   const res = await request(app)
    //     .post('/api/users/')
    //     .send({price: 200})
    //     .expect(201)

    //   expect(res.body).to.be.an('object');
    //   expect(res.body.price).to.equal(200)
    // })

    // it('DELETE /api/users/', async () => {
    //   const res = await request(app)
    //     .del('/api/users/1')
    //     .expect(200)
    // })
  }); // end describe('/api/users')
}); // end describe('User routes')
