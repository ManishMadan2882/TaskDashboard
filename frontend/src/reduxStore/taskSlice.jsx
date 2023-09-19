import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
}


export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    const res = await fetch('/api/read/all') //GEts all the task info
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
      fetch(`/api/update/${action.payload.id}`,{
        method:'put',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(action.payload.newbie)
      })
      .then((res)=>res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

      state.contents.map((elem,key) =>{
        if(elem._id === action.payload.id)
        {
          state.contents[key] = action.payload.newbie  
        }
      })
      return state;
    },
    //creates a document in database
    createRow(state, action) {
      fetch('/api/create',{
        method:'post',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(action.payload.newbie)
      })
      .then((res)=>res.json())
      .then(data => {
      })
      .catch(err => console.log(err)) 


      state.contents = [...state.contents, action.payload.newbie]
      return state;

     },
     deleteState(state, action) {
      fetch(`/api/delete/${action.payload.id}`,{
        method:'delete'
      })
      .then((res)=>res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
      state.contents =  state.contents.filter(elem => elem._id !== action.payload.id)
      return state
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