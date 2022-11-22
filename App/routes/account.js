const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const Post = require("../models/post");


router.post('/reg', (req, res)=>{
    let userNew = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
    })

    User.addUser(userNew, (err, user) => {
        if(err){
            res.json({success: false, msg: "User has not been added!"})
        }
        else{
            res.json({success: true, msg: "User has been added."})
        }
    })
})

router.post("/auth", (req, res) => {
    const login = req.body.login
    const password = req.body.password

    User.getUserByLogin(login, (err, user) => {
        if(err) throw err
        if(!user) {
            return res.json({success: false, msg: "Пользователь не найден"})
        }

        //Если пользователь найден
        User.comparePass(password, user.password, (err, isMatch) => {
            if(err) throw err
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 36000 * 24 //Время сессии пользователя
                })

                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: "Неверный пароль"})
            }
        })
    })
})


router.post('/dashboard', passport.authenticate('jwt', {session: false}), (req, res)=>{
    let postNew = new Post({
        title: req.body.title,
        category: req.body.category,
        photo: req.body.photo,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date
    })

    Post.addPost(postNew, (err, post) => {
        if(err){
            res.json({success: false, msg: "Post has not been added!"})
        }
        else{
            res.json({success: true, msg: "Post has been added."})
        }
    })
});

module.exports = router;