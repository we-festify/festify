/**
 * Seed the database with fake data. Useful for testing and development.
 * arguments:
 *  --clear, -c: clear the database before seeding
 * --url, -u: use a custom MongoDB URI
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// check for arguments
const args = process.argv.slice(2);
const help = args.includes("--help" || "-h");
const clear = args.includes("--clear" || "-c");
const uriIndex = args.indexOf("--url" || "-u");

// print help
const handlePrintHelp = (help) => {
  if (help) {
    console.log("Usage: node seed.js [options]");
    console.log("Options:");
    console.log("  --help, -h: print this help message");
    console.log("  --clear, -c: clear the database before seeding");
    console.log("  --url, -u: use a custom MongoDB URI");
    process.exit(0);
  }
};

handlePrintHelp(help);

// connect to database
console.log("Connecting to database");
const dbUri =
  uriIndex >= 0 ? args[uriIndex + 1] : process.env.APPLICATION_MONGO_URI;
const db = mongoose.createConnection(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import models
const Organisation = require("../src/models/Organisation")(db);
const User = require("../src/models/User")(db);
const Event = require("../src/models/Event")(db);
const Sponsor = require("../src/models/Sponsor")(db);

// import data
console.log("Importing data");
const users = require("./data/users");
const organisations = require("./data/organisations");
const events = require("./data/events");
const sponsors = require("./data/sponsors");

// clear database
const handleClearDatabase = async () => {
  if (clear) {
    console.log("Clearing database");
    await User.deleteMany({});
    await Organisation.deleteMany({});
    await Event.deleteMany({});
    await Sponsor.deleteMany({});
  }
};

const handleSeedDatabase = async () => {
  // seed database
  console.log("Seeding database");
  console.log("Creating organisations");
  await Organisation.insertMany(organisations);

  const { hashPassword } = require("../src/utils/password");
  for (const user of users) {
    user.passwordHash = await hashPassword(user.password);
    if (user.role === "organiser") {
      const organisation = await Organisation.findOne();
      if (organisation) {
        user.organisation = organisation._id;
      }
    }
  }
  console.log("Creating users");
  await User.insertMany(users);
  for (const event of events) {
    const user = await User.findOne({ role: "organiser" });
    if (user) {
      event.organisation = user.organisation;
    }
  }
  console.log("Creating events");
  await Event.insertMany(events);
  console.log("Creating sponsors");
  await Sponsor.insertMany(sponsors);
};

handleClearDatabase()
  .then(() => handleSeedDatabase())
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
