import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  customCategories: [],
  lastAccessDate: "",
};

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
});

export const { setUserInfos, setCustomCategories } = userSlice.actions;
export default userSlice.reducer;
