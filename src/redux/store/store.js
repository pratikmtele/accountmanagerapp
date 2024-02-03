import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        user: userSlice
    }
});

// Export the Redux store
export default store;