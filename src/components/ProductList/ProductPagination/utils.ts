export function calculatePagesTotal(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

export function calculatePageNumber(total: number, limit: number, offset: number): number {
  return offset >= total ? -1 : parseInt(String(offset / limit)) + 1;
}

export function getOffset(pageNumber: number, pageLimit: number): number {
  return (pageNumber - 1) * pageLimit;
}
