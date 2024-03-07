import {createAsyncThunk} from "@reduxjs/toolkit";
import { IAlbum, IArtist } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchArtist = createAsyncThunk<IArtist[]>(
    'artist/fetchAll',
    async () => {
        const dishesResponse = await axiosApi.get<IArtist[]>('/artist');
        return dishesResponse.data;
    }
);

export const fetchArtistName = createAsyncThunk<IAlbum, string>(
  'artists/fetchName',
  async (id: string) => {
    const response = await axiosApi.get<IAlbum>(`/albums/${id}`);
    return response.data;
  },
);
