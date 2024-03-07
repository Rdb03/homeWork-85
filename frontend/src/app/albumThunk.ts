import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbum } from '../../type';
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
    const response = await axiosApi.get<IAlbum>(`/albums/${albumId}`);
    return response.data;
  }
);

export const fetchAllAlbums = createAsyncThunk<IAlbum[]>('albums/fetchAllAlbums', async () => {
  const response = await axiosApi.get<IAlbum[]>('albums');
  return response.data;
});