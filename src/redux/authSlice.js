import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import users from '../users.json';

// Kullanıcı login işlemi için thunk oluştur
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return user; // Kullanıcı bilgilerini return et
    } else {
      return rejectWithValue('Invalid username or password');
    }
  }
);

export const addUser = createAsyncThunk(
  'userAuth/addUser',
  async ({ username, password }, { rejectWithValue }) => {
    // Kullanıcı dizisine yeni kullanıcı ekle
    if (users.some(user => user.username === username)) {
      return rejectWithValue('Username already exists');
    }
    
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    return newUser;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
