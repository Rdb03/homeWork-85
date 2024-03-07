import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { store } from './store.ts';
import { ITrackHistory, TrackHistoryMutation } from '../../type';


export const postTrack = createAsyncThunk<void, TrackHistoryMutation, { state: RootState }>(
  'histories/post',
  async (track, thunkAPI) => {
    const usersState = thunkAPI.getState().users;
    const token = usersState.user?.token;

    await axiosApi.post('/track_history', track, {
      headers: {
        Authorization: token,
      },
    });
  },
);

type Store = typeof store;
type RootState = ReturnType<Store['getState']>;

export const fetchHistory = createAsyncThunk<ITrackHistory[], undefined, { state: RootState }>(
  'histories/fetchHistory',
  async (_, thunkAPI) => {
    const usersState = thunkAPI.getState().users;
    const token = usersState.user?.token;

    const response = await axiosApi.get<ITrackHistory[]>('/track_history', {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  },
);
