import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrack } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchTrack = createAsyncThunk<ITrack[] | undefined, string | undefined>(
  'album/fetchAll',
  async (albumId) => {
    try {
      const response = await axiosApi.get<ITrack[]>(`/tracks/${albumId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchTrackByAlbumId = createAsyncThunk<ITrack[] | undefined, string | undefined>(
  'album/fetchTrackByAlbumId',
  async (albumId) => {
    try {
      const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);