import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { SideBar } from './components/SideBar.tsx'
import {
	Attachment,
	Credits,
	Home,
	Login,
	NotFound,
	Register,
	Settings,
	Support,
	Valuta,
} from './pages/index.ts'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.ts'

export const App: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])

	return (
		<>
			{isAuth ? <SideBar /> : ''}
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/attachment' element={<Attachment />} />
				<Route path='/credits' element=<Credits /> />
				<Route path='/valuta' element=<Valuta /> />
				<Route path='/support' element=<Support /> />
				<Route path='/settings' element={<Settings />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}
