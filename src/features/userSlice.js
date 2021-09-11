import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, postGoogleToken } from "../api/auth";
import { storeUserInfos, removeUserInfos } from "../helpers/userInfo";

const initialState = {
  id: "",
  categories: [],
  isLoading: false,
};

const login = createAsyncThunk("user/login",
  async function ({ idToken, googleToken }) {
    try {
      const {
        accessToken,
        refreshToken,
        id,
        categories,
      } = await postLogin(idToken);

      storeUserInfos({
        accessToken,
        refreshToken,
        id,
        categories,
      });

      const res = await postGoogleToken(googleToken);

      if (res.status) {
        return Promise.reject(res.message);
      }

      return { id, categories };
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
      const { id, categories } = payload;

      if (id && categories) {
        state.id = id;
        state.categories = categories;
      } else {
        state.id = null;
        state.categories = [];
      }
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      const { id, categories } = payload;

      state.id = id;
      state.categories = categories;
    },
    [login.rejected]: (state) => {
      state.id = "";
      state.categories = [];
    },
    [logout.fulfilled]: (state) => {
      state.id = null;
      state.categories = [];
    },
  },
});

export const { setUserInfos } = userSlice.actions;
export { login, logout };
export default userSlice.reducer;
