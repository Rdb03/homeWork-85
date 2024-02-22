import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbum } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbum = createAsyncThunk<IAlbum[] | undefined, string | undefined>(
  'album/fetchAll',
  async (artistId) => {
    try {
      const response = await axiosApi.get<IAlbum[]>('/albums', {
        params: { artist: artistId },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchAlbumById = createAsyncThunk<IAlbum, string | undefined>(
  'album/fetchById',
  async (albumId) => {
    const response = await axiosApi.get<IAlbum>(`/albums/${albumId}`);
    return response.data;
  }
);