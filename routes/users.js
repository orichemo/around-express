const router = require('express').Router();

const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fsPromises
    .readFile(USERS_PATH, { encoding: 'utf8' })
    .then((users) => (JSON.parse(users)))
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

router.get('/:id', (req, res) => {
  fsPromises
    .readFile(USERS_PATH, { encoding: 'utf8' })
    .then((users) => (JSON.parse(users)))
    .then((users) => (users.find((user) => user._id === req.params.id)))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      }
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

module.exports = router;
