const express = require('express');
const validateToken = require('../Middleware/validateTokenHandler');
const searchNote = require('../Controllers/searchController');

const router = express.Router();

router.use(validateToken);
router.route('/search').get(searchNote);

module.exports = router;