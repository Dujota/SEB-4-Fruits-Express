/* eslint-disable object-shorthand */
require('dotenv').config();
require('./config/database');
const express = require('express');
const morgan = require('morgan');

const app = express();
// MODELS
const Fruit = require('./models/fruit');

// MIDDLEWARE
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
  res.redirect('/fruits/new');
  console.log(req.body);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
