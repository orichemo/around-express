function errorFail() {
  const error = new Error('Card not found');
  error.statusCode = 404;
  throw error;
}

function errorMassage(err, res) {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Invalid card id' });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: (err.message || 'internal server error') });
  }
}

module.exports = { errorFail, errorMassage };
