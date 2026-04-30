import * as d3 from "../_node/d3@7.9.0/index.ca4e4e1f.js";

function currencyLocale(format) {
    return d3
        .formatLocale({
            decimal: ".",
            thousands: ",",
            grouping: [3, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            currency: ["₹", ""],
        })
        .format(format);
}

function currencyFormat(d) {
    return currencyLocale("$,.0f")(d);
}

function currencyFormatAxis(d) {
    return currencyLocale(",.0f")(d);
}

export { currencyFormat, currencyFormatAxis };
