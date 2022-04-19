import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { asyncThunk, setError, setLoading, setSuccess } from 'src/helpers/redux.helper'
import { RequestMethod } from 'src/helpers/request.helper'
import { Status } from 'src/types/status.types'
import { User } from 'src/types/user.types'
import API_ROUTER from '../router'

export type AuthState = {
  status: Status
  data: User | null
}

export const getAuthForStorage = (state: AuthState) => {
  try {
    const user = getUserLocalStorage()
    if (user) {
      return setSuccess(state, {
        payload: user,
        type: '',
      })
    } else {
      return setSuccess(state, {
        payload: null,
        type: '',
      })
    }
  } catch {
    return setError(state)
  }
}

const setUserLocalStorage = (user: User): void => localStorage.setItem('user', JSON.stringify(user))
const deleteUserLocalStorage = (): void => localStorage.removeItem('user')
const getUserLocalStorage = (): User | null => {
  const user = localStorage.getItem('user')
  if (!user) {
    return null
  }

  const parseUser = JSON.parse(user)
  return parseUser
}

export const LOGIN = asyncThunk({
  thunk: 'authSlice/LOGIN',
  route: API_ROUTER.login,
  method: RequestMethod.POST,
  callback: setUserLocalStorage,
})

export const REGISTER = asyncThunk({
  thunk: 'authSlice/REGISTER',
  route: API_ROUTER.register,
  method: RequestMethod.POST,
  callback: setUserLocalStorage,
})

export const logout = (state: AuthState): AuthState => {
  try {
    deleteUserLocalStorage()
    return setSuccess(state, {
      payload: null,
      type: '',
    })
  } catch {
    return setError(state)
  }
}

const initialState: AuthState = {
  data: null,
  status: Status.LOADING,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGOUT: (state: AuthState) => logout(state),
    GET_USER: (state: AuthState) => getAuthForStorage(state),
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(LOGIN.fulfilled, setSuccess)
    builder.addCase(REGISTER.fulfilled, setSuccess)
    builder.addCase(LOGIN.rejected, setError)
    builder.addCase(LOGIN.pending, setLoading)
    builder.addCase(REGISTER.rejected, setError)
    builder.addCase(REGISTER.pending, setLoading)
  },
})
