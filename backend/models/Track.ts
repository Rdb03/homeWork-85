import mongoose, {model, Schema, Types} from "mongoose";
import Album from "./Album";

const TrackSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
   },
   album: {
       type: Schema.Types.ObjectId,
       required: true,
       validate: {
           validator: async (value: Types.ObjectId) => {
               const album = await Album.findById(value);
               return Boolean(album);
           },
           message: 'Track does not exist!',
       }
   },
    duration: String
});


const Track = model('Track', TrackSchema);

export default Track;