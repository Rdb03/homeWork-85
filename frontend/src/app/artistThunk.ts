import {createAsyncThunk} from "@reduxjs/toolkit";
import { ArtistMutation, IAlbum, IArtist } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchArtist = createAsyncThunk<IArtist[]>(
    'artist/fetchAll',
    async () => {
        const dishesResponse = await axiosApi.get<IArtist[]>('/artist');
        return dishesResponse.data;
    }
);

export const fetchArtistName = createAsyncThunk<IAlbum, string>(
  'artist/fetchName',
  async (id: string) => {
    const response = await axiosApi.get<IAlbum>(`/albums/${id}`);
    return response.data;
  },
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artist/createArtist',
  async (artistMutation) => {
    const formData = new FormData();
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

    keys.forEach((key) => {
      const value = artistMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artist', formData);
  },
);

