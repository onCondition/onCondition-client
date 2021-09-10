import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, postGoogleToken } from "../api/auth";
import { storeTokens, removeTokens } from "../utils/tokens";

const initialState = {
  hasLoggedIn: false,
};

const login = createAsyncThunk("user/login",
  async function ({ idToken, googleToken }) {
    try {
      const { accessToken, refreshToken } = await postLogin(idToken);

      storeTokens({ accessToken, refreshToken });

      const res = await postGoogleToken(googleToken);

      if (res.status) {
        return Promise.reject(res.message);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });

const logout = createAsyncThunk("user/logout", removeTokens);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state) {
      state.hasLoggedIn = true;
    },
  },
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

export const { setLogin } = userSlice.actions;
export { login, logout };
export default userSlice.reducer;
