import {createAsyncThunk} from "@reduxjs/toolkit";
import { IArtist } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchArtist = createAsyncThunk<IArtist[]>(
    'artist/fetchAll',
    async () => {
        const dishesResponse = await axiosApi.get<IArtist[]>('/artist');
        return dishesResponse.data;
    }
);

export const fetchArtistById = createAsyncThunk<IArtist, string | undefined>(
  'artist/fetchById',
  async (artistId) => {
    const response = await axiosApi.get<IArtist>(`/artist/${artistId}`);
    return response.data;
  }
);
