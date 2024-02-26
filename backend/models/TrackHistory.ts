import mongoose, {model} from "mongoose";
import User from "./User";
import Track from "./Track";
import {ITrackHistory} from "../type";
import Artist from "./Artist";

const TrackHistorySchema = new mongoose.Schema({
    track: {
        type: mongoose.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Track.findById(value),
            message: 'Track does not exist!',
        },
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'User does not exist!',
        },
    },
    trackName: String,
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Artist.findById(value),
            message: 'Artist does not exist!',
        },
    },
    date: {
        type: String,
        required: true,
    },
});


const TrackHistory = model<ITrackHistory>('TrackHistory', TrackHistorySchema);

export default TrackHistory;