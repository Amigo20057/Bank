import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import { cardReducer } from './slices/card'

const store = configureStore({
	reducer: {
		auth: authReducer,
		cards: cardReducer,
	},
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
