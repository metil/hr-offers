export const timestampToDateString = (timestamp: string | undefined): string => {
  return timestamp ? new Date(Number(timestamp))
    .toLocaleDateString(
      undefined,
      { year: 'numeric', month: 'long', day: 'numeric' }
    ) : ''
}
