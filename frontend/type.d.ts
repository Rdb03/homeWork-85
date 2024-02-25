export interface IArtist {
    _id: string,
    name: string,
    image: string | null,
    info: string,
}

export interface IAlbum {
  _id: string,
  name: string,
  artist: IArtist,
  date: number,
  image: string | null,
}

export interface ITrack {
  _id: string,
  name: string,
  album: string,
  duration: string,
  number: number,
}

export interface RegisterMutation {
  username: string,
  password: string,
}

export interface User {
  _id: string,
  username: string,
  token: string,
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string,
      message: string,
    }
  },
  message: string,
  name: string,
  _message: string,
}

export interface RegisterResponse {
  message: string,
  user: User,
}

export interface LoginMutation {
  username: string,
  password: string,
}

