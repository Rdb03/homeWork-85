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