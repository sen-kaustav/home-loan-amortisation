# CGEWHO Flat investment

Based on incurred cashflows till May 2026 and projections beyond that.

```js
import {
    cashflowsHsbcLoan,
    cashflowsOwnPayments,
    cashflowsSbiEMIOrig,
    cashflowsSbiEMIRevised,
} from "./generatedCashflows.js";
```

```js
const cashflowsSbiIntAndAdhoc = await FileAttachment(
    "data/sbi_int_only_and_adhoc.csv",
).csv({ typed: true });
display(cashflowsSbiIntAndAdhoc);
```

```js
display(cashflowsSbiEMIRevised);
```
