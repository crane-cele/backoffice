import { C } from '../constants';
import api from '../../config/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Segment } from '../types';

export const fetchSegments = createAsyncThunk(C.FETCH_SEGMENTS_REQUEST, async () => {
  try {
    const response = await api.get('/api/segments', {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return response.data as Segment[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});

export const createSegment = createAsyncThunk(C.CREATE_SEGMENT_REQUEST, async (segment: Segment) => {
  try {
    const response = await api.post('/api/segments', segment, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return response.data as Segment;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});

export const updateSegment = createAsyncThunk(C.UPDATE_SEGMENT_REQUEST, async (segment: Segment) => {
  try {
    const response = await api.put(`/api/segments/${segment.id}`, segment, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
    return response.data as Segment;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
});

export const deleteSegment = createAsyncThunk(C.DELETE_SEGMENT_REQUEST, async (id: string) => {
  try {
    await api.delete(`/api/segments/${id}`, {
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