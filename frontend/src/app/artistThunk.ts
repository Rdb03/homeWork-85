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