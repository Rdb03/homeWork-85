import User from "../models/User";
import express from "express";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    try {
        const headerValue= req.get('Authorization');

        if(!headerValue) {
            return res.status(401).send({error: 'No Authorization header present'});
        }

        const [_bearer, token] = headerValue.split(' ');

        if(!token) {
            return res.status(401).send({error: 'No token present'});
        }

        const user = await User.findOne({token});

        if(!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }

       const trackHistory = new TrackHistory({
            trackID: req.body.trackID,
            user: user._id,
       });

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (e) {
        next(e);
    }
});

export default trackHistoryRouter;