import { configureStore } from "@reduxjs/toolkit";

import PiSlice from "./slices/PiSlice";
import auth from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    PiSlice: PiSlice,
    auth: auth,
  },
});
export default store;
