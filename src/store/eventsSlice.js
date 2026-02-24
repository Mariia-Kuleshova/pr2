import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const eventsAdapter = createEntityAdapter();

// початковий state подій
const initialState = eventsAdapter.addMany(eventsAdapter.getInitialState(), [
  { id: 1, title: "Painting Basics" },
  { id: 2, title: "Creative Workshop" },
]);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

// готові selectors для отримання даних зі store
export const eventsSelectors = eventsAdapter.getSelectors(
  (state) => state.events,
);

export default eventsSlice.reducer;
