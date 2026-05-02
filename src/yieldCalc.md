---
toc: false
---

# ROI Calculation

Based on incurred cashflows till May 2026 and projections beyond that.

```js
const cashflowsSbiIntAndAdhoc = await FileAttachment(
  "data/sbi_int_only_and_adhoc.csv",
).csv({ typed: true });
```

## Projection Assumptions

The projection assumes that the property will be sold in three years' time, i.e., by December 2029.

```js
const osLoan = view(
  Inputs.number({
    label: "O/S Loan (as at May 2026)",
    value: 10_30_000,
    disabled: true,
    width: 125,
  }),
);
```

```js
const monthlyEMIAmount = view(
  Inputs.number({
    label: "Monthly EMI amount",
    value: 14_041,
    disabled: true,
    width: 125,
  }),
);
```

```js
const interestRate = view(
  Inputs.range([0.08, 0.15], {
    step: 0.001,
    value: 0.091,
    label: "Interest Rate",
  }),
);
```

```js
const lumpsumRepay = view(
  Inputs.range([0, 7_00_000], {
    step: 50_000,
    value: 5_00_000,
    label: html`<span>Lumpsum repayment<br />(after 1-year)</span>`,
  }),
);
```

```js
const saleValue = view(
  Inputs.range([1_00_00_000, 2_50_00_000], {
    step: 10_00_000,
    value: 1_50_00_000,
    label: "Expected sale value",
    width: 300,
  }),
);
```

## Result

<div class="grid grid-cols-3">
  <div class="card result-box">
    <span>
      <h1 style="font-size: 1.1rem">Total Profit</h1>
      <h2 style="font-size: 0.9rem; color: #888; margin-bottom: 0px"><i>Undiscounted</i></h2>
    </span>
    <span class="result-value">
      ${currencyFormat(totalInflow + totalOutflow)}
    </span>
  </div>
  <div class="card result-box">
    <span>
      <h1 style="font-size: 1.1rem">Net Yield</h1>
      <h2 style="font-size: 0.9rem; color: #888; margin-bottom: 0px"><i>Per Annum</i></h2>
    </span>
    <span class="result-value">
      ${d3.format(".2%")(convertRate(rate, "year"))}
    </span>
  </div>
</div>

### Cashflow Summary

<table class="cashflow-summary-table">
    <thead>
      <tr class="table-header">
        <th style="background: white"></th>
        <th>Incurred</th>
        <th>Projected</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="label">Outflow</td>
        <td class="number">${currencyFormatAxis(totalIncurredOutflow)}</td>
        <td class="number">${currencyFormatAxis(totalProjectedOutflow)}</td>
        <td class="number">${currencyFormatAxis(totalOutflow)}</td>
      </tr>
      <tr>
        <td class="label">Inflow</td>
        <td class="number">${currencyFormatAxis(totalIncurredInflow)}</td>
        <td class="number">${currencyFormatAxis(totalProjectedInflow)}</td>
        <td class="number">${currencyFormatAxis(totalInflow)}</td>
      </tr>
      <tr class="last-row">
        <td class="label">Net</td>
        <td></td>
        <td></td>
        <td class="number">${currencyFormatAxis(totalInflow + totalOutflow)}</td>
      </tr>
    </tbody>
</table>

```js
const {
  projectedEMI,
  projectedRent,
  projectedLumpsumRepay,
  projectedLoanRepay,
  projectedSale,
} = projectedCashflowsFn(
  osLoan,
  monthlyEMIAmount,
  interestRate,
  lumpsumRepay,
  saleValue,
);
```

```js
const incurredCashflows = consolidateCashflows(
  cashflowsHsbcLoan,
  cashflowsOwnPayments,
  cashflowsSbiEMIOrig,
  cashflowsSbiEMIRevised,
  cashflowsSbiIntAndAdhoc,
  cashflowsRent,
);

const projectedCashflows = consolidateCashflows(
  projectedEMI,
  projectedRent,
  projectedSale,
  projectedLoanRepay,
);

const totalIncurredOutflow = d3.sum(
  d3.filter(incurredCashflows, (d) => d.amount < 0),
  (d) => d.amount,
);

const totalProjectedOutflow = d3.sum(
  d3.filter(projectedCashflows, (d) => d.amount < 0),
  (d) => d.amount,
);

const totalIncurredInflow = d3.sum(
  d3.filter(incurredCashflows, (d) => d.amount > 0),
  (d) => d.amount,
);

const totalProjectedInflow = d3.sum(
  d3.filter(projectedCashflows, (d) => d.amount > 0),
  (d) => d.amount,
);

const totalOutflow = totalIncurredOutflow + totalProjectedOutflow;
const totalInflow = totalIncurredInflow + totalProjectedInflow;
```

```js
const { days, rate } = xirr([incurredCashflows, projectedCashflows].flat());
```

```js
import {
  cashflowsHsbcLoan,
  cashflowsOwnPayments,
  cashflowsSbiEMIOrig,
  cashflowsSbiEMIRevised,
  cashflowsRent,
} from "./incurredCashflows.js";

import { projectedCashflowsFn } from "./projectedCashflows.js";

import {
  consolidateCashflows,
  currencyFormat,
  currencyFormatAxis,
} from "./utils.js";

import irrModule from "node-irr";
const { xirr, convertRate } = irrModule;
```
