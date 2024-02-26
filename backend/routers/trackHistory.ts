import express from "express";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";
import Track from "../models/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');

        if (!headerValue) {
            return res.status(401).send({ error: 'No Authorization header present' });
        }

        const [_bearer, token] = headerValue.split(' ');

        if (!token) {
            return res.status(401).send({ error: 'No token present' });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        const trackID = req.body.trackID;

        const track = await Track.findById(trackID);

        if (!track) {
            return res.status(404).send({ error: 'Track not found' });
        }

        // const artist = await Artist.findOne({ name: track.artistName });
        //
        // if (!artist) {
        //     return res.status(404).send({ error: 'Artist not found' });
        // }

        //я не понял как надо сделать связь с артистом

        const trackHistory = new TrackHistory({
            trackID: req.body.trackID,
            user: user._id,
            // artist: artist._id,
        });

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (e) {
        next(e);
    }
});

export default trackHistoryRouter;