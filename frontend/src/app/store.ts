import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from "./artistSlice";
import { albumReducer } from './albumSlice.ts';
import { trackReducer } from './trackSlice.ts';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;