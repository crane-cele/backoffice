import { C } from '../constants';
import api from '../../config/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(C.LOGIN_REQUEST, async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      return rejectWithValue('An unknown error occurred.');
    }
  }
});

export const register = createAsyncThunk(C.REGISTER_REQUEST, async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/auth/register', credentials);
    return response.data.message;
  } catch (err) {
    if ( err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      return rejectWithValue('An unknown error occurred.');
    }
  }
});

export const logout = () => {
  localStorage.removeItem('token');
  return { type: C.LOGOUT };
};
