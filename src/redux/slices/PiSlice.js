import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Get All users from json place holder
export const getPiDigits = createAsyncThunk(
  "PiSlice/getPiDigits",
  async (numDigits, { dispatch, rejectWithValue }) => {
    try {
      const url = "https://api.pi.delivery/v1/pi?start=1&numberOfDigits=";
      const fetchData = fetch(url + numDigits)
        .then((response) => response.json())
        .then((response) => response.content);
      return fetchData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//======================================================================
const PiSlice = createSlice({
  name: "PiSlice",
  initialState: {
    piDigits: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    //====================================getUsers
    [getPiDigits.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPiDigits.fulfilled]: (state, action) => {
      state.loading = false;
      state.piDigits = action.payload;
    },
    [getPiDigits.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //====================================getPosts
  },
});
//export const {} = PiSlice.actions; //For reducers functions, add each reducer function here.
export default PiSlice.reducer;
