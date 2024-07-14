const express = require('express');
const jwt = require('jsonwebtoken');
const handler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const router = express.Router();

const issign = (req,res,next)=>{
    const token = req.cookies['token'];
    if(!token){
        next();
    }
    else{
        res.send("already logged in");
    }
}

router.post('/signin',issign,(handler(async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username});

    if(user && await bcrypt.compare(password,user.password)){
        const token = jwt.sign({
            user : {
                user
            }
        },"alpha");
        res.cookie('token',token);
        res.send(token);
    }
    else{
        res.json({
            msg : "No user Found"
        });
    }
})))

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.send("Logged Out Successfully");
})

router.post('/',issign,handler(async (req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.find({username});
    if(user.length>0){
        res.json({User : "Already Exists with this username"});
    }
    else{
        const user = await userModel.create({
            username,
            password : await bcrypt.hash(password,10)
        })
        res.send(user);
    }
}))


module.exports = router;