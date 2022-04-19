import React, { useEffect } from 'react'

import { AuthWindow, AuthWindowInputs, AuthWindowState } from 'src/components/AuthWindow'
import { ContactContainer } from 'src/components/ContactContainer/ContactContainer'
import { ContactContainerInputs } from 'src/components/ContactContainer/ContactContainer.utils'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { CREATE_CONTACT, GET_CONTACT } from 'src/redux/reducers/contactReducer'
import { LOGIN, REGISTER } from 'src/redux/reducers/userReducer'
import { Contact } from 'src/types/contact.types'

export const Personal = () => {
  const auth = useAppSelector((state) => state.auth)
  const contact = useAppSelector((state) => state.contact)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (auth.data) {
      dispatch(GET_CONTACT({ user: auth.data!.id }))
    }
  }, [dispatch, auth])

  const onAuthSubmit = (data: AuthWindowInputs, currentWindow: AuthWindowState) => {
    if (currentWindow === AuthWindowState.login) {
      dispatch(LOGIN(data))
    } else if (currentWindow === AuthWindowState.register) {
      dispatch(REGISTER(data))
    }
  }

  const onContactSubmit = (data: ContactContainerInputs) => {
    const contactData: Contact = {
      ...data,
      user: auth.data!.id,
    }

    dispatch(CREATE_CONTACT(contactData))
  }

  return (
    <>
      {!auth.data && <AuthWindow onSubmit={onAuthSubmit} />}
      {auth.data && <ContactContainer onSubmit={onContactSubmit} auth={auth} contact={contact} />}
    </>
  )
}
