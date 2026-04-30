function generateLoanData(
    interestRate,
    repayLumpsum1,
    repayLumpsum2,
    osLoanAmount,
    monthlyEMIAmount,
) {
    const monthlyInterestRate = interestRate / 12;
    const lumpsum = { 12: repayLumpsum1, 24: repayLumpsum2 };

    let arrayOSLoan = [osLoanAmount];
    let loanData = [
        {
            Interest: null,
            "Principal repay": null,
            "O/S Loan": osLoanAmount,
            year_frac: 0,
        },
    ];
    let mthIndex = 1;

    while (arrayOSLoan.at(-1) > 0) {
        const interest = arrayOSLoan.at(-1) * monthlyInterestRate;
        const principal = monthlyEMIAmount - interest;
        const osLoan =
            arrayOSLoan.at(-1) - principal - (lumpsum[mthIndex] ?? 0);

        arrayOSLoan.push(osLoan);
        loanData.push({
            Interest: interest,
            "Principal repay": principal,
            "O/S Loan": osLoan,
            year_frac: mthIndex / 12,
        });
        mthIndex++;
    }
    loanData.at(-1)["O/S Loan"] = 0;
    return loanData;
}

export { generateLoanData };
