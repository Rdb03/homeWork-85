import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth from "../middleware/auth";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
    try {
        const album = req.query.album as string;

        if (!album) {
            const tracks = await Track.find({ isPublished: true }).populate('album', 'name');
            return res.send(tracks);
        }

        const tracks = await Track.find({
            album: { _id: album },
            isPublished: true,
        })
            .sort({ number: 1 })
            .populate('album', 'name');

        return res.send(tracks);
    } catch {
        return res.sendStatus(500);
    }
});

trackRouter.post('/', auth, async (req, res, next) => {
    try {
        const trackData = new Track({
            name: req.body.name,
            duration: req.body.duration,
            album: req.body.album,
            number: req.body.number,
        });

        await trackData.save();

        return res.send(trackData);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

export default trackRouter;