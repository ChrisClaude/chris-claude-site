import { UserDto } from '@/_lib/codegen';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type AuthState = {
  userProfile: UserDto | null;
};

const initialState: AuthState = {
  userProfile: null,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserDto | null>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = authSlice.actions;

export default authSlice.reducer;
