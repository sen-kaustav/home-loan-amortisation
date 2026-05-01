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

function generateMonthlyCashflows({ amount, startDate, numMonths, endDate }) {
    let months = numMonths;

    if (startDate && endDate) {
        months = monthDifference(startDate, endDate);
    }

    const cashflows = Array.from({ length: months }, (_, i) => {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
        return { date, amount };
    });

    return cashflows;
}

function monthDifference(startDate, endDate) {
    return (
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth() + 1)
    );
}

export {
    currencyFormat,
    currencyFormatAxis,
    generateMonthlyCashflows,
    monthDifference,
};
