import React, { useCallback } from 'react'

import cx from 'classnames'
import css from './ContactContainer.module.scss'
import { Heading, Size } from '../common/Heading'
import { Input } from '../common/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ContactContainerFields, ContactContainerInputs } from './ContactContainer.utils'
import { Icons } from '../Icon'
import { Button } from '../common/Button'
import { ContactState } from 'src/redux/reducers/contactReducer'
import { ContactList } from './ContactList'
import { AuthState } from 'src/redux/reducers/userReducer'

export type ContactContainerType = {
  auth: AuthState
  contact: ContactState
  onSubmit: (data: ContactContainerInputs) => void
}

export const ContactContainer = ({ onSubmit, auth, contact }: ContactContainerType) => {
  const { handleSubmit, formState, register, reset } = useForm<ContactContainerInputs>()

  const onSubmitHandler = handleSubmit(
    useCallback<SubmitHandler<ContactContainerInputs>>(
      (data: ContactContainerInputs) => {
        try {
          onSubmit(data)
          reset()
        } catch (error) {
          console.log(error)
        }
      },
      [onSubmit, reset],
    ),
  )

  return (
    <div className={cx(css.contact_container)}>
      <div className={cx(css.contact_container_top)}>
        <Heading value={`Profile: ${auth.data!.name}`} size={Size.large} />
      </div>
      <div className={cx(css.contact_container_content)}>
        <Heading value={'Contact'} size={Size.medium} />
        <form className={cx(css.contact_container_form)} onSubmit={onSubmitHandler}>
          <Input
            label={ContactContainerFields.name}
            register={register}
            error={formState.errors.name}
            className={cx(css.contact_container_form__input)}
            type="text"
            placeholder={ContactContainerFields.name}
            required
          />
          <Input
            label={ContactContainerFields.value}
            register={register}
            error={formState.errors.value}
            className={cx(css.contact_container_form__input)}
            type="text"
            placeholder={ContactContainerFields.value}
            required
          />
          <Button size={Size.large} icon={Icons.plus} type="submit" />
        </form>
      </div>
      <div className={cx(css.contact_container_content)}>
        <ContactList contact={contact} />
      </div>
    </div>
  )
}
