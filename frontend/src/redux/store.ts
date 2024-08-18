import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import messageReducer from './reducers/messageReducer';
import segmentReducer from './reducers/segmentReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    segments: segmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;