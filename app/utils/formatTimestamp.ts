export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(); // Adjust the date format as desired
};