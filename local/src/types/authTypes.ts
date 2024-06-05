export interface FormValues {
	fullName: string
	email: string
	password: string
}

export interface FormDelete {
	cardNumber: string
	cvv: string
}

export interface Payload {
	token?: string
}

export interface AuthState {
	data: {
		token?: string
		[key: string]: any
	} | null
	status: 'loading' | 'loaded' | 'error'
}
