import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://libraryjson-production.up.railway.app/fines";

// Fetch all fines
export const FetchFines = createAsyncThunk("FetchFines", async () => {
  const res = await axios.get(api);
  return res.data;
});

// Add a new fine
export const AddFines = createAsyncThunk("AddFines", async (newFines) => {
  const res = await axios.post(api, newFines);
  return res.data;
});

// Delete a fine by ID
export const DeleteFines = createAsyncThunk("DeleteFines", async (id) => {
  await axios.delete(`${api}/${id}`);
  return id;
});

const FinesSlice = createSlice({
  name: "Fines",
  initialState: {
    fines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Fines
      .addCase(FetchFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchFines.fulfilled, (state, action) => {
        state.loading = false;
        // Sort fines alphabetically by memberName
        state.fines = action.payload.sort((a, b) =>
          a.memberName.localeCompare(b.memberName)
        );
      })
      .addCase(FetchFines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Fines
      .addCase(AddFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines.push(action.payload);
        // Sort after adding
        state.fines.sort((a, b) => a.memberName.localeCompare(b.memberName));
      })
      .addCase(AddFines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Fines
      .addCase(DeleteFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = state.fines.filter(
          (fine) => fine.id !== action.payload
        );
        // Sort after deletion
        state.fines.sort((a, b) => a.memberName.localeCompare(b.memberName));
      })
      .addCase(DeleteFines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default FinesSlice.reducer;
