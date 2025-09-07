import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  allUsers: [], // keep track of all users (for admin page)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log("Before login, allUsers =", state.allUsers);
      const { username, email, role } = action.payload;
      if (!state.allUsers) {
        state.allUsers = [];
      }

      state.isAuthenticated = true;
      state.isAdmin = role === "admin";
      state.user = { username, email, role };
      
      const exists = state.allUsers.some((u) => u.email === email);
      if (!exists) {
        state.allUsers.push({ username, email, role });
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});



export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
