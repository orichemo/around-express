// card controller
const Card = require('../models/card');

const { errorFail, errorMassage } = require('../helpers/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send({ cards: data }))
    .catch((err) => res.status(500).send({ message: err }));
};

// the getCardById request handler
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => errorFail())
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => errorMassage(err, res));
};

// the createCard request handler
module.exports.createCard = (req, res) => {
  const {
    name, link
  } = req.body;
  const ownerId = req.user._id;
  Card.create({
    name, link, owner: ownerId
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

// the likeCard request handler
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },)
    .orFail(() => errorFail())
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => errorMassage(err, res));
};

// the dislikeCard request handler
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },)
    .orFail(() => errorFail())
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => errorMassage(err, res));
};
