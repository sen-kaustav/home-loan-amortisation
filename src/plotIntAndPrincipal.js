import * as Plot from "@observablehq/plot";
import { currencyFormat, currencyFormatAxis } from "./utils.js";

function plotIntAndPrincipal(loanData) {
  return Plot.plot({
    title: "Projection of interest and principal repayments",
    marginLeft: 70,
    marginBottom: 50,
    style: { fontSize: "15px" },
    y: { label: null, tickFormat: currencyFormatAxis },
    grid: true,
    x: { label: "Projected Years", labelOffset: 45 },
    marks: [
      Plot.line(loanData, {
        x: "year_frac",
        y: "Interest",
        stroke: "coral",
      }),
      Plot.dot(
        loanData,
        Plot.pointer({
          x: "year_frac",
          y: "Interest",
          fill: "coral",
          r: 4,
          tip: {
            format: {
              x: false,
              y: (d) => currencyFormat(d),
            },
          },
        }),
      ),
      Plot.line(loanData, {
        x: "year_frac",
        y: "Principal repay",
        stroke: "cornflowerblue",
      }),
      Plot.dot(
        loanData,
        Plot.pointer({
          x: "year_frac",
          y: "Principal repay",
          fill: "cornflowerblue",
          r: 4,
          tip: {
            format: {
              x: false,
              y: (d) => currencyFormat(d),
            },
          },
        }),
      ),
      Plot.ruleX([0]),
      Plot.ruleY([0]),
    ],
  });
}

export { plotIntAndPrincipal };
