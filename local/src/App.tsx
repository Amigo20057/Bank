import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { SideBar } from './components/SideBar.tsx'
import { DeleteCard } from './pages/DeleteCard.tsx'
import {
	Attachment,
	Credits,
	Home,
	Login,
	MoneyTransfer,
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
	const location = useLocation()

	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [dispatch])

	const hideSidebarRoutes = ['/moneyTransfer', '/deleteCard']

	return (
		<>
			{isAuth && !hideSidebarRoutes.includes(location.pathname) && <SideBar />}
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/attachment' element={<Attachment />} />
				<Route path='/credits' element={<Credits />} />
				<Route path='/valuta' element={<Valuta />} />
				<Route path='/support' element={<Support />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/moneyTransfer' element={<MoneyTransfer />} />
				<Route path='/deleteCard' element={<DeleteCard />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}
