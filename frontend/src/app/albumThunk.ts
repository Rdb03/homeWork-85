import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlbumMutation, IAlbum } from '../../type';
import axiosApi from '../../axiosApi.ts';
import { RootState } from './store.ts';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAlbums',
  async (id: string) => {
    const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${id}`);
    return response.data;
  },
);

export const fetchAllAlbums = createAsyncThunk<IAlbum[]>('albums/fetchAllAlbums', async () => {
  const response = await axiosApi.get<IAlbum[]>('albums');
  return response.data;
});

export const createAlbum = createAsyncThunk<void, {albumMutation: AlbumMutation, token: string}, {state: RootState}>(
  'artist/createArtist',
  async ({albumMutation, token}, _thunkAPI) => {
    try {
      const response = await axiosApi.post('/albums', albumMutation, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating track:', error);
      throw error;
    }
  },
);

export const patchAlbum = createAsyncThunk<void, { id: string, token: string}>(
  'artists/patchArtists',
  async ({id, token}) => {
    try {
      const response = await axiosApi.patch(`/albums/${id}/togglePublished`,  {isPublished: true},{
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error deleting artist:', error);
      throw error;
    }
  });

export const deleteAlbum = createAsyncThunk<void, { id: string, token: string | undefined }>(
  'artists/deleteArtist',
  async ({ id, token }) => {
    try {
      const response = await axiosApi.delete(`/albums/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error deleting artist:', error);
      throw error;
    }
  }
);