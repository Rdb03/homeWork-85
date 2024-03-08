import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";


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

albumRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).send('Not found!');
        }

        await Album.findByIdAndDelete(id);
        return res.send('Deleted');
    } catch (e) {
        return res.status(500).send('error');
    }
});

albumRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).send('Not found!');
        }

        await Album.findByIdAndUpdate(id, {
            isPublished: !album.isPublished,
        });

        return res.send(album);
    } catch (e) {
        return res.status(500).send('error');
    }
});


export default albumRouter;
