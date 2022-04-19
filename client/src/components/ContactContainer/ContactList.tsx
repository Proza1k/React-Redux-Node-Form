import React, { useEffect } from 'react'

import cx from 'classnames'
import css from './ContactList.module.scss'
import { ContactState, DELETE_CONTACT } from 'src/redux/reducers/contactReducer'
import { Status } from 'src/types/status.types'
import { Button, Size } from '../common/Button'
import { Icons } from '../Icon'
import { useAppDispatch } from 'src/redux/hooks'
import { Contact } from 'src/types/contact.types'

export type ContactListProps = {
  contact: ContactState
}

export const ContactList = ({ contact }: ContactListProps) => {
  const dispatch = useAppDispatch()

  const deleteContact = (contact: Contact) => dispatch(DELETE_CONTACT(contact))

  return (
    <div className={cx(css.contact_list)}>
      {contact.status === Status.LOADING && <div className={cx(css.contact_container_content_loading)}>Loading...</div>}
      {contact.status === Status.SUCCESS &&
        contact.data &&
        contact.data.map((data) => (
          <div className={cx(css.contact_list__item)}>
            <span className={cx(css.contact_list__name)}>{data.name}</span>
            <div className={cx(css.contact_list__button)}>
              <Button size={Size.medium} icon={Icons.trash} type="button" onClick={() => deleteContact(data)} />
            </div>
            <span className={cx(css.contact_list__value)}>{data.value}</span>
          </div>
        ))}
    </div>
  )
}
