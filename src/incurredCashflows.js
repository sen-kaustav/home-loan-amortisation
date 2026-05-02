import { generateMonthlyCashflows } from "./utils.js";

const cashflowsOwnPayments = [
  {
    date: new Date("2018-12-01"),
    amount: 1_80_000,
  },
  {
    date: new Date("2019-01-01"),
    amount: 6_51_000,
  },
  {
    // TDS payment
    date: new Date("2019-01-01"),
    amount: 36_666.67,
  },
  {
    date: new Date("2019-09-01"),
    amount: 1_20_000,
  },
  {
    date: new Date("2020-01-01"),
    amount: 1_00_000,
  },
  {
    // includes final residual + TDS amount
    date: new Date("2020-03-01"),
    amount: 79_264,
  },
  {
    // Registry stamp-duty
    date: new Date("2023-03-01"),
    amount: 2_95_800,
  },
  {
    // renovations
    date: new Date("2023-05-01"),
    amount: 2_00_000,
  },
];

const cashflowsHsbcLoan = generateMonthlyCashflows({
  amount: 17_294,
  startDate: new Date("2020-04-01"),
  numMonths: 60,
});

const cashflowsSbiEMIOrig = generateMonthlyCashflows({
  amount: 27_719,
  startDate: new Date("2020-08-01"),
  endDate: new Date("2025-05-01"),
});

const cashflowsSbiEMIRevised = generateMonthlyCashflows({
  amount: 14_100,
  startDate: new Date("2025-06-01"),
  endDate: new Date("2026-05-01"),
});

const cashflowsRent = [
  generateMonthlyCashflows({
    amount: 16_500,
    startDate: new Date("2023-05-01"),
    endDate: new Date("2024-04-01"),
    multiplier: 1,
  }),
  generateMonthlyCashflows({
    amount: 18_000,
    startDate: new Date("2024-05-01"),
    endDate: new Date("2026-04-01"),
    multiplier: 1,
  }),
].flat();

export {
  cashflowsOwnPayments,
  cashflowsHsbcLoan,
  cashflowsSbiEMIOrig,
  cashflowsSbiEMIRevised,
  cashflowsRent,
};
