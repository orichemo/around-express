const router = require('express').Router();

const {
  getCards, deleteCardById, createCard, likeCard, dislikeCard
} = require('../controllers/card');

// route definitions
router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
