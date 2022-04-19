const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');



// helper functions
// time in seconds
const maxLifeToken = 2 * 24 * 60 * 60

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: '20s' });
}
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '2m' });
}


const regsiterPost = async (req, res) => {
    const validation = registerValidation(req.body);

    if (validation.error) {
        return res.status(400).json({ error: validation.error.details[0].message })
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ error: 'Email Already Registered' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    try {
        const savedUser = await user.save();
        if (savedUser) {
            res.status(201).json({
                success: 'user created',
                user: { id: user._id, name: user.name, email: user.email }
            })
        }
    } catch (error) {
        res.status(400).json({
            error: {
                email: error.errors.email,
                name: error.errors.name,
                password: error.errors.password,
            }
        });
    }
}


const loginPost = async (req, res) => {
    const validation = loginValidation(req.body);

    if (validation.error) {
        return res.status(400).json({ error: validation.error.details[0].message })
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ error: 'Email Is Wrong' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).json({ error: 'Password Is Wrong' })
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
        success: 'login success',
        user: { id: user._id, name: user.name, email: user.email },
        accessToken: accessToken,
        refreshToken: refreshToken,
    })
}


module.exports = {
    regsiterPost,
    loginPost
}