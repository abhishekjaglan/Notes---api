const express = require('express');
const validateToken = require('../Middleware/validateTokenHandler');
const { getNotes, createNote, getNoteId, updateNoteId, deleteNoteId, shareNote } = require('../Controllers/noteController');
const router = express.Router();

router.use(validateToken);
router.route('/').get(getNotes).post(createNote);
router.route('/:id').get(getNoteId).put(updateNoteId).delete(deleteNoteId);
router.route('/:id/share').post(shareNote);

module.exports = router;