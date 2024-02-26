import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

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
