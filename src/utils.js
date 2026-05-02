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

function generateMonthlyCashflows({
  amount,
  startDate,
  numMonths,
  endDate,
  ...attr
}) {
  let months = numMonths;

  if (startDate && endDate) {
    months = monthDifference(startDate, endDate);
  }

  const cashflows = Array.from({ length: months }, (_, i) => {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    return { date, amount, ...attr };
  });

  return cashflows;
}

function monthDifference(startDate, endDate) {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth() + 1)
  );
}

function consolidateCashflows(...arrays) {
  let cashflows = arrays.flat().map((obj) => ({
    ...obj,
    multiplier: obj.multiplier ?? -1,
  }));

  cashflows = cashflows
    .map((d) => ({
      date: d.date,
      amount: d.amount * d.multiplier,
    }))
    .sort((a, b) => b.date - a.date);
  return cashflows;
}

export {
  currencyFormat,
  currencyFormatAxis,
  generateMonthlyCashflows,
  monthDifference,
  consolidateCashflows,
};
