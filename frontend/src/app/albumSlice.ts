import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IAlbum } from '../../type';
import { fetchAlbum } from './albumThunk.ts';

interface AlbumState {
  items: IAlbum[] | undefined;
  fetchLoading: boolean;
}

const initialState: AlbumState = {
  items: [],
  fetchLoading: false,
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, {payload: album}) => {
      state.fetchLoading = false;
      state.items = album;
    });
  },
});

export const albumReducer = albumSlice.reducer;
export const selectAlbum = (state: RootState) => state.album.items;
export const selectArtistLoading = (state: RootState) => state.album.fetchLoading;

