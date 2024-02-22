import { ITrack } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrack } from './trackThunk.ts';
import { RootState } from './store.ts';

interface TrackState {
  items: ITrack[] | undefined,
  fetchLoading: boolean,
}

const initialState: TrackState = {
  items: [],
  fetchLoading: false,
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrack.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrack.fulfilled, (state, {payload: album}) => {
      state.fetchLoading = false;
      state.items = album;
    });
  },
});

export const trackReducer = trackSlice.reducer;
export const selectTrack = (state: RootState) => state.track.items;