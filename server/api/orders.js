const router = require('express').Router();
const res = require('express/lib/response');
const {
  models: { Order },
} = require('../db');
module.exports = router;

//GET all orders
// router.get('/', async (req, res, next) => {
//   try {
//     const orders = await Order.findAll();
//     res.json(orders);
//   } catch (err) {
//     next(err);
//   }
// });

//POST single order
// router.post('/', async (req, res, next) => {
//   try {
//     res.status(201).send(await Order.create(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

//DELETE single order
// router.delete('/:orderId', async (req, res, next) => {
//   const id = Number(req.params.orderId);
//   try {
//     await Order.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.send(204);
//   } catch (error) {
//     next(error);
//   }
// });

//GET single order
// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.orderId);
//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// });
