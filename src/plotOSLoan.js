import * as Plot from "@observablehq/plot";
import { currencyFormat, currencyFormatAxis } from "./utils.js";

function plotOSLoan(loanData) {
    return Plot.plot({
        title: "Projection of outstanding loan balance",
        marginLeft: 60,
        marginBottom: 50,
        style: { fontSize: "12px" },
        y: { label: null, tickFormat: currencyFormatAxis },
        grid: true,
        x: { label: "Projected Years", labelOffset: 35 },
        marks: [
            Plot.line(loanData, {
                x: "year_frac",
                y: "O/S Loan",
                stroke: "indianred",
            }),
            Plot.dot(
                loanData,
                Plot.pointer({
                    x: "year_frac",
                    y: "O/S Loan",
                    fill: "indianred",
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

export { plotOSLoan };
