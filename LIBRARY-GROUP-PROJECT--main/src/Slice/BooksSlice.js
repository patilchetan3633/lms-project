import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://libraryjson-production.up.railway.app/books";

// ✅ Fetch All Books
export const FetchData = createAsyncThunk("FetchData", async () => {
  const res = await axios.get(api);
  return res.data;
});

// ✅ Delete Book
export const DeleteData = createAsyncThunk("DeleteData", async (id) => {
  await axios.delete(`${api}/${id}`);
  return id;
});

// ✅ Add Book
export const AddBooks = createAsyncThunk("AddBooks", async (books) => {
  const res = await axios.post(api, books);
  return res.data;
});

const initialState = {
  books: [],
  status: "neutral",
  error: null,
  searchTerm: "", // 🔹 for search text
};

const booksslice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // update search term
    },
  },


  extraReducers: (builder) => {
    // Fetch
    builder.addCase(FetchData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(FetchData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
    });
    builder.addCase(FetchData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // Add
    builder.addCase(AddBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AddBooks.fulfilled, (state, action) => {
      state.status = "success";
      state.books.push(action.payload);
    });
    builder.addCase(AddBooks.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // Delete
    builder.addCase(DeleteData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(DeleteData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = state.books.filter((book) => book.id !== action.payload);
    });
    builder.addCase(DeleteData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { setSearchTerm } = booksslice.actions;
export default booksslice.reducer;
