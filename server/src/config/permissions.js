const permissions = {
  admin: {
    user: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    organisation: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    event: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    sponsor: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    announcement: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    entryPass: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  organiser: {
    user: {
      read: true,
      create: false,
      update: true,
      delete: false,
    },
    organisation: {
      read: true,
      create: false,
      update: true,
      delete: false,
    },
    event: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    sponsor: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    announcement: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    entryPass: {
      read: true,
      create: true,
      update: true,
      delete: true,
      checkIn: true,
    },
  },
  user: {
    user: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    organisation: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    event: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    sponsor: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    announcement: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    entryPass: {
      read: true,
      create: true,
      update: false,
      delete: false,
    },
  },
  guest: {
    user: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    organisation: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    event: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    sponsor: {
      read: true,
      create: false,
      update: false,
      delete: false,
    },
    announcement: {
      read: false,
      create: false,
      update: false,
      delete: false,
    },
    entryPass: {
      read: false,
      create: false,
      update: false,
      delete: false,
    },
  },
};

module.exports = permissions;
