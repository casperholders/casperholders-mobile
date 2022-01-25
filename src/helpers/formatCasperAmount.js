import Big from 'big.js';

export default function formatCasperAmount(amount) {
  let formattedAmount;
  if (amount !== undefined) {
    try {
      formattedAmount = Big(amount).toFormat(5);
    } catch (_) {
      formattedAmount = '-';
    }
  } else {
    formattedAmount = '-';
  }

  return `${formattedAmount} CSPR`;
}
