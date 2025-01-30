/* eslint-disable no-console */
/* eslint-disable object-shorthand */
require('dotenv').config();
require('./config/database');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
// MODELS
const Fruit = require('./models/fruit');

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// PUBLIC ROUTES

app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.get('/fruits', async (req, res) => {
  const fruits = await Fruit.find({});

  res.render('fruits/index.ejs', { fruits: fruits });
});

// Create Fruit
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs');
});

app.post('/fruits', async (req, res) => {
  try {
    if (req.body.isReadyToEat === 'on') {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }

    const newFruit = await Fruit.create(req.body);

    console.log(newFruit);
  } catch (err) {
    console.log('ERROR:', err);
  }
  res.redirect('/fruits');
  console.log(req.body);
});

// Fruit Show
app.get('/fruits/:fruitId', async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render('fruits/show.ejs', { fruit: fruit });
});

// Fruit Delete
app.delete('/fruits/:fruitId', async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect('/fruits');
});

// Fruit update

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
