const router = require('express').Router();
const res = require('express/lib/response');
const {
  models: { Product },
} = require('../db');
module.exports = router;

//GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//POST single product
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

//DELETE single product
router.delete('/:productId', async (req, res, next) => {
  const id = Number(req.params.productId);
  try {
    await Product.destroy({
      where: {
        id: id,
      },
    });
    res.send(200);
  } catch (error) {
    next(error);
  }
});

//GET single product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await User.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
