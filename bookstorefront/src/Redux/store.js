// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './BookSlice'; // קובץ זה נמצא באותה תיקיה

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
