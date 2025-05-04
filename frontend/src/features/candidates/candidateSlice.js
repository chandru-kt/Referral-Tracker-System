import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/candidates';

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchAll',
  async (_, thunkAPI) => {
    const response = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
);

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCandidates.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default candidateSlice.reducer;
