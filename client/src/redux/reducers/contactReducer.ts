import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { asyncThunk, setError, setLoading, setSuccess } from 'src/helpers/redux.helper'
import { RequestMethod } from 'src/helpers/request.helper'
import { Contact } from 'src/types/contact.types'
import { Status } from 'src/types/status.types'
import API_ROUTER from '../router'

export type ContactState = {
  status: Status
  data: Contact[] | null
}

const initialState: ContactState = {
  status: Status.LOADING,
  data: null,
}

export const GET_CONTACT = asyncThunk<{ user: number }, Contact[], null>({
  thunk: 'contactSlice/GET_CONTACT',
  route: API_ROUTER.getContact,
  method: RequestMethod.POST,
})

export const CREATE_CONTACT = asyncThunk<Contact, Contact[], null>({
  thunk: 'contactSlice/CREATE_CONTACT',
  route: API_ROUTER.createContact,
  method: RequestMethod.POST,
})

export const DELETE_CONTACT = asyncThunk<Contact, Contact[], null>({
  thunk: 'contactSlice/DELETE_CONTACT',
  route: API_ROUTER.deleteContact,
  method: RequestMethod.POST,
})

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ContactState>) => {
    builder.addCase(GET_CONTACT.fulfilled, setSuccess)
    builder.addCase(CREATE_CONTACT.fulfilled, setSuccess)
    builder.addCase(DELETE_CONTACT.fulfilled, setSuccess)
    builder.addCase(GET_CONTACT.rejected, setError)
    builder.addCase(GET_CONTACT.pending, setLoading)
    builder.addCase(CREATE_CONTACT.rejected, setError)
  },
})
