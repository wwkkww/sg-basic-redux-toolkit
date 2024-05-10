import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../actions";

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    // follow pattern name of slice + / + name of function
    // eg: song/addSong
    addSong: (state, action) => {
      state.push(action.payload);
    },
    removeSong: (state, action) => {
      /**
       * ! NOTE: In this case, we are using an immutability helper. 
       * So, splice would be preferred as it is more performant and directly modifies the array.  
       * The filter method would make a copy of the array with the movie removed.
       */
      // return state.filter((song) => song !== action.payload)

      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
  // use to watch for additional action type
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    })
  }
});

// export const songActions = songsSlice.actions;
export const { addSong, removeSong } = songsSlice.actions;
export const songsReducer = songsSlice.reducer;