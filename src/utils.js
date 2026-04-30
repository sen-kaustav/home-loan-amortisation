import * as d3 from "d3";

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
