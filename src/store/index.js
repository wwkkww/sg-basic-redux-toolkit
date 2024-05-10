import { configureStore, createSlice } from "@reduxjs/toolkit";

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
    // builder.addCase("movie/reset", (state, action) => {
    // builder.addCase(moviesSlice.actions.reset.toString(), (state, action) => {
    builder.addCase(moviesSlice.actions.reset, (state, action) => {
      console.log("Resetting songs state", state);
      console.log("Resetting songs action", action);
      return [];
    });
  }
});

const moviesSlice = createSlice({
  name: "movie",
  initialState: [],
  reducers: {
    addMovie: (state, action) => {
      state.push(action.payload);
    },
    removeMovie: (state, action) => {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
    reset(state, action) {
      return [];
    }
  },
});

const store = configureStore({
  //! NOTE: reducer without "s"
  reducer: {
    //! NOTE: reducer (without s) is a function that wrap all the "reducers" from the slice
    songs: songsSlice.reducer,
    movies: moviesSlice.reducer,
  },
});

// console.log(songsSlice.actions);
// console.log(songsSlice.actions.addSong("New song"));

// const startingState = store.getState()
// console.log(startingState)

// OPTION 1: dispatch the action with manual type
// store.dispatch({
//   type: "song/addSong", // this type follow the reducer pattern from slice
//   payload: "Imagine",
// });

// OPTION 2: dispatch the action with the action creator
// store.dispatch(songsSlice.actions.addSong("Hey Jude"));

const finalState = store.getState();
console.log(finalState);

// export const songActions = songsSlice.actions;
export const { addSong, removeSong } = songsSlice.actions;
export const { addMovie, removeMovie, reset } = moviesSlice.actions;
export { store };
