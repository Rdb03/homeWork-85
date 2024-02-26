import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITrackHistory } from '../../type';
import { RootState } from './store.ts';

export const trackHistoryThunk = createAsyncThunk<void, [string, string]>(
  'trackHistory/addTrackHistory',
  async ([token, trackID]) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const requestBody = {
        trackID: trackID
      };

      const response = await axiosApi.post('/track_history', requestBody, config);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchHistory = createAsyncThunk<ITrackHistory[], undefined, { state: RootState }>(
  'trackHistory/fetchHistory',
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
