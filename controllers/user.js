// user controller
const User = require('../models/user');

const { errorFail, errorMassage } = require('../helpers/utils');

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

// the getUserById request handler
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => errorFail())
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => errorMassage(err, res));
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

// the updateUserProfile request handler
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate((req.user._id), { name, about }, {
    new: true, // the then handler receives the updated entry as input
    runValidators: true, // the data will be validated before the update
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

// the updateUserAvatar request handler
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate((req.user._id), { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};
