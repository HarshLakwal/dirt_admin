import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import userSlice from "./userSlice.js";
import { kidsSlice, seriesSlice } from "./videosSlice.js"
import { codeSlice, getCodesSlice } from "./codeSlice.js";
import vehicalSlice from "./vehicalSlice.js";



const Store = configureStore({
  reducer: {
    admin: authSlice,
    users: userSlice,
    codes: codeSlice,
    getcodes: getCodesSlice,
    vehical:vehicalSlice
  },
});

export default Store;
