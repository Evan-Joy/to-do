import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app-store/store";

interface ISessionUser {
  id?: number,
  userName?: string,
  fullName?: string,
}

const initialState: ISessionUser = {}

const SessionUserSlice = createSlice({
  name: 'SessionUserReducer',
  initialState: initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<ISessionUser>) => {
      const { id, userName, fullName } = action.payload;
      state.id = id;
      state.userName = userName;
      state.fullName = fullName;
    },
    userLogout: (state) => {
      state.id = state.fullName = state.userName = undefined;
    },
  }
});

export const { userLogin, userLogout } = SessionUserSlice.actions;

export const selectSessionUser = (state: RootState) => state.sessionUser;

export default SessionUserSlice.reducer;