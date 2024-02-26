import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import crypto from "crypto";
import User from "./models/User";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['artists', 'tracks', 'albums', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    await User.create(
        {
            username: 'user1',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'User1',
            role: 'user',
        }, {
            username: 'user2',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'User2',
            role: 'user',
        }, {
            username: 'admin1',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'Admin1',
            role: 'admin',
        }, {
            username: 'admin2',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'Admin2',
            role: 'admin',
        },
    );

    const macan = await Artist.create({
        name: 'MACAN',
        image: 'images/aab5a1b8-2de8-4b62-a218-887be8760f8d.png',
        info: '2002 - П. в.',
    });

    const xxxtentacion = await Artist.create({
        name: 'XXXTENTACION',
        image: 'images/62877.jpg',
        info: '1998 - 2018',
    });

    const album1000 = await Album.create({
        name: '1000 киллометров до мечты',
        artist: macan._id,
        date: '2019',
        image: 'images/3fb1ce27-4874-4d55-a884-b3cb9fdc30ab.jpeg',
    });

    const album12 = await Album.create({
        name: '12',
        artist: macan._id,
        date: '2022',
        image: 'images/5777b51a393fb3b14f7a134a4bc1c6ca.1000x1000x1.png',
    });

    const albumRevenge = await Album.create({
        name: 'Revenge',
        artist: xxxtentacion._id,
        date: '2017',
        image: 'images/350x350.jpg',
    });

    const albumSkins = await Album.create({
        name: 'Skins',
        artist: xxxtentacion._id,
        date: '2018',
        image:'images/42314132skins.png'
    });

    await Track.create(
        {
            name: 'Бенз',
            album: album1000._id,
            duration: '2:09',
            number: 1
         }, {
            name: 'Веселящий газ',
            album: album1000._id,
            duration: '2:58',
            number: 2
        }, {
            name: 'Холодно',
            album: album1000._id,
            duration: '3:07',
            number: 3
        }, {
            name: '1000 км',
            album: album1000._id,
            duration: '2:39',
            number: 4
        }, {
            name: 'Кино 2',
            album: album12._id,
            duration: '2:51',
            number: 1
        }, {
            name: 'Биография',
            album: album12._id,
            duration: '2:01',
            number: 2
        }, {
            name: 'Временно',
            album: album12._id,
            duration: '2:52',
            number: 3
        },  {
            name: 'Помни',
            album: album12._id,
            duration: '2:49',
            number: 4
        }, {
            name: 'Look At Me!',
            album: albumRevenge._id,
            duration: '2:06',
            number: 1
        }, {
            name: 'King',
            album: albumRevenge._id,
            duration: '1:53',
            number: 2,
        }, {
            name: 'Looking for a Star',
            album: albumRevenge._id,
            duration: '2:17',
            number: 3,
        },  {
            name: 'Slipknot',
            album: albumRevenge._id,
            duration: '3:29',
            number: 4,
        },  {
            name: 'BAD!',
            album: albumSkins._id,
            duration: '1:34',
            number: 1,
        },  {
            name: 'One Minute',
            album: albumSkins._id,
            duration: '3:18',
            number: 2,
        },  {
            name: 'Guardian angel',
            album: albumSkins._id,
            duration: '1:48',
            number: 3,
        }, {
            name: 'Train food',
            album: albumSkins._id,
            duration: '2:44',
            number: 4,
        }
    );

    await db.close();
};

void run();