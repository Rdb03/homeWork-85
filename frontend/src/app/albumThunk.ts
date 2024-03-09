import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlbumMutation, IAlbum } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAlbums',
  async (id: string) => {
    const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${id}`);
    return response.data;
  },
);

export const fetchAlbumById = createAsyncThunk<IAlbum, string | undefined>(
  'album/fetchById',
  async (albumId) => {
    console.log('dsfnsjnf')
    const response = await axiosApi.get<IAlbum>(`/albums/${albumId}`);
    return response.data;
  }
);

export const fetchAllAlbums = createAsyncThunk<IAlbum[]>('albums/fetchAllAlbums', async () => {
  const response = await axiosApi.get<IAlbum[]>('albums');
  return response.data;
});

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'albums/createAlbum',
  async (albumMutation) => {
    const formData = new FormData();
    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = albumMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/albums', formData);
  },
);