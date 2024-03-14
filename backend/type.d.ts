import {Model} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    token: string;
    role: string;
}

export interface UserFields {
    email: string,
    password: string,
    token: string,
    role: string,
    displayName: string;
    googleID?: string;
    image: string | null;
}

export interface ITrackHistory {
    user: string;
    trackID: string;
    artist: string,
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

