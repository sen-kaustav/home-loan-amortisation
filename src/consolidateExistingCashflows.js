export function consolidateExistingCashflows(...arrays) {
    return arrays.flat().map((obj) => ({
        ...obj,
        multiplier: obj.multiplier ?? -1,
    }));
}
