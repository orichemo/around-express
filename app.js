const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63138352326f9033990735fc' // paste the _id of the test user created in the previous step
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

mongoose.connect('mongodb://localhost:27017/aroundb');
app.listen(PORT);
