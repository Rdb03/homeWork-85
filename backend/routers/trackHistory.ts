import express from 'express';
import TrackHistory from '../models/TrackHistory';
import { Error } from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import Artist from '../models/Artist';
import auth, {RequestWithUser} from "../middleware/auth";
import dayjs from "dayjs";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const track = await Track.findOne({ _id: req.body.track });

        if (track) {
            const album = await Album.findOne({ _id: track.album });

            if (album) {
                const artist = await Artist.findOne({ _id: album.artist });

                if (artist) {
                    const trackHistory = new TrackHistory({
                        user: user.id,
                        track: req.body.track,
                        trackName: track.name,
                        artist: artist._id,
                        date: dayjs(new Date().toISOString()).format('DD.MM.YYYY HH:mm'),
                    });

                    await trackHistory.save();
                    return res.send(trackHistory);
                }
            }
        }

        if (!track) {
            return res.status(404).send({ error: 'Track is undefined!' });
        }
    } catch (e) {
        if (e instanceof Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

trackHistoryRouter.get('/', auth, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;

        const tracks = await TrackHistory.find({ user: user._id })
            .sort({ date: -1 })
            .populate('artist', 'name');
        return res.send(tracks);
    } catch {
        return res.sendStatus(500);
    }
});

export default trackHistoryRouter;
