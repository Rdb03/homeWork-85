import { ITrack } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { fetchTracks } from './trackThunk.ts';

interface TracksState {
  items: ITrack[];
  fetchLoadingTracks: boolean;
}

const initialState: TracksState = {
  items: [],
  fetchLoadingTracks: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoadingTracks = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
      state.fetchLoadingTracks = false;
      state.items = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoadingTracks = false;
    });
  },
});

export const trackReducer = tracksSlice.reducer;
export const selectTrack = (state: RootState) => state.tracks.items;
export const selectTrackLoading = (state: RootState) => state.tracks.fetchLoadingTracks;
