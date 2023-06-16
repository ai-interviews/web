export const formatTime = ({ seconds }: { seconds: number }) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours}:`;
  }

  if (timeString.length > 0 || minutes > 0) {
    // Add padding to ensure minutes are always two digits
    timeString += `${minutes.toString().padStart(2, "0")}:`;
  }

  // Add padding to ensure seconds are always two digits
  timeString += remainingSeconds.toString().padStart(2, "0");

  return timeString;
};
