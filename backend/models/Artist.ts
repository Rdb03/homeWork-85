import * as mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: String,
    info: String,
    isPublished: {
        required: true,
        type: Boolean,
        default: false,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;