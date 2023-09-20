export function setFormServerError<T>(
  errors: { [P in keyof T]?: string },
  setError: (fieldName: string, error: { type: string; message: string }) => void,
): void {
  return Object.keys(errors).forEach((key) => {
    setError(key, {
      type: 'server',
      message: errors[key as keyof T]!,
    });
  });
}
