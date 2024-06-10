import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import { cardReducer } from './slices/card'
import { loanReducer } from './slices/loan'
import { reportReducer } from './slices/report'

const store = configureStore({
	reducer: {
		auth: authReducer,
		cards: cardReducer,
		reports: reportReducer,
		loans: loanReducer,
	},
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
