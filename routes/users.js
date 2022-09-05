const router = require('express').Router();

const {
  getUser, getUserById, createUser, updateUserProfile, updateUserAvatar
} = require('../controllers/user');

// route definitions
router.get('/', getUser);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
