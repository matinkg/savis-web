// محاسبه قیمت نهایی بر اساس فرمول
export function calculateFinalGoldPrice(
  weight: any,
  goldPrice: number,
  wages: number,
  sellerProfit: number,
  tax: number,
  fixed_price: number
): number {
  const basePrice = weight * goldPrice;
  return basePrice + wages + sellerProfit + tax + fixed_price;
}
