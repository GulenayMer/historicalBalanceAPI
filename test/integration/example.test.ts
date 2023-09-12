import request from "supertest";
import app from "../../src/app";

describe("Balance and Transactions API", () => {
	describe("GET /balances", () => {
		it("should be able to get the boilerplate response", async () => {
			const response = await request(app).get("/balances");
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
			{
				amount: 10000,
				currency: "EUR",
				date: "2022-06-30T23:59:59.577Z"
			});
	});
	});

	describe("GET /historical-balances?from=2022-01-03&to=2022-01-05&sort=desc", () => {
		it("should be able to get the boilerplate response", async () => {
			const response = await request(app).get("/historical-balances?from=2022-01-03&to=2022-01-05&sort=desc");
			expect(response.status).toBe(200);
			expect(response.body).toEqual([
			{
				date:"05/01/2022",
				amount:-1908,
				currency:"EUR"
			},
			{
				date:"04/01/2022",
				amount:-1756,
				currency:"EUR"
			},
			{
				date:"03/01/2022",
				amount:-28,
				currency:"EUR"
			}
			]);
		});
	});

	describe("GET /historical-balances?from=2022-04-14&to=2022-04-16&sort=desc", () => {
		it("should be able to get the boilerplate response", async () => {
			const response = await request(app).get("/historical-balances?from=2022-04-14&to=2022-04-16&sort=desc");
			expect(response.status).toBe(200);
			expect(response.body).toEqual([
			{
				date:"14/04/2022",
				amount:2586,
				currency:"EUR"
			},
			{
				date:"15/04/2022",
				amount:2472,
				currency:"EUR"
			},
			{
				date:"16/04/2022",
				amount:2770,
				currency:"EUR"
			}
			]);
		});
	});
});
