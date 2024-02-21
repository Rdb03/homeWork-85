import mongoose, {model, Types} from "mongoose";
import User from "./User";
import Track from "./Track";
import {ITrackHistory} from "../type";

const Schema = mongoose.Schema;

const TrackHistorySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        }
    },
    trackID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Track',
        validate: {
            validator: async (value: Types.ObjectId) => {
                const track = await Track.findById(value);
                return Boolean(track);
            },
            message: 'Track does not exist!',
        }
    },
    datetime: {
        type: Date,
        default: () => new Date(),
    }
});


const TrackHistory = model<ITrackHistory>('TrackHistory', TrackHistorySchema);

export default TrackHistory;