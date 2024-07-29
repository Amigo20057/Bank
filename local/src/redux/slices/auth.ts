import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios.ts'

import { AuthState, FormValues } from '../../types/authTypes.ts'

export const fetchAuth = createAsyncThunk(
	'auth/fetchAuth',
	async (params: FormValues): Promise<FormValues> => {
		const { data } = await axios.post('/auth/login', params)
		return data
	}
)

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params: FormValues) => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/me')
	return data
})

const initialState: AuthState = {
	data: null,
	status: 'loading',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAuth.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(
				fetchAuth.fulfilled,
				(state, action: PayloadAction<{ token?: string }>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchAuth.rejected, state => {
				state.status = 'error'
				state.data = null
			})
			.addCase(fetchAuthMe.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(
				fetchAuthMe.fulfilled,
				(state, action: PayloadAction<{ token?: string }>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchAuthMe.rejected, state => {
				state.status = 'error'
				state.data = null
			})
			.addCase(fetchRegister.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(
				fetchRegister.fulfilled,
				(state, action: PayloadAction<{ token?: string }>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchRegister.rejected, state => {
				state.status = 'error'
				state.data = null
			})
	},
})

export const selectIsAuth = (state: { auth: AuthState }) =>
	Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
