import { createSlice } from '@reduxjs/toolkit';

// Function to load user and token from localStorage
const loadAuthFromLocalStorage = () => {
    try {
        const serializedAuth = localStorage.getItem('user');
        console.log(serializedAuth)
        if (serializedAuth === null) return { user: null};
            return {user: JSON.parse(serializedAuth)}
            
    } catch (error) {
        console.error('Error loading user from localStorage:', error);
        return { user: null};
        
    }
};

// Initial state with user and token
const initialState = loadAuthFromLocalStorage();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set user and token
        setUser(state, action) {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('user',  JSON.stringify( user)); // Save both user and token
        },
        // Action to clear user and token
        logout(state) {
            state.user = null;
            localStorage.removeItem('user'); // Clear user and token from localStorage
        },
    },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
