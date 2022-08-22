const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(500).send({ message: 'An error has occurred on the server' });
});

app.listen(PORT);
