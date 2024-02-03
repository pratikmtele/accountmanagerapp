import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice, fetching data from localStorage
const initialState = {
    status: false,
    userData: JSON.parse(localStorage.getItem("Users"))
}

// Create a slice for managing user-related state
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {

        // Reducer function for signing up a new user
        signup: (state, action) => {
            state.userData = action.payload
            localStorage.setItem("Users", JSON.stringify(state.userData));
        },

        // Reducer function for user login 
        login: (state, action) => {
            console.log(action.payload);
            if (action.payload.email === state.userData.email) {
                if (action.payload.password === state.userData.password) {
                    state.status = true;
                } else {
                    state.status = false;
                }
            } else {
                state.status = false;
            }
        },

        // Reducer function for updating user details
        updateDetails: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("Users", JSON.stringify(state.userData));
        },

        logout: (state, action) => {
            console.log(action.payload);
        }
    }
});

// Export indivitual action creators
export const { signup, login, logout, updateDetails } = userSlice.actions;

// Export the reducer function
export default userSlice.reducer;