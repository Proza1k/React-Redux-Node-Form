import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { contactSlice } from './reducers/contactReducer'
import { authSlice } from './reducers/userReducer'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    contact: contactSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
