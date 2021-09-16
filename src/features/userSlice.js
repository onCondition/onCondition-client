import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../api/auth";
import { storeUserInfos, removeUserInfos } from "../helpers/userInfo";

const initialState = {
  id: "",
  customCategories: [],
};

const login = createAsyncThunk("user/login",
  async function ({ idToken, googleAccessToken }) {
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
        googleAccessToken,
      });

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
    setCustomCategories(state, { payload }) {
      state.customCategories = payload;
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

export const { setUserInfos, setCustomCategories } = userSlice.actions;
export { login, logout };
export default userSlice.reducer;
