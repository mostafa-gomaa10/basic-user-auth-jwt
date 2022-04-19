const router = require('express').Router();
const { checkAuth } = require('../middlware/auth');


router.get('/', checkAuth, (req, res) => {
    res.json({ posts: 'you are permitted' });
})

module.exports = router