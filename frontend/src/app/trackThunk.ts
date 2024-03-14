import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrack, TrackMutation } from '../../type';
import axiosApi from '../../axiosApi.ts';
import { RootState } from './store.ts';

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchTracks',
  async (id: string) => {
    const response = await axiosApi.get<ITrack[]>(`/tracks?album=${id}`);
    return response.data;
  },
);

export const createTrack = createAsyncThunk<void, { trackMutation: TrackMutation, token: string }, { state: RootState }>(
  'tracks/createTrack',
  async ({ trackMutation, token }, _thunkAPI) => {
    try {
      const response = await axiosApi.post('/tracks', trackMutation, {
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

export const patchTrack = createAsyncThunk<void, { id: string, token: string}>(
  'artists/patchArtists',
  async ({id, token}) => {
    try {
      const response = await axiosApi.patch(`/tracks/${id}/togglePublished`,  {isPublished: true},{
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

export const deleteTrack = createAsyncThunk<void, { id: string, token: string | undefined }>(
  'artists/deleteArtist',
  async ({ id, token }) => {
    try {
      const response = await axiosApi.delete(`/tracks/${id}`, {
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