import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../type";


const albumRouter = express.Router();

albumRouter.get('/', async (req , res) => {
    try {
        const artistId = req.query.artist as string;
        let albums;

        if (artistId) {
            albums = await Album.find({ artist: artistId });
        } else {
            albums = await Album.find();
        }

        res.send(albums);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

albumRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    try {
        const albumData: AlbumMutation = {
            name: req.body.name,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            date: req.body.date
        };

        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        next(e);
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
