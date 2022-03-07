const router = require('express').Router();
const {
  models: { User },
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
