const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const BadRequest = require('../error/bad-request');
const Unauthenticated = require('../error/unauthenticated');

const authUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
                                .select('-password');

        if(!user) {
            return res.status(400).json({message: 'user not found'});
        }

        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const register = async (req, res) => {
    try {
        // console.log(req.body);

        const { username, password, email } = req.body;

        if(!username || !password || !email) {
            // throw new BadRequest('Please provide username, email, password');
            return res.status(401).json({message: 'Please provide username, email, password'})
        }

        // check user exists
        const checkUserExists = await User.findOne({username});
        if(checkUserExists) {
            return res.status(400).json({message: 'User is exists!!!'});
        }

        // hashpassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const tempUser = {
            username,
            email,
            password: hashedPassword
        }

        const user = await User.create({...tempUser});

        // sign jwt
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.status(StatusCodes.CREATED)
            .json({
                user: {
                    userId: user._id,
                    username: user.username
                },
                token
            })

    } catch (error) {
        console.log(error);
        // return res.status(500).send('Internal server error!');
        return res.status(500).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            throw new BadRequest('please provide username, password');
        }

        const user = await User.findOne({username});

        if(!user) {
            // throw new Unauthenticated('Invalid credentials');
            return res.status(401).json({message: 'Invalid credentials'})
        }

        // compare password
        const isCorrectPassword = 
            await bcrypt.compare(password, user.password);
        
        if(!isCorrectPassword) {
            // throw new Unauthenticated('Invalid creadentials');
            return res.status(401).json({message: 'Invalid credentials'})
        }

        // create token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        return res.status(200)
            .json({
                user: {
                    userId: user._id,
                    username: user.username
                },
                token
            })
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal sever error!');
    }
}

module.exports = {
    authUser,
    register, 
    login
}