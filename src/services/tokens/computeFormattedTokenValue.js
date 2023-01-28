import computeTokenValue from '@/services/tokens/computeTokenValue';

/**
 * Compute a formatted token amount value from a mixed value.
 *
 * @param {undefined|string|number|object} value
 * @param {object|undefined} token
 *
 * @returns {{ value: string, isAmount: boolean }}
 */
export default function computeFormattedTokenValue(value, token = undefined) {
  const data = computeTokenValue(value);
  if (data.isAmount) {
    const valueWithUnit = token
      ? `${data.value}\xa0${token.shortName}`
      : `${data.value}\xa0CSPR`;

    return {
      value: valueWithUnit, isAmount: data.isAmount,
    };
  }

  return data;
}
