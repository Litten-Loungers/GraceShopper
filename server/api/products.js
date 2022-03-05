const router = require('express').Router();
const res = require('express/lib/response');
const {
  models: { Product },
} = require('../db');
module.exports = router;

//GET all products
router.get('/', async (req, res, next) => {
  try {
    console.log(req.user);
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
    res.send(204);
  } catch (error) {
    next(error);
  }
});

//GET single product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    if (req.headers.authorization === 'PURCHASE_MADE') {
      const product = await Product.findByPk(req.params.productId);
      await product.update(req.body);
      res.json(product);
    } else {
      next(new Error());
    }
  } catch (err) {
    next(err);
  }
});
