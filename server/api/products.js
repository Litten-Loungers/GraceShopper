const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// ! Add a documentation comment showing the URL of this route
// ! GET /api/products for instance
router.get('/', async (req, res, next) => {
  try {
    const products = await Product
      .findAll
      // !remove the copy and pasted comments from the other file
      // !they only serve to confuse future coders (or yourself later)

      // {
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //   attributes: ['id', 'username'],
      // }
      ();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
