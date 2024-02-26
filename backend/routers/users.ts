import express from "express";
import User from "../models/User";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post('/', async(req, res, next) => {
   try {
       const user = new User({
           username: req.body.username,
           password: req.body.password,
       });

       user.generateToken();
       await user.save();
       return res.send({message: 'ok!', user});
   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError ) {
           return res.status(422).send(e);
       }
       next(e);
   }
});

userRouter.post('/sessions', async (req, res, next) => {
   try {
       const user = await User.findOne({username: req.body.username});

       if(!user) {
           return res.status(422).send({error: 'Username not found!'});
       }

       const isMatch = await user.checkPassword(req.body.password);

       if(!isMatch) {
           return res.status(422).send({error: 'Password is wrong!'});
       }

       user.generateToken();
       await user.save();

       return res.send({message: 'Username and password are correct!', user});
   } catch (e) {
       next(e);
   }
});

userRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'Success'};

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        user.save();

        return res.send(success);
    } catch (e) {
        return next(e);
    }
});


export default userRouter;