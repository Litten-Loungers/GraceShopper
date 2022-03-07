'use strict';

const {
  db,
  models: { User, Product, Order, LineItem },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'kevin', password: '1234', type: "ADMIN"  }),
    User.create({ username: 'jonathan', password: '12345', type: "ADMIN" }),
    User.create({ username: 'lucas', password: '123456', type: "ADMIN" }),
    User.create({ username: 'konstantin', password: '1234567', type: "ADMIN" }),
    User.create({ username: 'bart', password: '12345678', type: "ADMIN" }),
    User.create({ username: 'alfred', password: '123456789', type: "ADMIN" }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'Batman Begins',
      price: 100,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    }),
    Product.create({
      name: 'Whiplash',
      price: 20,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    }),
    Product.create({
      name: 'The Dark Knight',
      price: 1000,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    }),
    Product.create({
      name: 'Bunny and the Bull',
      price: 100,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BNDM0ODVhNTItNDYyZC00ZjU5LTgxNTMtZmY2MjJkOTU2MTcxXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg',
    }),
    Product.create({
      name: 'Groundhog Day',
      price: 10,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    }),
    Product.create({
      name: 'Godfather',
      price: 90,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BYjI2YmJhMTUtYjEzYS00N2VmLTlmMzMtZGQ1MjZhNmY0ODdiXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg',
    }),
    Product.create({
      name: 'Frozen',
      price: 40,
      description: 'This is a movie poster',
      quantity: 1,
      available: true,
      imageURL:
        'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg',
    }),
  ]);
  //creating order
  const cart = await Order.create();
  await users[0].addOrder(cart);
  //creating lineitems
  const item1 = await LineItem.create();
  await item1.setOrder(cart);
  await item1.update({ price: products[3].price, quantity: 1 });
  await item1.setProduct(products[3]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
