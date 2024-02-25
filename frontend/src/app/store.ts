import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from "./artistSlice";
import { albumReducer } from './albumSlice.ts';
import { trackReducer } from './trackSlice.ts';
import { usersReducer } from './usersSlice.ts';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;