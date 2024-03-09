import {createAsyncThunk} from "@reduxjs/toolkit";
import { ArtistMutation, IAlbum, IArtist } from '../../type';
import axiosApi from '../../axiosApi.ts';
import { RootState } from './store.ts';

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

export const createArtist = createAsyncThunk<void, {artistMutation: ArtistMutation, token: string}, {state: RootState}>(
  'artist/createArtist',
  async ({artistMutation, token}, _thunkAPI) => {
    try {
      const response = await axiosApi.post('/artist', artistMutation, {
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

export const deleteArtist = createAsyncThunk<void, { id: string, token: string | undefined }>(
  'artists/deleteArtist',
  async ({ id, token }) => {
    try {
      const response = await axiosApi.delete(`/artist/${id}`, {
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

export const patchArtists = createAsyncThunk<void, { id: string, token: string}>(
  'artists/patchArtists',
  async ({id, token}) => {
    try {
      console.log(token);
      const response = await axiosApi.patch(`/artist/${id}/togglePublished`,  {isPublished: true},{
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



