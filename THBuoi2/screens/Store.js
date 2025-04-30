import { createSlice, configureStore } from '@reduxjs/toolkit';

// Tạo slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contact: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchContactsLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.contact = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchContactsError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

// Export actions
export const {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} = contactsSlice.actions;

// ✅ Cấu hình store với key 'contacts'
const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});

export default store;
