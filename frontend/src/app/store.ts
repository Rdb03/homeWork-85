import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {artistReducer} from "./artistSlice";
import { albumReducer } from './albumSlice.ts';
import { trackReducer } from './trackSlice.ts';
import { usersReducer } from './usersSlice.ts';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { trackHistoryReducer } from './trackHistorySlice.ts';


const userPersistConfig = {
  key: 'spotybi:users',
  storage: storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  artist: artistReducer,
  album: albumReducer,
  tracks: trackReducer,
  histories: trackHistoryReducer,
  users: persistReducer(userPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persist = persistStore(store);
