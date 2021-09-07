import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../utils/auth";
import { storeTokens, removeTokens } from "../utils/tokens";

const initialState = {
  hasLoggedIn: false,
};

const login = createAsyncThunk("user/login",
  async function (idToken) {
    try {
      const { accessToken, refreshToken } = await postLogin(idToken);

      storeTokens({ accessToken, refreshToken });
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
