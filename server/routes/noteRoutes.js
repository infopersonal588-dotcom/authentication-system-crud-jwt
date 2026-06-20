const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const { noteValidation, validateRequest } = require('../middleware/validateMiddleware');

router.route('/').post(protect, noteValidation, validateRequest, createNote).get(protect, getNotes);
router.route('/:id').get(protect, getNoteById).put(protect, noteValidation, validateRequest, updateNote).delete(protect, deleteNote);

module.exports = router;
