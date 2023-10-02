const express = require('express');
const router = express.Router();

const {
    register, login, authUser
} = require('../controller/authController');
const auth = require('../middleware/authenticated');

router.get('/', auth, authUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;