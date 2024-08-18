import { C } from '../constants';
import api from '../../config/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message } from '../types';

export const fetchMessages = createAsyncThunk(C.FETCH_MESSAGES_REQUEST, async () => {
  try {
    const response = await api.get('/api/messages', {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return response.data as Message[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});

export const createMessage = createAsyncThunk(C.CREATE_MESSAGE_REQUEST, async (message: Message) => {
  try {
    const response = await api.post('/api/messages', message, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return response.data as Message;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});

export const updateMessage = createAsyncThunk(C.UPDATE_MESSAGE_REQUEST, async (message: Message) => {
  try {
    const response = await api.put(`/api/messages/${message.id}`, message, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return response.data as Message;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});

export const deleteMessage = createAsyncThunk(C.DELETE_MESSAGE_REQUEST, async (id: string) => {
  try {
    await api.delete(`/api/messages/${id}`, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return id;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});
