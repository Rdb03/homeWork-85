import {Model, Types} from "mongoose";

export interface ArtistMutation {
    name: string,
    image: string | null,
    info: string,
}

export interface AlbumMutation {
    name: string,
    artist: string,
    date: string,
    image: string | null,
}

export interface TrackMutation {
    name: string,
    album: string,
    duration: string,
}

export interface UserFields {
    username: string,
    password: string,
    token: string,
}

export interface ITrackHistory {
    user: string;
    trackID: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;