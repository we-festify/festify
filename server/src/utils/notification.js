const createUpdateEventNotification = (event) => {
  const { name } = event;
  const message = `Event ${name} details has been updated by the organiser`;
  const payload = {
    title: "Event updated",
    body: message,
    url: `/events/${event._id}`,
    to: "all",
    timestamp: Date.now(),
  };
  return payload;
};

module.exports = {
  createUpdateEventNotification,
};
