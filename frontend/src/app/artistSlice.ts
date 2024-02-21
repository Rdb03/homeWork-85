import {createSlice} from "@reduxjs/toolkit";
import {fetchArtist} from "./artistThunk";
import {RootState} from "./store";
import { IArtist } from '../../type';

interface ArtistState {
    items: IArtist[];
    fetchLoading: boolean;
}

const initialState: ArtistState = {
  items: [],
  fetchLoading: false,
};

export const artistSlice = createSlice({
   name: 'artist',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
       builder.addCase(fetchArtist.pending, (state) => {
           state.fetchLoading = true;
       });
       builder.addCase(fetchArtist.fulfilled, (state, {payload: artists}) => {
           state.fetchLoading = false;
           state.items = artists;
       });
   },
});

export const artistReducer = artistSlice.reducer;
export const selectArtist = (state: RootState) => state.artist.items;
export const selectArtistLoading = (state: RootState) => state.artist.fetchLoading;

