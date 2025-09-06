import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
   token: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === 'admin';
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;