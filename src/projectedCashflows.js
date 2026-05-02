import { generateMonthlyCashflows } from "./utils.js";

const projectedEMI = generateMonthlyCashflows({
  amount: 14_100,
  startDate: new Date("2026-06-01"),
  endDate: new Date("2029-05-01"),
});

const projectedRent = generateMonthlyCashflows({
  amount: 20_000,
  startDate: new Date("2026-05-01"),
  endDate: new Date("2029-05-01"),
  multiplier: 1,
});

const projectedSale = {
  amount: 2_00_00_000,
  date: new Date("2029-12-01"),
  multiplier: 1,
};

const projectedLoanRepay = {
  amount: 8_00_000,
  date: new Date("2029-05-01"),
};

export { projectedEMI, projectedRent, projectedSale, projectedLoanRepay };
