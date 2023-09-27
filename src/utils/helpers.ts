export function removeTags(str: string): string {
  if (str === null || str === '') {
    return str;
  } else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, '');
}
