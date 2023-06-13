export const formatTime = ({ seconds }: { seconds: number }) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours}:`;
  }

  if (timeString.length > 0 || minutes > 0) {
    timeString += `${minutes}:`;
  }

  timeString += remainingSeconds;

  return timeString;
};
