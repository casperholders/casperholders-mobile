export default function truncateInMiddle(str, size = 15, separator = '...') {
  if (str.length <= size) {
    return str;
  }

  const sepLen = separator.length;
  const charsToShow = size - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return `${str.substr(0, frontChars)}${separator}${str.substr(str.length - backChars)}`;
}
