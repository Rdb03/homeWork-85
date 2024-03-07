import { createSlice } from '@reduxjs/toolkit';
import { fetchArtist, fetchArtistName } from './artistThunk';
import { RootState } from './store';
import { IArtist } from '../../type';

interface ArtistState {
    items: IArtist[];
    artist: IArtist | null;
    fetchLoading: boolean;
    artistName: string;
}

const initialState: ArtistState = {
  items: [],
  artist: null,
  fetchLoading: false,
  artistName: '',
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
     builder.addCase(fetchArtist.rejected, (state) => {
       state.fetchLoading = false;
     });
     builder.addCase(fetchArtistName.pending, (state) => {
       state.fetchLoading = true;
     });
     builder.addCase(fetchArtistName.fulfilled, (state, { payload: info }) => {
       state.fetchLoading = false;
       state.artistName = info.artist.name;
     });
     builder.addCase(fetchArtistName.rejected, (state) => {
       state.fetchLoading = false;
     });
   },
});

export const artistReducer = artistSlice.reducer;
export const selectArtists = (state: RootState) => state.artist.items;
export const selectArtistName = (state: RootState) => state.artist.artistName;
export const selectArtist = (state: RootState) => state.artist.artist;
