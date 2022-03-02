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
  }) // end describe('/api/line-items')
}) // end describe('order routes')
