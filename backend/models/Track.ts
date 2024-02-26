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
    duration: String,
    number: {
       type: Number,
        required: true,
    },
    isPublished: {
        required: true,
        type: Boolean,
        default: false,
    }
});


const Track = model('Track', TrackSchema);

export default Track;