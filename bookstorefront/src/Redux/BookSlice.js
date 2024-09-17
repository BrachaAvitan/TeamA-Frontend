// src/redux/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// תחילת מצב ראשוני
const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

// יצירת ת'נאי אסינכרוני עבור קבלת ספרים
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('/api/books');
  return response.data;
});

// יצירת ת'נאי אסינכרוני עבור הוספת ספר
export const addBook = createAsyncThunk('books/addBook', async (newBook) => {
  const response = await axios.post('/api/books', newBook);
  return response.data;
});

// יצירת ת'נאי אסינכרוני עבור מחיקת ספר
export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId) => {
  await axios.delete(`/api/books/${bookId}`);
  return bookId;
});

// יצירת ת'נאי אסינכרוני עבור עדכון ספר
export const updateBook = createAsyncThunk('books/updateBook', async ({ id, updatedBook }) => {
  const response = await axios.put(`/api/books/${id}`, updatedBook);
  return response.data;
});

// יצירת הקטגוריות (reducers) באמצעות createSlice
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      });
  },
});

export default bookSlice.reducer;
