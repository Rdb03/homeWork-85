import express from 'express';
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../type";

const artistRouter = express.Router();

artistRouter.get('/', async (_req , res, next) => {
   try {
    const artist = await Artist.find();
    return res.send(artist);
   } catch (e) {
       next(e);
   }
});

artistRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
   try {
       const artistData: ArtistMutation = {
         name: req.body.name,
           image: req.file ? req.file.filename : null,
         info: req.body.info,
       };

       const artist = new Artist(artistData);
       await artist.save();

       res.send(artist);
   } catch (e) {
       next(e);
   }
});

export default artistRouter;