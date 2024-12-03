import { configureStore } from '@reduxjs/toolkit'
import { reducerSlice } from 'service/reducer'

const store = configureStore({
  reducer: { data: reducerSlice },
})

export default store
