export interface IArtist {
    _id: string,
    name: string,
    image: string | null,
    info: string,
}

export interface IAlbum {
  _id: string,
  name: string,
  artist: string,
  date: number,
  image: string | null,
}