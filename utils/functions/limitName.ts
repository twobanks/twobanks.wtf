export default function limitName(
  name: string,
  numberOfVisibleCharacters: number,
): string {
  let truncated = '';
  if (!name) return truncated;
  if (name.length > numberOfVisibleCharacters) {
    truncated = `${name.substring(0, numberOfVisibleCharacters)}...`;
  } else {
    truncated = name;
  }
  return truncated;
}
