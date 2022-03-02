const router = require('express').Router();
const res = require('express/lib/response');
const {
  models: { LineItem },
} = require('../db');
module.exports = router;

//GET all lineItems
router.get('/', async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll();
    res.json(lineItems);
  } catch (err) {
    next(err);
  }
});

//POST single lineItem
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await LineItem.create(req.body));
  } catch (error) {
    next(error);
  }
});

//DELETE single lineItem
router.delete('/:lineItemId', async (req, res, next) => {
  const id = Number(req.params.lineItemId);
  try {
    await LineItem.destroy({
      where: {
        id: id,
      },
    });
    res.send(200);
  } catch (error) {
    next(error);
  }
});

//GET single lineItem
router.get('/:lineItemId', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.lineItemId);
    res.json(lineItem);
  } catch (err) {
    next(err);
  }
});
