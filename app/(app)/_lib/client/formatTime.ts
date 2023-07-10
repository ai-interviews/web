export const formatTime = ({ seconds }: { seconds: number }) => {
  const date = new Date(null as any);

  date.setSeconds(seconds);

  if (seconds < 3600) {
    return date.toISOString().slice(14, 19);
  }

  return date.toISOString().slice(11, 19);
};
