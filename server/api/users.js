const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('./middleware');

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.type === 'ADMIN') {
      const users = await User.findAll({
        attributes: ['id', 'username'],
      });
      res.json(users);
    } else {
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
});

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId, {
//       attributes: ['id', 'username'],
//     });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
