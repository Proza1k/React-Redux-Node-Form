import React from 'react'

import cx from 'classnames'
import { NavLink } from 'react-router-dom'

import css from './Header.module.scss'
import { Button, Size } from '../common/Button'
import { Icons } from '../Icon'
import { Routes } from 'src/pages/AppRouter.types'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { LOGOUT } from 'src/redux/actions/userActions'

export const Header = () => {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <header className={cx(css.header)}>
      <NavLink to={Routes.PERSONAL}>
        {!auth.data && <Button size={Size.large} icon={Icons.user} type="button" />}
        {auth.data && (
          <>
            <Button size={Size.large} icon={Icons.user} type="button" />
          </>
        )}
      </NavLink>
      {auth.data && <Button size={Size.large} icon={Icons.logout} type="button" onClick={() => dispatch(LOGOUT())} />}
    </header>
  )
}
