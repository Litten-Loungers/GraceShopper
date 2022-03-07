const router = require('express').Router();
const {
  models: { Product, User, Order },
} = require('../db');
const LineItem = require('../db/models/LineItem');
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};

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
router.delete('/:productId', requireToken, async (req, res, next) => {
  const id = Number(req.params.productId);
  try {
    if (req.user.type === 'ADMIN') {
      await Product.destroy({
        where: {
          id: id,
        },
      });
      res.send(204);
    } else {
      throw new Error();
    }
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

router.put('/purchase-item/:productId', async (req, res, next) => {
  try {
    if (req.headers.authorization === 'ITEM_PURCHASED') {
      const id = req.params.productId;
      const product = await Product.findByPk(id);
      await product.update(req.body);
      res.json(product);
    } else {
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
});

router.put(`/:productId`, requireToken, async (req, res, next) => {
  try {
    if (req.user.type === 'ADMIN') {
      const { productId } = req.params;
      const product = await Product.findByPk(productId);
      await product.update(req.body);
      res.json(product);
    } else {
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
});
