const router = require('express').Router();
const res = require('express/lib/response');
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

router.put(
  '/purchase-item/:productId',
  requireToken,
  async (req, res, next) => {
    try {
      const id = req.params.productId;
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'NEW',
        },
      });
      const lineItem = await LineItem.findOne({
        where: {
          orderId: order.id,
          productId: id,
        },
        include: {
          model: Product,
        },
      });
      await lineItem.product.update(req.body);
      res.json(lineItem.product);
    } catch (err) {
      next(err);
    }
  }
);

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
