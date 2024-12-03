import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAxios } from 'utils/api'

const getItems = createAsyncThunk('data/getItems', getAxios)

const reducerSlice = createSlice({
  name: 'data',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getItems.fulfilled, (state, action) => {
      state = action.payload
    })
  },
})

export default reducerSlice.reducer
