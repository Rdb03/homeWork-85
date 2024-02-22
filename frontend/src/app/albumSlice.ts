import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IAlbum } from '../../type';
import { fetchAlbum, fetchAlbumById } from './albumThunk.ts';

interface AlbumState {
  items: IAlbum[] | undefined;
  album: IAlbum | undefined;
  fetchLoading: boolean;
}

const initialState: AlbumState = {
  items: [],
  album: undefined,
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
    builder.addCase(fetchAlbum.fulfilled, (state, {payload: albums}) => {
      state.fetchLoading = false;
      state.items = albums;
    });
    builder.addCase(fetchAlbumById.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbumById.fulfilled, (state, { payload: album }) => {
      state.fetchLoading = false;
      state.album = album;
    });
  },
});

export const albumReducer = albumSlice.reducer;
export const selectAlbums = (state: RootState) => state.album.items;
export const selectAlbum = (state: RootState) => state.album.album;


