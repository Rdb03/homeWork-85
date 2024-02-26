import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../type";
import mongoose from "mongoose";
import auth from "../middleware/auth";


const albumRouter = express.Router();

albumRouter.get('/', async (req, res) => {
    try {
        const artist = req.query.artist as string;

        if (!artist) {
            const albums = await Album.find({ isPublished: true }).populate('artist', 'name');
            return res.send(albums);
        }

        const albums = await Album.find({ artist: { _id: artist }, isPublished: true })
            .sort({ date: -1 })
            .populate('artist', 'name');

        return res.send(albums);
    } catch {
        return res.sendStatus(500);
    }
});

albumRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumData = new Album({
            name: req.body.name,
            date: req.body.date,
            artist: req.body.artist,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await albumData.save();

        return res.send(albumData);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

albumRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist', 'name info');

        if (!album) {
            return res.status(404).json({ error: 'Album not found' });
        }

        res.send(album);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default albumRouter;
