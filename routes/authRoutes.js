const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // This must match the exports in the controller!

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;