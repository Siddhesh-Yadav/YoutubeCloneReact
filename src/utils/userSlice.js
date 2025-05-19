import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  JWT: localStorage.getItem("JWT") || "",
  full_name: localStorage.getItem("full_name") || "",
  email: localStorage.getItem("email") || "",
  user_name: localStorage.getItem("user_name") || "",
  profile_picture: localStorage.getItem("profile_picture") || "",
  isLoggedIn: !!localStorage.getItem("JWT"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.JWT = action.payload.JWT;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.user_name = action.payload.user_name;
      state.profile_picture = action.payload.profile_picture;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.JWT = "";
      state.full_name = "";
      state.email = "";
      state.user_name = "";
      state.profile_picture = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
