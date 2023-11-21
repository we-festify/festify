export const getGreetings = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  if (hour < 18) {
    return "Good afternoon";
  }
  return "Good evening";
};

export const formatTime = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  } catch (error) {
    return "";
  }
};

export const formatDate = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return "";
  }
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} - ${formatTime(date)}`;
};
