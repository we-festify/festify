const createNotificationPayload = ({ title, body, redirectUrl, imageUrl }) => {
  const notification = {
    title,
    body,
  };
  const options = {
    webpush: {
      fcm_options: {
        link: redirectUrl,
      },
      headers: {
        image: imageUrl,
      },
    },
  };
  return [notification, options];
};

module.exports = {
  createNotificationPayload,
};
