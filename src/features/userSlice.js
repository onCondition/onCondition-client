import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, postGoogleToken } from "../api/auth";
import { storeUserInfos, removeUserInfos } from "../helpers/userInfo";

const initialState = {
  id: "",
  customCategories: [],
  isLoading: false,
};

const login = createAsyncThunk("user/login",
  async function ({ idToken, googleToken }) {
    try {
      const {
        accessToken,
        refreshToken,
        userId,
        customCategories,
      } = await postLogin(idToken);

      storeUserInfos({
        accessToken,
        refreshToken,
        userId,
        customCategories,
      });

      const res = await postGoogleToken(userId, googleToken);

      if (res.status) {
        return Promise.reject(res.message);
      }

      return { userId, customCategories };
    } catch (err) {
      return Promise.reject(err);
    }
  });

const logout = createAsyncThunk("user/logout", removeUserInfos);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfos(state, { payload }) {
      const { userId, customCategories } = payload;

      if (userId && customCategories) {
        state.id = userId;
        state.customCategories = customCategories;
      } else {
        state.id = null;
        state.customCategories = [];
      }
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      const { userId, customCategories } = payload;

      state.id = userId;
      state.customCategories = customCategories;
    },
    [login.rejected]: (state) => {
      state.id = "";
      state.customCategories = [];
    },
    [logout.fulfilled]: (state) => {
      state.id = null;
      state.customCategories = [];
    },
  },
});

export const { setUserInfos } = userSlice.actions;
export { login, logout };
export default userSlice.reducer;
