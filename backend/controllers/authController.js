const { Router } = require('express');
const router = Router();
const { body, validationResult  } = require('express-validator');

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('./verifyToken')

// *******************   SIGNUP   ******************* \\

router.post('/signup', 
    body('email', 'email is required').notEmpty().isEmail(), 
    body('password', 'password is required').notEmpty(), async (req, res, next) => {

    const { username, email, password } = req.body;
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User ({
        username,
        email,
        password
    });


    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
    })

    res.json({auth: true, token})
});

// *******************   SIGNUP   ******************* \\


router.get('/me', verifyToken, async (req, res, next) => {

    const user = await User.findById(req.userId, { password: 0, __v: 0});
    if (!user) {
        return res.status(404).send('User not found')
    }

    res.json(user);
});



// *******************   SIGNIN   ******************* \\

router.post('/signin', async (req, res, next) => {
   
    const { email, password } = req.body;

    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(404).json("The email doesn't exists")
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        return res.status(401).json({
            auth: false,
            token: null
        });
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token});
});

// *******************   SIGNIN   ******************* \\


module.exports = router;