import React, { useCallback, useState } from 'react'

import cx from 'classnames'
import css from './AuthWindow.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Input } from 'src/components/common/Input'
import { Heading, Size } from 'src/components/common/Heading'
import { Button, ButtonType } from 'src/components/common/Button'
import { AuthWindowFields, AuthWindowInputs, AuthWindowState } from './AuthWindow.types'
import { Link } from '../common/Link/Link'

export type AuthWindowType = {
  onSubmit: (data: AuthWindowInputs, currentWindow: AuthWindowState) => void
}

export const AuthWindow = ({ onSubmit }: AuthWindowType) => {
  const [currentWindow, setCurrentWindow] = useState(AuthWindowState.login)
  const { handleSubmit, formState, register } = useForm<AuthWindowInputs>()

  const onSubmitHandler = handleSubmit(
    useCallback<SubmitHandler<AuthWindowInputs>>(
      (data: AuthWindowInputs) => {
        try {
          onSubmit(data, currentWindow)
        } catch (error) {
          console.log(error)
        }
      },
      [onSubmit, currentWindow],
    ),
  )

  return (
    <form className={cx(css.auth_window)} onSubmit={onSubmitHandler}>
      {AuthWindowState.login === currentWindow && (
        <>
          <Heading value="Authorization" size={Size.large} />
          <div className={cx(css.auth_window__box)}>
            <Input
              label={AuthWindowFields.login}
              register={register}
              error={formState.errors.login}
              className={cx(css.auth_window__input)}
              type="text"
              placeholder="Login"
              required
            />
            <Input
              label={AuthWindowFields.password}
              register={register}
              error={formState.errors.password}
              className={cx(css.auth_window__input)}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <Button tabindex={0} type={ButtonType.submit} text="Login" size={Size.medium} />
          <Link
            className={cx(css.auth_window__link)}
            size={Size.small}
            onClick={() => setCurrentWindow(AuthWindowState.register)}
            text="First time? Register"
          />
        </>
      )}
      {AuthWindowState.register === currentWindow && (
        <>
          <Heading value="Registration" size={Size.large} />
          <div className={cx(css.auth_window__box)}>
            <Input
              label={AuthWindowFields.nickname}
              register={register}
              error={formState.errors.nickname}
              className={cx(css.auth_window__input)}
              type="text"
              placeholder="Nickname"
              required
            />
            <Input
              label={AuthWindowFields.login}
              register={register}
              error={formState.errors.login}
              className={cx(css.auth_window__input)}
              type="text"
              placeholder="Login"
              required
            />
            <Input
              label={AuthWindowFields.password}
              register={register}
              error={formState.errors.password}
              className={cx(css.auth_window__input)}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <Button tabindex={0} type={ButtonType.submit} text="Register" size={Size.medium} />
          <Link
            className={cx(css.auth_window__link)}
            size={Size.small}
            onClick={() => setCurrentWindow(AuthWindowState.login)}
            text="Return to login page"
          />
        </>
      )}
    </form>
  )
}
