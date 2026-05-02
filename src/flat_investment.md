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

const totalIncurredOutflow = Math.abs(
  d3.sum(
    d3.filter(incurredCashflows, (d) => d.amount * d.multiplier < 0),
    (d) => d.amount * d.multiplier,
  ),
);

const totalProjectedOutflow = Math.abs(
  d3.sum(
    d3.filter(projectedCashflows, (d) => d.amount * d.multiplier < 0),
    (d) => d.amount * d.multiplier,
  ),
);

const totalIncurredInflow = d3.sum(
  d3.filter(incurredCashflows, (d) => d.amount * d.multiplier > 0),
  (d) => d.amount * d.multiplier,
);

const totalProjectedInflow = d3.sum(
  d3.filter(projectedCashflows, (d) => d.amount * d.multiplier > 0),
  (d) => d.amount * d.multiplier,
);

const totalOutflow = totalIncurredOutflow + totalProjectedOutflow;
const totalInflow = totalIncurredInflow + totalProjectedInflow;

html`
  <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
    <thead>
      <tr style="background-color: #f0f0f0;">
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;"></th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Incurred</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Projected</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Outflow</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormat(-totalIncurredOutflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormat(-totalProjectedOutflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormat(-totalOutflow)}</td>
      </tr>
      <tr style="background-color: #f9f9f9;">
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Inflow</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormat(totalIncurredInflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormat(totalProjectedInflow)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${currencyFormat(totalInflow)}</td>
      </tr>
    </tbody>
  </table>
`;
```

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

```js
display(d3.sum(cashflows, (d) => d.amount));
```

IRR calculation

```js
const XIRR = xirr(cashflows);
display(XIRR);
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

import { consolidateCashflows, currencyFormat } from "./utils.js";

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
