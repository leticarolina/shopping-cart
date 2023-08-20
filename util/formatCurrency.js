// -----separate file for formatCurrency function

// Intl stands for international which has features to set currencies, translating etc
//Price format: using Intl to format the number on the object as "priceCents": 1600 to an USD price
const priceFormater = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export default function formatCurrency(amount) {
  //need to format again
  return priceFormater.format(amount / 100);
}
