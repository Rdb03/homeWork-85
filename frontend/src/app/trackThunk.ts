import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrack } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchTracks',
  async (id: string) => {
    const response = await axiosApi.get<ITrack[]>(`/tracks?album=${id}`);
    return response.data;
  },
);

