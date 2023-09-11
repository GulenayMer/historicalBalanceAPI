
import { Transaction, Balance } from '../types'

export function getHistoricalBalance(fromDate: string, toDate: string, transactions: Transaction[]): Balance[] {
	const balances: Balance[] = [];
	let startDate: Date = new Date(fromDate);
	let endDate: Date = new Date(toDate);
	let balance: number = 0;

	while (startDate <= endDate) 
	{
		console.log("startdate", startDate);
		const day = startDate.getDate();
		const month = startDate.getMonth() + 1;
		const year = startDate.getFullYear();
		const formattedDate: string = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
		//console.log("🚀 ~ file: getHistoricalBalances.ts:12 ~ getHistoricalBalance ~ formattedDate:", formattedDate)
		
		balance += calculateBalanceForSpecDate(transactions, formattedDate);

		const balanceData: Balance = {
			date: formattedDate,
			amount: balance,
			currency: "EUR", 
		};

		balances.push(balanceData);
		startDate.setDate(startDate.getDate() + 1);
	}

	return balances;
}

function calculateBalanceForSpecDate(transactions: Transaction[], date: string): number {
	const transactionsSpecDate: Transaction[] = transactions.filter((transaction: Transaction) => transaction.date.split('T')[0] === date);
	const balanceSpecDate: number = transactionsSpecDate.reduce((total: number, transaction: Transaction) => total + transaction.amount, 0);
	return balanceSpecDate;
}

