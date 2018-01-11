const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        favorites: []
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:'Ошибка при регистрации'});
        } else {
            res.json({success: true, msg:'Пользователь зарегистрирован'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        
        if(!user) {
            return res.json({success: false, msg: 'Пользователь не найден'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Неверный пароль'});
            }
        });

    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// AddFavorite
router.put('/addFavorite', (req, res, next) => {
    const product = req.body.product,
    id = req.body.user.id;
    let list = new Array(),
    isExist = false;

    User.findById(id, (err, user) => {
        list = user.favorites;

        for(let i = 0; i < list.length; i++) {
           if(list[i]._id === product._id) {
                isExist = true;
                break;
           }
        }

        if(!isExist) {
            list.push(product);
            user.save((err, result) => {
                if(err) throw err;
            });
        }
        
        if(err) throw err;
        res.json(isExist);
        
    });
});

// Remove Favorite
router.put('/removeFavorite', (req, res, next) => {
    const product = req.body.product;
    const id = req.body.user.id;
    let list = new Array();

    User.findById(id, (err, user) => {
        list = user.favorites;
        for(let i = 0; i < list.length; i++) {
            if (list[i]._id === product._id) {
                list.splice(i, 1);
                user.save((err, result) => {
                    if(err) throw(err);
                    res.json(list);
                });
            }
        }
    });
});

module.exports = router;