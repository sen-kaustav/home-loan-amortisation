# CGEWHO Flat investment

Based on incurred cashflows till May 2026 and projections beyond that.

```js
const cashflowsSbiIntAndAdhoc = await FileAttachment(
  "data/sbi_int_only_and_adhoc.csv",
).csv({ typed: true });
```

## Projection assumptions

TODO

## Result

Cashflow summary:

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

<table style="border-collapse: collapse; margin: 10px 0; font-family: var(--monospace)">
    <thead>
      <tr style="background-color: #f0f0f0;">
        <th style="background-color: white;"></th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Incurred</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Projected</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Outflow</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormatAxis(totalIncurredOutflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormatAxis(totalProjectedOutflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormatAxis(totalOutflow)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Inflow</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormatAxis(totalIncurredInflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormatAxis(totalProjectedInflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormatAxis(totalInflow)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Net</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #eee"></td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #eee"></td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold">${currencyFormatAxis(totalInflow + totalOutflow)}</td>
      </tr>
    </tbody>
  </table>

All cashflows:

```js
const cashflows = consolidateCashflows(
  cashflowsHsbcLoan,
  cashflowsOwnPayments,
  cashflowsSbiEMIOrig,
  cashflowsSbiEMIRevised,
  cashflowsSbiIntAndAdhoc,
  cashflowsRent,
  projectedEMI,
  projectedRent,
  projectedSale,
  projectedLoanRepay,
);
```

```js
display(cashflows);
```

IRR calculation

```js
const { days, rate } = xirr(cashflows);
display(convertRate(rate, "year"));
```

```js
import {
  cashflowsHsbcLoan,
  cashflowsOwnPayments,
  cashflowsSbiEMIOrig,
  cashflowsSbiEMIRevised,
  cashflowsRent,
} from "./incurredCashflows.js";

import {
  projectedEMI,
  projectedRent,
  projectedSale,
  projectedLoanRepay,
} from "./projectedCashflows.js";

import { consolidateCashflows, currencyFormatAxis } from "./utils.js";

import irrModule from "node-irr";
const { xirr, convertRate } = irrModule;
```

<!--
```js
const chartGroup = view(
  Inputs.select(["year", "month"], {
    value: "year",
    label: "Select grouping type",
  }),
);
```

```js
display(
  Plot.plot({
    marks: [
      Plot.rectY(
        existingCashflows,
        Plot.binX(
          { y: "sum" },
          {
            x: "date",
            y: "amount",
            interval: chartGroup,
            tip: true,
            fill: "steelblue",
          },
        ),
      ),
      Plot.ruleY([0]),
    ],
    marginLeft: 60,
  }),
);
``` -->
