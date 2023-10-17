const EventRepository = require("../../src/repositories/event");
const dbHandler = require("../db-handler");

describe("Event Repository", () => {
  beforeAll(async () => await dbHandler.connectDatabase());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  const testEvent = {
    name: "Test Event",
    type: "event",
    summary: "Test Summary",
    description: "Test Description",
    venue: "Test Venue",
    timeline: [
      {
        time: new Date(),
        venue: "Test Venue",
        description: "Test Description",
      },
    ],
    image: "Test Image",
    organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
  };

  describe("create", () => {
    it("should create a new event", async () => {
      const event = testEvent;
      const createdEvent = await EventRepository.create(event);
      expect(createdEvent).toHaveProperty("_id");
      expect(createdEvent).toHaveProperty("name", event.name);
      expect(createdEvent).toHaveProperty("type", event.type);
      expect(createdEvent).toHaveProperty("summary", event.summary);
      expect(createdEvent).toHaveProperty("description", event.description);
      expect(createdEvent).toHaveProperty("venue", event.venue);
      expect(createdEvent).toHaveProperty("timeline");
      createdEvent.timeline.forEach((timePoint, index) => {
        expect(timePoint).toHaveProperty("time", event.timeline[index].time);
        expect(timePoint).toHaveProperty("venue", event.timeline[index].venue);
        expect(timePoint).toHaveProperty(
          "description",
          event.timeline[index].description
        );
      });
      expect(createdEvent).toHaveProperty("image", event.image);
      expect(createdEvent).toHaveProperty("organisation");
    });
  });

  describe("getById", () => {
    it("should get an event by id", async () => {
      const event = testEvent;
      const createdEvent = await EventRepository.create(event);
      const foundEvent = await EventRepository.getById(createdEvent._id);
      expect(foundEvent).toHaveProperty("_id", createdEvent._id);
      expect(foundEvent).toHaveProperty("name", event.name);
      expect(foundEvent).toHaveProperty("type", event.type);
      expect(foundEvent).toHaveProperty("summary", event.summary);
      expect(foundEvent).toHaveProperty("description", event.description);
      expect(foundEvent).toHaveProperty("venue", event.venue);
      expect(foundEvent).toHaveProperty("timeline");
      foundEvent.timeline.forEach((timePoint, index) => {
        expect(timePoint).toHaveProperty("time", event.timeline[index].time);
        expect(timePoint).toHaveProperty("venue", event.timeline[index].venue);
        expect(timePoint).toHaveProperty(
          "description",
          event.timeline[index].description
        );
      });
      expect(foundEvent).toHaveProperty("image", event.image);
      expect(foundEvent).toHaveProperty("organisation");
    });
  });

  describe("getAll", () => {
    describe("extended", () => {
      it("should get all events with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventRepository.create(event);
        const events = await EventRepository.getAll({ extended: true });
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });
    describe("not extended", () => {
      it("should get all events without description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventRepository.create(event);
        const events = await EventRepository.getAll({ extended: false });
        expect(events).toBeInstanceOf(Array);
        expect(events[0].description).toBeUndefined();
        expect(events[0].timeline).toBeUndefined();
      });
    });
  });

  describe("getAllByType", () => {
    describe("extended", () => {
      it("should get all events by type with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventRepository.create(event);
        const events = await EventRepository.getAllByType("event", {
          extended: true,
        });
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("type", "event");
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });
    describe("not extended", () => {
      it("should get all events by type without description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventRepository.create(event);
        const events = await EventRepository.getAllByType("event", {
          extended: false,
        });
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("type", "event");
        expect(events[0].description).toBeUndefined();
        expect(events[0].timeline).toBeUndefined();
      });
    });
  });

  describe("getAllByOrganisation", () => {
    describe("extended", () => {
      it("should get all events by organisation with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventRepository.create(event);
        const events = await EventRepository.getAllByOrganisation(
          "5f7d7e8c8d8f8e8d8c8f8d8f",
          { extended: true }
        );
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("organisation");
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });
    describe("not extended", () => {
      it("should get all events by organisation without description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventRepository.create(event);
        const events = await EventRepository.getAllByOrganisation(
          "5f7d7e8c8d8f8e8d8c8f8d8f",
          { extended: false }
        );
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("organisation");
        expect(events[0].description).toBeUndefined();
        expect(events[0].timeline).toBeUndefined();
      });
    });
  });

  describe("updateById", () => {
    it("should update an event by id", async () => {
      const event = testEvent;
      const createdEvent = await EventRepository.create(event);
      const updatedEvent = {
        name: "Updated Event",
        type: "event",
        summary: "Updated Summary",
        description: "Updated Description",
        venue: "Updated Venue",
        timeline: [
          {
            time: new Date(),
            venue: "Updated Venue",
            description: "Updated Description",
          },
        ],
        image: "Updated Image",
        organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
      };
      const foundEvent = await EventRepository.updateById(
        createdEvent._id,
        updatedEvent
      );
      expect(foundEvent).toHaveProperty("_id", createdEvent._id);
      expect(foundEvent).toHaveProperty("name", updatedEvent.name);
      expect(foundEvent).toHaveProperty("type", updatedEvent.type);
      expect(foundEvent).toHaveProperty("summary", updatedEvent.summary);
      expect(foundEvent).toHaveProperty(
        "description",
        updatedEvent.description
      );
      expect(foundEvent).toHaveProperty("venue", updatedEvent.venue);
      expect(foundEvent).toHaveProperty("timeline");
      foundEvent.timeline.forEach((timePoint, index) => {
        expect(timePoint).toHaveProperty(
          "time",
          updatedEvent.timeline[index].time
        );
        expect(timePoint).toHaveProperty(
          "venue",
          updatedEvent.timeline[index].venue
        );
        expect(timePoint).toHaveProperty(
          "description",
          updatedEvent.timeline[index].description
        );
      });
      expect(foundEvent).toHaveProperty("image", updatedEvent.image);
      expect(foundEvent).toHaveProperty("organisation");
    });
  });

  describe("deleteById", () => {
    it("should delete an event by id", async () => {
      const event = testEvent;
      const createdEvent = await EventRepository.create(event);
      const deletedEvent = await EventRepository.deleteById(createdEvent._id);
      expect(deletedEvent).toHaveProperty("_id", createdEvent._id);
      expect(deletedEvent).toHaveProperty("description", event.description);
      expect(deletedEvent).toHaveProperty("timeline");
      deletedEvent.timeline.forEach((timePoint, index) => {
        expect(timePoint).toHaveProperty("time", event.timeline[index].time);
        expect(timePoint).toHaveProperty("venue", event.timeline[index].venue);
        expect(timePoint).toHaveProperty(
          "description",
          event.timeline[index].description
        );
      });
    });
  });
});
