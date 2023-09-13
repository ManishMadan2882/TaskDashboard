import { configureStore } from '@reduxjs/toolkit';
import contentSliceReducer  from './taskSlice';
const Store = configureStore({
  reducer : contentSliceReducer,
});

export default Store;
