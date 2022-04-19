import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Status } from 'src/types/status.types'
import { fetchJson, RequestMethod } from './request.helper'

export const setError = <State>(state: State) => ({
  ...state,
  data: null,
  status: Status.ERROR,
})

export const setLoading = <State>(state: State) => ({
  ...state,
  status: Status.LOADING,
})

export const setSuccess = <State, Action>(state: State, action: PayloadAction<Action>) => ({
  ...state,
  data: action.payload ?? null,
  status: Status.SUCCESS,
})

export type AsyncThunkParams<ResultPayload, Callback> = {
  thunk: string
  route: string
  method: RequestMethod
  callback?: (data: ResultPayload) => Callback | null
}

export const asyncThunk = <Payload, ResultPayload, Callback>(params: AsyncThunkParams<ResultPayload, Callback>) => {
  const { thunk, route, method, callback } = params

  return createAsyncThunk(thunk, async (payload: Payload) => {
    const data: ResultPayload = await fetchJson(route, method, {
      ...payload,
    })

    if (callback) callback(data)

    return data
  })
}
