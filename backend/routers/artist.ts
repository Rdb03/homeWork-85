import express from 'express';
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistRouter = express.Router();

artistRouter.get('/', async (_req , res, next) => {
   try {
    const artist = await Artist.find();
    return res.send(artist);
   } catch (e) {
       next(e);
   }
});

artistRouter.get('/:id', async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({ error: 'Artist not found' });
        }

        return res.send(artist);
    } catch (e) {
        next(e);
    }
});

artistRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artistData = new Artist({
            name: req.body.name,
            info: req.body.info,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await artistData.save();

        return res.send(artistData);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

artistRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).send('Not found!');
        }

        await Artist.findByIdAndDelete(id);
        return res.send('Deleted');
    } catch (e) {
        return res.status(500).send('error');
    }
});

artistRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).send('Not found!');
        }

        await Artist.findByIdAndUpdate(id, {
            isPublished: req.body.isPublished,
        });

        return res.send(artist);
    } catch (e) {
        return res.status(500).send('error');
    }
});

export default artistRouter;