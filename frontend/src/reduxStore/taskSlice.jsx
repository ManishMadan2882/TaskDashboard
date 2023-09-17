import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
}

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    const res = await fetch('https://taskapi-u0zl.onrender.com/api/read/all')
    console.log(res);
    const data = await res.json()
    console.log(data);
    return data 
  }
)

 const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    //updates the task in database/server-side
    updateState(state, action) {
      fetch(`https://taskapi-u0zl.onrender.com/api/update/${action.payload.id}`,{
        method:'put',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(action.payload.newbie)
      })
      .then((res)=>res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err)) 
    },
    //creates a document in database
    createRow(state, action) {
      fetch('https://taskapi-u0zl.onrender.com/api/create',{
        method:'post',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(action.payload.newbie)
      })
      .then((res)=>res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err)) 
     },
     deleteState(state, action) {
      fetch(`https://taskapi-u0zl.onrender.com/api/delete/${action.payload.id}`,{
        method:'delete'
      })
      .then((res)=>res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err)) 
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload);
      state.contents = action.payload
    })
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})
export const { createRow,updateState,deleteState } = contentSlice.actions;
export default contentSlice.reducer