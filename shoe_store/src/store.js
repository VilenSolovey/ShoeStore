import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/rootReducer';

const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
