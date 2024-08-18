import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchSegments,
  createSegment,
  updateSegment,
  deleteSegment
} from '../actions/segmentActions';
import { Segment } from '../types';
import { RootState } from '../store';

interface SegmentState {
  segments: Segment[];
  loading: boolean;
  error: string | null;
}

const initialState: SegmentState = {
  segments: [],
  loading: false,
  error: null,
};

const segmentSlice = createSlice({
  name: 'segments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSegments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSegments.fulfilled, (state, action: PayloadAction<Segment[]>) => {
        state.segments = action.payload;
        state.loading = false;
      })
      .addCase(fetchSegments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch segments';
      })
      .addCase(createSegment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSegment.fulfilled, (state, action: PayloadAction<Segment>) => {
        state.segments.push(action.payload);
        state.loading = false;
      })
      .addCase(createSegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create segment';
      })
      .addCase(updateSegment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSegment.fulfilled, (state, action: PayloadAction<Segment>) => {
        const index = state.segments.findIndex((segment) => segment.id === action.payload.id);
        if (index !== -1) {
          state.segments[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update segment';
      })
      .addCase(deleteSegment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSegment.fulfilled, (state, action: PayloadAction<string>) => {
        state.segments = state.segments.filter((segment) => segment.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteSegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete segment';
      });
  },
});

export const selectSegments = (state: RootState) => state.segments;

export default segmentSlice.reducer;