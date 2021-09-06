import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { storeTokens, removeTokens } from "../utils/tokens";

const initialState = {
  hasLoggedIn: false,
};

const login = createAsyncThunk("user/login",
  async function (idToken) {
    try {
      const { accessToken, refreshToken } = await api.login(idToken);

      storeTokens({ accessToken, refreshToken });
    } catch (err) {
      return Promise.reject(err);
    }
  });

const logout = createAsyncThunk("user/logout", removeTokens);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.hasLoggedIn = true;
    },
    [login.pending]: (state) => {
      state.hasLoggedIn = false;
    },
    [login.rejected]: (state) => {
      state.hasLoggedIn = false;
    },
    [logout.fulfilled]: (state) => {
      state.hasLoggedIn = false;
    },
    [logout.rejected]: (state) => {
      state.hasLoggedIn = true;
    },
  },
});

export { login, logout };
export default userSlice.reducer;
