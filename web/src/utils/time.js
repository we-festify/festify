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

export const ceilHour = (timestamp) => {
  const date = new Date(timestamp);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(999);
  return date.getTime() + 1;
};

export const floorHour = (timestamp) => {
  const date = new Date(timestamp);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

export const formatDateTimePassed = (timestamp) => {
  const now = new Date().getTime();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) {
    return "Just now";
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  return formatDate(timestamp);
};
