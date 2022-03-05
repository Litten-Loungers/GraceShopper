const router = require('express').Router();
const res = require('express/lib/response');
const {
  models: { LineItem, Order, Product, User },
} = require('../db');
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

//think this needs more attention later for security
//DELETE single lineItem
router.delete('/:lineItemId', requireToken, async (req, res, next) => {
  const id = Number(req.params.lineItemId);
  try {
    await LineItem.destroy({
      where: {
        id: id,
      },
    });
    res.send(204);
  } catch (error) {
    next(error);
  }
});

//GET a user's cart
router.get('/cart', requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({
      where: {
        userId,
        status: 'NEW',
      },
    });
    if (order) {
      const lineItems = await LineItem.findAll({
        where: {
          orderId: order.id,
        },
        include: {
          model: Product,
        },
      });
      res.json(lineItems);
    } else {
      res.json([]);
    }
  } catch (err) {
    next(err);
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

//POST a new item to cart
router.post('/add-to-cart/:productId', requireToken, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    const [cart, cartCreated] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'NEW',
      },
    });
    const [item, created] = await LineItem.findOrCreate({
      where: {
        orderId: cart.id,
        productId,
      },
    });
    await item.update({ quantity: item.quantity + 1, price: product.price });
    res.json([item, created]);
  } catch (err) {
    next(err);
  }
});

// this one too
// update line-item
router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await LineItem.findByPk(id);
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});
