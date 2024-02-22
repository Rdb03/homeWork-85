import express from "express";
import {imagesUpload} from "../multer";
import {TrackMutation} from "../type";
import Track from "../models/Track";
import Album from "../models/Album";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
    try {
        const artistId = req.query.artist as string;

        if (artistId) {
            const albums = await Album.find({ artist: artistId });
            const albumIds = albums.map(album => album._id);
            const tracks = await Track.find({ album: albumIds });
            res.send(tracks);
        } else {
            const tracks = await Track.find();
            res.send(tracks);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

trackRouter.get('/:albumId', async (req, res) => {
    try {
        const albumId = req.params.albumId;

        const tracks = await Track.find({ album: albumId });

        res.send(tracks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

trackRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const existingTrack = await Track.findOne({ number: req.body.number, album: req.body.album });

        if (existingTrack) {
            return res.status(400).json({ error: 'Трек с указанным номером уже существует в этом альбоме.' });
        }

        const albumData: TrackMutation = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            number: req.body.number
        };

        const track = new Track(albumData);
        await track.save();

        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default trackRouter;