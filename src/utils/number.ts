export function formatCurrency(amount: number, currency: string) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency,
  });
}
