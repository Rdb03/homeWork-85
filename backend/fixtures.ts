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
            displayName: 'User',
            role: 'user',
            image: null,
        }, {
            username: 'user2',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'User',
            role: 'user',
            image: null,
        }, {
            username: 'admin1',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'Admin',
            role: 'admin',
            image: null,
        }, {
            username: 'admin2',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'Admin',
            role: 'admin',
            image: null,
        },
    );

    const [macan, xxxtentacion, basta] = await Artist.create(
        {
            name: 'Macan',
            info: 'хип-хоп',
            image: 'images/aab5a1b8-2de8-4b62-a218-887be8760f8d.png',
            isPublished: true,
        }, {
            name: 'XXXTentacion',
            info: 'хип-хоп/рэп',
            image: 'images/62877.jpg',
            isPublished: true,
        },  {
            name: 'Баста',
            info: 'хип-хоп/рэп',
            image: 'images/basta.jpg',
            isPublished: false,
        },
    );

    const [album1000, album12, revenge, skins, basta3] = await Album.create(
        {
            name: '1000 киллометров до мечты',
            artist: macan._id,
            date: 2019,
            image: 'images/3fb1ce27-4874-4d55-a884-b3cb9fdc30ab.jpeg',
            isPublished: true,
        }, {
            name: '12',
            artist: macan._id,
            date: 2022,
            image: 'images/5777b51a393fb3b14f7a134a4bc1c6ca.1000x1000x1.png',
            isPublished: true,
        }, {
            name: 'Revenge',
            artist: xxxtentacion._id,
            date: 2017,
            image: 'images/350x350.jpg',
            isPublished: true,
        }, {
            name: 'Skins',
            artist: xxxtentacion._id,
            date: 2018,
            image:'images/42314132skins.png',
            isPublished: true,
        }, {
            name: 'Баста 3',
            artist: basta._id,
            date: 2016,
            image: 'images/basta3.jpg',
            isPublished: false,
        },
    );


    await Track.create(
        {
            name: 'Бенз',
            album: album1000._id,
            duration: '2:09',
            number: 1,
            isPublished: true,
        }, {
            name: 'Веселящий газ',
            album: album1000._id,
            duration: '2:58',
            number: 2,
            isPublished: true,
        }, {
            name: 'Холодно',
            album: album1000._id,
            duration: '3:07',
            number: 3,
            isPublished: true,
        }, {
            name: '1000 км',
            album: album1000._id,
            duration: '2:39',
            number: 4,
            isPublished: true,
        }, {
            name: 'Кино 2',
            album: album12._id,
            duration: '2:51',
            number: 1,
            isPublished: true,
        }, {
            name: 'Биография',
            album: album12._id,
            duration: '2:01',
            number: 2,
            isPublished: true,
        }, {
            name: 'Временно',
            album: album12._id,
            duration: '2:52',
            number: 3,
            isPublished: true,
        },  {
            name: 'Помни',
            album: album12._id,
            duration: '2:49',
            number: 4,
            isPublished: true,
        }, {
            name: 'Look At Me!',
            album: revenge._id,
            duration: '2:06',
            number: 1,
            isPublished: true,
        }, {
            name: 'King',
            album: revenge._id,
            duration: '1:53',
            number: 2,
            isPublished: true,
        }, {
            name: 'Looking for a Star',
            album: revenge._id,
            duration: '2:17',
            number: 3,
            isPublished: true,
        },  {
            name: 'Slipknot',
            album: revenge._id,
            duration: '3:29',
            number: 4,
            isPublished: true,
        },  {
            name: 'BAD!',
            album: skins._id,
            duration: '1:34',
            number: 1,
            isPublished: true,
        },  {
            name: 'One Minute',
            album: skins._id,
            duration: '3:18',
            number: 2,
            isPublished: true,
        },  {
            name: 'Guardian angel',
            album: skins._id,
            duration: '1:48',
            number: 3,
            isPublished: true,
        }, {
            name: 'Train food',
            album: skins._id,
            duration: '2:44',
            number: 4,
            isPublished: true,
        },{
            album: basta3._id,
            name: 'Урбан',
            duration: '4:12',
            number: 1,
            isPublished: false,
        }, {
            album: basta3._id,
            name: 'Деньги',
            duration: '3:19',
            number: 2,
            isPublished: false,
        }, {
            album: basta3._id,
            name: 'Олимпиада 80',
            duration: '5:09',
            number: 3,
            isPublished: false,
        },
    );

    await db.close();
};

void run();