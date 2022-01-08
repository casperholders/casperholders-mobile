import Big from 'big.js';
import { useEffect, useState } from 'react';

function formatAmount(amount) {
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

export default function useFormattedAmount(amount) {
  const [formattedAmount, setFormattedAmount] = useState(formatAmount(undefined));

  useEffect(() => {
    setFormattedAmount(formatAmount(amount));
  }, [amount]);

  return formattedAmount;
}
