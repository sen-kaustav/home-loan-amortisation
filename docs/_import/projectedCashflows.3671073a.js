const projStartDate = new Date("2026-05-01");
const projRepayDate = new Date("2027-05-01");
const projLength = 36; // 3 years

const projSaleDate = new Date(projStartDate);
projSaleDate.setMonth(projStartDate.getMonth() + projLength);

function projectedCashflowsFn(
  osLoan,
  monthlyEMIAmount,
  interestRate,
  lumpsumRepay,
  saleValue,
) {
  const monthlyRate = (1 + interestRate) ** (1 / 12) - 1;

  let projOSLoan = osLoan; // projected outstanding loan
  let projDate = new Date(projStartDate);

  let projectedEMI = [],
    projectedRent = [{ date: projStartDate, amount: 20_000, multiplier: 1 }];

  for (let t = 1; projOSLoan > 0 && t <= projLength; t++) {
    projDate.setMonth(projDate.getMonth() + 1);

    projOSLoan = Math.max(
      projOSLoan * (1 + monthlyRate) -
        monthlyEMIAmount -
        lumpsumRepay * (+projDate === +projRepayDate),
      0,
    );

    console.log({ projOSLoan, t });

    projectedEMI.push({
      date: projDate,
      amount: monthlyEMIAmount,
    });

    projectedRent.push({
      date: projDate,
      amount: 20_000,
      multiplier: 1,
    });
  }

  const projectedLumpsumRepay = {
    date: projRepayDate,
    amount: lumpsumRepay,
  };

  const projectedLoanRepay = {
    date: projDate,
    amount: projOSLoan,
  };

  const projectedSale = {
    date: projSaleDate,
    amount: saleValue,
    multiplier: 1,
  };

  return {
    projectedEMI,
    projectedRent,
    projectedLumpsumRepay,
    projectedLoanRepay,
    projectedSale,
  };
}

export { projectedCashflowsFn };
