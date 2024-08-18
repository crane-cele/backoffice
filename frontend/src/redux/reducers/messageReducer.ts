import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchMessages,
  createMessage,
  updateMessage,
  deleteMessage
} from '../actions/messageActions';
import { Message } from '../types';
import { RootState } from '../store';

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      })
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create message';
      })
      .addCase(updateMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        const index = state.messages.findIndex((message) => message.id === action.payload.id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update message';
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.messages = state.messages.filter((message) => message.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete message';
      });
  },
});

export const selectMessages = (state: RootState) => state.messages;

export default messageSlice.reducer;