import { GlobalError, User, ValidationError } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { login, register } from './usersThunk.ts';

interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: data}) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error|| null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = false;
      state.registerError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: data}) => {
      state.loginLoading = true;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError