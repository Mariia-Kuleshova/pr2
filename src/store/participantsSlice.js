import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// adapter для нормалізованого зберігання учасників
const participantsAdapter = createEntityAdapter();

// asyncThunk для завантаження учасників з API
// dispatch(fetchParticipants(eventId))
export const fetchParticipants = createAsyncThunk(
  "participants/fetch",
  async (eventId) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    // додаємо eventId до кожного учасника
    return data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      eventId,
    }));
  },
);

const slice = createSlice({
  name: "participants",

  // initial state з loading та error для UI feedback
  initialState: participantsAdapter.getInitialState({
    loading: false,
    error: null,
  }),

  reducers: {},

  // extraReducers обробляє asyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;

        // setAll для оновлення списку
        participantsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchParticipants.rejected, (state) => {
        state.loading = false;
        state.error = "Failed loading";
      });
  },
});

// selectors від adapter
export const participantsSelectors = participantsAdapter.getSelectors(
  (state) => state.participants,
);

export default slice.reducer;

// selector для динамічної фільтрації
export const selectFilteredParticipants = (state, search) => {
  const all = participantsSelectors.selectAll(state);

  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );
};
