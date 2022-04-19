const router = require('express').Router();
const { regsiterPost, loginPost, refToken, logoutPost } = require('../controllers/authController');


router.post('/register', regsiterPost);

router.post('/login', loginPost)
router.post('/refresh-token', refToken)
router.post('/logout', logoutPost)

module.exports = router