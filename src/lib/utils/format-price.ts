export default function formatPrice(value: number) {
  return Math.round(Number(value || 0)).toLocaleString("fa-IR");
}
