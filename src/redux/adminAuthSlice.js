import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Statik admin kullanıcıları dizisi
const admins = [
  { id: 1, adminId: 'A123', password: '321' },
  { id: 2, adminId: 'A456', password: '654' },
];

// Admin login işlemi için thunk oluştur
export const loginAdmin = createAsyncThunk(
  'adminAuth/loginAdmin',
  async ({ adminId, password }, { rejectWithValue }) => {
    // Admini diziden bul
    const admin = admins.find(
      (a) => a.adminId === adminId && a.password === password
    );

    if (admin) {
      return { adminId: admin.adminId, id: admin.id }; // Admin bilgilerini return et
    } else {
      return rejectWithValue('Invalid admin ID or password');
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default adminAuthSlice.reducer;
