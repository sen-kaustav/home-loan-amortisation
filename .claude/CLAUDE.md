# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Investment Dashboard is an [Observable Framework](https://observablehq.com/framework/) application for property investment analysis. It provides two main dashboards:

1. **ROI Calculation** — Calculate net yield and investment returns using detailed cashflow analysis with IRR calculations
2. **Home Loan Amortisation** — Project home loan repayment schedules, tracking principal and interest payments over time

The app analyzes a specific property investment (CGEWHO) with historical incurred cashflows (2018–2026) and forward projections (2026–2029).

## Technology Stack

- **Observable Framework** — Markdown-based framework for interactive dashboards (similar to Jupyter)
- **D3 + Observable Plot** — Visualization and data-driven graphics
- **node-irr** — Internal Rate of Return calculations for yield analysis
- **Node.js 18+** — Runtime

## Commands

| Command          | Purpose                                                |
| ---------------- | ------------------------------------------------------ |
| `npm run dev`    | Start local development server (http://localhost:3000) |
| `npm run build`  | Build static site to `./docs` directory                |
| `npm run deploy` | Deploy to Observable cloud                             |
| `npm run clean`  | Clear Observable cache (`src/.observablehq/cache`)     |
| `npm install`    | Install dependencies                                   |

## Architecture

### Observable Framework Structure

Pages are Markdown files in `src/` with embedded JavaScript:

- **`src/index.md`** — Landing page with links to the two analysis dashboards
- **`src/yieldCalc.md`** — ROI calculation dashboard
- **`src/amortisationCalc.md`** — Loan amortisation dashboard
- **`observablehq.config.js`** — Navigation sidebar configuration

Framework routing is file-based: URL paths map directly to filenames (e.g., `/yieldCalc` → `src/yieldCalc.md`).

### Core Calculation Modules

**`src/generateLoanData.js`**

- `generateLoanData(interestRate, repayLumpsum1, repayLumpsum2, osLoanAmount, monthlyEMIAmount)`
- Generates monthly loan amortisation schedule
- Tracks O/S (outstanding) loan, principal repayment, and interest for each month
- Stops when loan balance reaches zero
- Used by the amortisation dashboard

**`src/incurredCashflows.js`**

- Historical cashflows from 2018–2026
- Includes: property payments, loan EMIs, rental income, taxes, renovations, registry costs
- Separated by source:
  - `cashflowsOwnPayments`
  - `cashflowsHsbcLoan`
  - `cashflowsSbiEMIOrig`
  - `cashflowsSbiEMIRevised`
  - `cashflowsRent`
- Used by ROI calculation for baseline analysis

**`src/projectedCashflows.js`**

- `projectedCashflowsFn(osLoan, monthlyEMIAmount, interestRate, lumpsumRepay, saleValue)`
- Generates projected cashflows from May 2026 to property sale (3-year projection)
- Returns: EMI payments, projected rent, optional lumpsum repayment, final loan payoff, sale proceeds
- Uses continuous compounding for interest calculation: `monthlyRate = (1 + annualRate)^(1/12) - 1`

**`src/utils.js`**

- `generateMonthlyCashflows(...)` — Creates recurring monthly cashflows between dates
- `consolidateCashflows(...)` — Merges multiple cashflow arrays and applies multipliers (sign conventions)
- `currencyFormat(d)` / `currencyFormatAxis(d)` — D3-based rupee formatting with thousands separators
- `monthDifference(startDate, endDate)` — Month count between two dates

### Visualization Modules

**`src/plotOSLoan.js`** — Line chart of outstanding loan balance over time

**`src/plotIntAndPrincipal.js`** — Stacked area chart comparing interest vs. principal portions of EMI

**`src/styles.css`** — Custom styling (grid layout, result cards, table styles)

## Key Design Decisions

### Sign Conventions

Cashflows use a `multiplier` field (default -1) to represent inflows (positive) and outflows (negative) in accounting terms. `consolidateCashflows()` applies these multipliers and sorts by date.

### Interest Rate Handling

- **Amortisation page**: Simple annual rate divided by 12 (`interestRate / 12` monthly)
- **ROI projection**: Continuous compounding monthly rate `(1 + r)^(1/12) - 1`

These different approaches reflect the input data assumptions (EMI calculated with one method, projection with another).

### Observable Framework Variables

Pages use `view()` and `Inputs.*` to create reactive controls. Changing an input automatically recalculates dependent cells:

```js
const interestRate = view(
  Inputs.range([0.08, 0.15], {
    step: 0.001,
    value: 0.091,
    label: "Interest Rate",
  }),
);
```

## File Organization

```
src/
├─ index.md                      (landing page)
├─ yieldCalc.md                  (ROI dashboard)
├─ amortisationCalc.md           (loan schedule dashboard)
├─ generateLoanData.js           (amortisation calculation)
├─ incurredCashflows.js          (historical data)
├─ projectedCashflows.js         (future scenario data)
├─ plotOSLoan.js                 (visualization)
├─ plotIntAndPrincipal.js        (visualization)
├─ utils.js                      (shared utilities)
├─ styles.css                    (custom styles)
└─ data/                         (CSV files, if any)
```

## Important Notes

- **Observable cache**: `src/.observablehq/cache/` is auto-generated; never edit or commit it
- **Output directory**: Builds output to `docs/` (configured in `observablehq.config.js`), used for GitHub Pages
- **Data types**: All dates are JavaScript `Date` objects; cashflows are arrays of `{date, amount, multiplier}` objects
- **ES modules**: Uses `import`/`export` syntax throughout; the framework handles bundling
