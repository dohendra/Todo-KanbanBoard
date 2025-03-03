import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "registerUser",
  initialState: { registeredUser: null },
  reducers: {
    register: (state, action) => {
      state.registeredUser = action.payload;
    },
    ClearUser:(state,action)=>{
      state.registeredUser = action.payload
    }
  },
});

export const { register,ClearUser } = registerSlice.actions;
export default registerSlice.reducer;