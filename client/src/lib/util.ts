export function currencyFormat(amount: number) {
  return "$" + (amount / 100).toFixed(2);
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => {
      return (
        (!Array.isArray(value) &&
          value !== "" &&
          value !== null &&
          value !== undefined) ||
        (Array.isArray(value) && value.length !== 0)
      );
    }),
  );
}
