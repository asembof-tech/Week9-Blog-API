const express = require('express');
const router = express.Router();
const { createNote, getNotes, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware'); 

// All these routes require authentication (protect middleware)
router.route('/')
    .post(protect, createNote)
    .get(protect, getNotes);

router.route('/:id')
    .delete(protect, deleteNote);

module.exports = router;