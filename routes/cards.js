const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const CARDS_PATH = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fsPromises.readFile(CARDS_PATH, { encoding: 'utf8' })
    .then((cards) => (JSON.parse(cards)))
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

module.exports = router;
