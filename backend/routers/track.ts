import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
    try {
        const album = req.query.album as string;

        if (!album) {
            const tracks = await Track.find().populate('album', 'name');
            return res.send(tracks);
        }

        const tracks = await Track.find({
            album: { _id: album },
        })
            .sort({ number: 1 })
            .populate({
                path: 'album',
                select: 'name',
                model: 'Album',
                populate: {
                    path: 'artist',
                    select: 'name',
                    model: 'Artist',
                }
            });

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

trackRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const track = await Track.findById(id);

        if (!track) {
            return res.status(404).send('Not found!');
        }

        await Track.findByIdAndDelete(id);
        return res.send('Deleted');
    } catch (e) {
        return res.status(500).send('error');
    }
});


trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const track = await Track.findById(id);

        if (!track) {
            return res.status(404).send('Not found!');
        }

        await Track.findByIdAndUpdate(id, {
            isPublished: !track.isPublished,
        });

        return res.send(track);
    } catch (e) {
        return res.status(500).send('error');
    }
});
export default trackRouter;