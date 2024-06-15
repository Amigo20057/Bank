export interface CommissionSelectorProps {
	commission: number
	setCommission: (value: number) => void
}

export interface IFormCredit {
	cardNumber: string
	cvv: string
	commission: number
	money: number
	term: number
	monthlyPayment: number
}

export interface CreditFormProps {
	commission: number
	money: number
	term: number
	setRedirect: (value: boolean) => void
}

export interface LoanCalculatorProps {
	monthlyPayment: number
	totalCost: number
	totalCreditCost: number
	oneTimeFee: number
	annualRate: string
}

export interface TermSelectorProps {
	term: number
	setTerm: (value: number) => void
}
