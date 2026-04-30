---
toc: false
---

```js
import { generateLoanData } from "./generateLoanData.js";
import { plotOSLoan } from "./plotOSLoan.js";
import { plotIntAndPrincipal } from "./plotIntAndPrincipal.js";
import { html } from "npm:htl";
```

# Home Loan Amortisation

---

## Inputs

```js
const osLoanAmount = view(
    Inputs.range([4_00_000, 10_30_000], {
        label: "Current o/s loan amount",
        value: 10_30_000,
        step: 10_000,
    }),
);
```

```js
const monthlyEMIAmount = view(
    Inputs.number({
        label: "Monthly EMI amount",
        value: 14_041,
        disabled: true,
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

Lumpsum re-payment after:

```js
const repayLumpsum1 = view(
    Inputs.range([0, 5_00_000], { label: "1 year", step: 10_000, value: 0 }),
);
```

```js
const repayLumpsum2 = view(
    Inputs.range([0, 5_00_000], { label: "2 years", step: 10_000, value: 0 }),
);
```

## Result

```js
display(
    html` <div class="result">
        Loan expected to be repaid in
        <span class="date">${loanRepayYears} years</span>
        ${loanRepayMonths > 0
            ? html` and
                  <span class="date">${loanRepayMonths} months</span>`
            : ""}
    </div>`,
);
```

```js
const loanData = generateLoanData(
    interestRate,
    repayLumpsum1,
    repayLumpsum2,
    osLoanAmount,
    monthlyEMIAmount,
);

const loanRepayYears = Math.floor(loanData.at(-1).year_frac);

const loanRepayMonths = Math.round((loanData.at(-1).year_frac % 1) * 12);
```

<div class="grid grid-cols-2">
    <div>${plotOSLoan(loanData)}</div>
    <div>${plotIntAndPrincipal(loanData)}</div>
</div>
