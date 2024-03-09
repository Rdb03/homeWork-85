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

export const patchTracks = createAsyncThunk<void, string>('tracks/patchTracks', async (id) => {
  await axiosApi.patch(`/tracks/${id}/togglePublished`);
});

export const deleteTrack = createAsyncThunk<void, string>('tracks/deleteTrack', async (id) => {
  await axiosApi.delete(`/tracks/${id}`);
});
