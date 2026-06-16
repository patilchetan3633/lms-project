// store.js
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Slice/BooksSlice"; 
import finesReducer from "../Slice/FineSlice";
import issuesReducer from "../Slice/IssuesSlice";   // ✅ slice import

// Redux store create karna
export const store = configureStore({
  reducer: {
    books: booksReducer,
    fines: finesReducer,
    issues: issuesReducer,  // ✅ ab reducer sahi hai
  },
});

export default store;
