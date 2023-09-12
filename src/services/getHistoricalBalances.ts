
import { Transaction, Balance } from '../types'

export function getHistoricalBalance(fromDate: string, toDate: string, transactions: Transaction[]): Balance[] {
	const balances: Balance[] = [];
	let startDate: Date = new Date(fromDate);
	let endDate: Date = new Date(toDate);
	let balance: number = 0;

	while (startDate <= endDate) 
	{		
		balance += calculateBalanceForSpecDate(transactions, startDate);

		const day = startDate.getDate();
		const month = startDate.getMonth() + 1;
		const year = startDate.getFullYear();
		const formattedDate: string = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`; 

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

function calculateBalanceForSpecDate(transactions: Transaction[], date: Date): number {
	const transactionsSpecDate: Transaction[] = transactions.filter( (item: Transaction) => 
	{
		const itemDate = new Date(item.date)
		return itemDate.getDate() === date.getDate();
	});
	
	// In case status:'CANCELLED' means that no transaction took place:
	const filterCanceledItem: Transaction[] = transactionsSpecDate.filter( (item: Transaction) => 
	{
		return  item.status === 'BOOKED' || item.status === 'PROCESSED';
	});
	
	const balanceSpecDate: number = filterCanceledItem.reduce((total: number, item: Transaction) => total + item.amount, 0);
	return balanceSpecDate;
}

