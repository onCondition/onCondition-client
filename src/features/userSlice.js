import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, getUserInfos } from "../api/auth";
import { storeUserInfos, removeUserInfos } from "../helpers/userInfo";

const initialState = {
  id: "",
  customCategories: [],
  lastAccessDate: "",
};

const login = createAsyncThunk("user/login",
  async function ({ idToken, googleAccessToken }) {
    try {
      const { accessToken, refreshToken } = await postLogin(idToken);

      storeUserInfos({ accessToken, refreshToken, googleAccessToken });

      const { userId, customCategories, lastAccessDate } = await getUserInfos();

      return {
        userId, customCategories, lastAccessDate,
      };
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
      const { userId, customCategories, lastAccessDate } = payload;

      if (userId && customCategories && lastAccessDate) {
        state.id = userId;
        state.customCategories = customCategories;
        state.lastAccessDate = lastAccessDate;
      } else {
        state.id = null;
        state.customCategories = [];
        state.lastAccessDate = null;
      }
    },
    setCustomCategories(state, { payload }) {
      state.customCategories = payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.id = payload.userId;
      state.customCategories = payload.customCategories;
      state.lastAccessDate = payload.lastAccessDate;
    },
    [login.rejected]: (state) => {
      state.id = null;
      state.customCategories = [];
      state.lastAccessDate = null;
    },
    [logout.fulfilled]: (state) => {
      state.id = null;
      state.customCategories = [];
      state.lastAccessDate = null;
    },
  },
});

export const { setUserInfos, setCustomCategories } = userSlice.actions;
export { login, logout };
export default userSlice.reducer;
