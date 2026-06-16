import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://libraryjson-production.up.railway.app/issues";

// Fetch all issues
export const FetchIssues = createAsyncThunk("FetchIssues", async () => {
  const res = await axios.get(api);
  return res.data;
});

// Add a new issue
export const AddIssues = createAsyncThunk("AddIssues", async (NewIssues) => {
  const res = await axios.post(api, NewIssues);
  return res.data;
});

// Delete an issue by ID
export const DeleteIssues = createAsyncThunk("DeleteIssues", async (id) => {
  await axios.delete(`${api}/${id}`);
  return id;
});

const IssuesSlice = createSlice({
  name: "Issues",
  initialState: {
    issues: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch issues
      .addCase(FetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        // Sort alphabetically by memberName
        state.issues = action.payload.sort((a, b) =>
          a.memberName.localeCompare(b.memberName)
        );
      })
      .addCase(FetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add issues
      .addCase(AddIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.push(action.payload);
        // Sort after adding
        state.issues.sort((a, b) => a.memberName.localeCompare(b.memberName));
      })
      .addCase(AddIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete issues
      .addCase(DeleteIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = state.issues.filter(
          (issue) => issue.id !== action.payload
        );
        // Sort after deletion
        state.issues.sort((a, b) => a.memberName.localeCompare(b.memberName));
      })
      .addCase(DeleteIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default IssuesSlice.reducer;
