import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IAlbum } from '../../type';
import { fetchAlbums, fetchAllAlbums } from './albumThunk.ts';

interface AlbumState {
  items: IAlbum[];
  fetchLoadingAlbums: boolean;
}

const initialState: AlbumState = {
  items: [],
  fetchLoadingAlbums: false,
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoadingAlbums = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
      state.fetchLoadingAlbums = false;
      state.items = albums;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoadingAlbums = false;
    });

    builder.addCase(fetchAllAlbums.pending, (state) => {
      state.fetchLoadingAlbums = true;
    });
    builder.addCase(fetchAllAlbums.fulfilled, (state, { payload: albums }) => {
      state.fetchLoadingAlbums = false;
      state.items = albums;
    });
    builder.addCase(fetchAllAlbums.rejected, (state) => {
      state.fetchLoadingAlbums = false;
    });
  },
});

export const albumReducer = albumSlice.reducer;
export const selectAlbums = (state: RootState) => state.album.items;
export const selectAlbumsLoading = (state: RootState) => state.album.fetchLoadingAlbums;


