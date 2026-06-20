const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const {
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  passwordUpdateValidation,
  validateRequest,
} = require('../middleware/validateMiddleware');

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, authUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, profileUpdateValidation, validateRequest, updateUserProfile);
router.put('/profile/password', protect, passwordUpdateValidation, validateRequest, updateUserPassword);
router.delete('/profile', protect, deleteUserProfile);

module.exports = router;
