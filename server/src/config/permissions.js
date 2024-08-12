const actions = [
  // User
  "user:read",
  "user:create",
  "user:update",
  "user:updateSelf",
  "user:delete",
  "user:deleteSelf",

  // Organisation
  "organisation:read",
  "organisation:create",
  "organisation:update",
  "organisation:updateSelf",
  "organisation:delete",

  // Event
  "event:read",
  "event:create",
  "event:update",
  "event:updateSelf",
  "event:delete",
  "event:deleteSelf",

  // Sponsor
  "sponsor:read",
  "sponsor:create",
  "sponsor:update",
  "sponsor:delete",

  // Announcement
  "announcement:read",
  "announcement:create",
  "announcement:delete",
  "announcement:deleteSelf",

  // Entry Pass
  "entryPass:read",
  "entryPass:purchase",
  "entryPass:checkIn",

  // Location
  "marker:create",
  "marker:read",
  "marker:update",
  "marker:updateSelf",
  "marker:delete",
  "marker:deleteSelf",

  // Payment
  "payment:read",

  // Permissions
  "permissions:read",
  "permissions:update",

  // Feature Flags
  "features:read",
  "features:toggle",

  // Banners
  "banners:read",
  "banners:create",
  "banners:update",
  "banners:delete",

  // Notification
  "notification:send",
];

const defaultAdminPerms = actions; // Admin has all permissions

// will be populated by the database
// at the start of the application
const permissions = {
  admin: defaultAdminPerms,
  organiser: [],
  user: [],
  guest: [],
};

module.exports = {
  actions,
  permissions,
};
