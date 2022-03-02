/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { LineItem } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('LineItem routes', () => {
  beforeEach( async () => {
    await seed();
  })

  describe('/api/line-items/', () => {

    it('GET /api/line-items', async () => {
      const res = await request(app)
        .get('/api/line-items')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
    })

    it('GET /api/line-items/:id', async () => {
        const res = await request(app)
          .get('/api/line-items/1')
          .expect(200)

        expect(res.body).to.be.an('object');
        expect(res.body.price).to.equal(100)
      })

      it('POST /api/line-items/', async () => {
        const res = await request(app)
          .post('/api/line-items/')
          .send({price: 200})
          .expect(201)

        expect(res.body).to.be.an('object');
        expect(res.body.price).to.equal(200)
      })


      it('DELETE /api/line-items/', async () => {
        const res = await request(app)
          .del('/api/line-items/1')
          .expect(204)
      })
  }) // end describe('/api/line-items')
}) // end describe('order routes')
