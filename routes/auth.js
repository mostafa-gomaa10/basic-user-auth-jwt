const router = require('express').Router();
const { regsiterPost, loginPost } = require('../controllers/authController');


router.post('/register', regsiterPost);

router.post('/login', loginPost)

module.exports = router