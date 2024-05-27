import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { SideBar } from './components/SideBar.tsx'
import { Home, Login, NotFound, Register, Settings } from './pages'
import { selectIsAuth } from './redux/slices/auth.ts'

export const App: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)

	return (
		<>
			{isAuth ? <SideBar /> : ''}
			{/* <SideBar /> */}
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
