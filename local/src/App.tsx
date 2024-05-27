import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SideBar } from './components/SideBar.tsx'

import { useSelector } from 'react-redux'
import { Home, Login, NotFound, Register, Settings } from './pages'
import { selectIsAuth } from './redux/slices/auth.ts'

export const App: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)

	return (
		<>
			{isAuth ? <SideBar /> : null}
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}
