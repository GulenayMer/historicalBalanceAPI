import { getHistoricalBalance } from "../../src/services/getHistoricalBalances";
import { Transaction, Balance } from '../../src/types'


describe("getHistoricalBalance", () => {
	describe("getHistoricalBalance from 2022-01-03 to 2022-01-03", () => {
		it("should return the expected historical balance", () => {
			const  transactions: Transaction[] = [
					{
						amount:-911,
						currency:"EUR",
						date:"2022-01-03T22:00:09.002Z",
						status:"PROCESSED"
					},
					{
						amount:332,
						currency:"EUR",
						date:"2022-01-03T15:44:57.759Z",
						status:"BOOKED"
					},
					{
						amount:-165,
						currency:"EUR",
						date:"2022-01-03T03:30:45.462Z",
						status:"PROCESSED"
					},
					{
						amount:-51,
						currency:"EUR",
						date:"2022-01-03T09:59:44.034Z",
						status:"CANCELLED"
					},
					{
						amount:716,
						currency:"EUR",
						date:"2022-01-03T14:19:06.933Z",
						status:"BOOKED"
					},
					{
						amount:309,
						currency:"EUR",
						date:"2022-01-03T17:29:10.009Z",
						status:"CANCELLED"
					},
			];
		
			const [fromDate, toDate, expected] = ["2022-01-03", "2022-01-03", 
				[
					{ date: "03/01/2022", amount: -28, currency: "EUR" },
				]
			];
		
			const historicalBalances = getHistoricalBalance(fromDate, toDate, transactions);
			expect(historicalBalances).toEqual(expected);
			});
	});
	describe("getHistoricalBalance from 2022-04-14 to 2022-04-16", () => {
		it("should return the expected historical balance", () => {
			const  transactions: Transaction[] = [
				{
					amount: 994,
					currency: 'EUR',
					date: '2022-04-14T17:17:40.961Z',
					status: 'PROCESSED'
				},
				{
					amount: 566,
					currency: 'EUR',
					date: '2022-04-14T17:29:19.858Z',
					status: 'PROCESSED'
				},
				{
					amount: -511,
					currency: 'EUR',
					date: '2022-04-16T14:44:39.207Z',
					status: 'PROCESSED'
				},
				{
					amount: 144,
					currency: 'EUR',
					date: '2022-04-16T20:52:35.800Z',
					status: 'BOOKED'
				},
				{
					amount: 665,
					currency: 'EUR',
					date: '2022-04-16T14:09:37.783Z',
					status: 'BOOKED'
				},
				{
					amount: -304,
					currency: 'EUR',
					date: '2022-04-14T04:43:24.747Z',
					status: 'BOOKED'
				},
				{
					amount: 680,
					currency: 'EUR',
					date: '2022-04-15T21:29:42.286Z',
					status: 'CANCELLED'
				},
				{
					amount: -501,
					currency: 'EUR',
					date: '2022-04-16T06:48:21.343Z',
					status: 'CANCELLED'
				},
				{
					amount: 425,
					currency: 'EUR',
					date: '2022-04-14T05:58:33.951Z',
					status: 'BOOKED'
				},
				{
					amount: 703,
					currency: 'EUR',
					date: '2022-04-15T00:53:39.443Z',
					status: 'PROCESSED'
				},
				{
					amount: 247,
					currency: 'EUR',
					date: '2022-04-14T00:26:56.654Z',
					status: 'BOOKED'
				},
				{
					amount: -978,
					currency: 'EUR',
					date: '2022-04-15T20:03:41.215Z',
					status: 'PROCESSED'
				},
				{
					amount: 820,
					currency: 'EUR',
					date: '2022-04-14T09:02:20.782Z',
					status: 'BOOKED'
				},
				{
					amount: -467,
					currency: 'EUR',
					date: '2022-04-14T14:02:21.361Z',
					status: 'CANCELLED'
				},
				{
					amount: -809,
					currency: 'EUR',
					date: '2022-04-15T16:45:26.965Z',
					status: 'PROCESSED'
				},
				{
					amount: 352,
					currency: 'EUR',
					date: '2022-04-15T04:19:31.163Z',
					status: 'BOOKED'
				},
				{
					amount: 312,
					currency: 'EUR',
					date: '2022-04-15T04:32:09.846Z',
					status: 'BOOKED'
				},
				{
					amount: -162,
					currency: 'EUR',
					date: '2022-04-14T06:08:07.045Z',
					status: 'PROCESSED'
				},
				{
					amount: 999,
					currency: 'EUR',
					date: '2022-04-15T11:22:57.544Z',
					status: 'PROCESSED'
				},
				{
					amount: -837,
					currency: 'EUR',
					date: '2022-04-15T23:47:46.120Z',
					status: 'CANCELLED'
				},
				{
					amount: -693,
					currency: 'EUR',
					date: '2022-04-15T12:15:14.657Z',
					status: 'BOOKED'
				},
				{
					amount: 843,
					currency: 'EUR',
					date: '2022-04-16T09:25:25.129Z',
					status: 'CANCELLED'
				},
				{
					amount: -931,
					currency: 'EUR',
					date: '2022-04-15T13:48:21.935Z',
					status: 'CANCELLED'
				}
			];

			const [fromDate, toDate, expected] = ["2022-04-14", "2022-04-16", 
				[
					{ date: "14/04/2022", amount: 2586, currency: "EUR" },
					{ date: "15/04/2022", amount: 2472, currency: "EUR" },
					{ date: "16/04/2022", amount: 2770, currency: "EUR" },
				]
			];
		
			const historicalBalances = getHistoricalBalance(fromDate, toDate, transactions);
			expect(historicalBalances).toEqual(expected);
			});
	})
});