const EventService = require("../../src/services/event");
const dbHandler = require("../db-handler");

describe("Event Service", () => {
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
    organisation: "5f8f8d4f9d9e5d1f7c9d4d9e",
  };

  describe("create", () => {
    describe("When a required field is missing", () => {
      describe("When name is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.name;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: name"
          );
        });
      });

      describe("When type is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.type;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: type"
          );
        });
      });

      describe("When summary is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.summary;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: summary"
          );
        });
      });

      describe("When description is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.description;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: description"
          );
        });
      });

      describe("When venue is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.venue;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: venue"
          );
        });
      });

      describe("When timeline is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.timeline;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: timeline"
          );
        });
      });

      describe("When image is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.image;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: image"
          );
        });
      });

      describe("When organisation is missing", () => {
        it("should throw an error", async () => {
          const event = { ...testEvent };
          delete event.organisation;
          await expect(EventService.create(event)).rejects.toThrow(
            "Missing fields: organisation"
          );
        });
      });
    });

    describe("When all required fields are provided", () => {
      it("should create a new event", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        expect(createdEvent).toHaveProperty("_id");
        expect(createdEvent).toHaveProperty("name", event.name);
        expect(createdEvent).toHaveProperty("type", event.type);
        expect(createdEvent).toHaveProperty("summary", event.summary);
        expect(createdEvent).toHaveProperty("description", event.description);
        expect(createdEvent).toHaveProperty("venue", event.venue);
        expect(createdEvent).toHaveProperty("timeline");
        createdEvent.timeline.forEach((timePoint, index) => {
          expect(timePoint).toHaveProperty("time", event.timeline[index].time);
          expect(timePoint).toHaveProperty(
            "venue",
            event.timeline[index].venue
          );
          expect(timePoint).toHaveProperty(
            "description",
            event.timeline[index].description
          );
        });
        expect(createdEvent).toHaveProperty("image", event.image);
        expect(createdEvent).toHaveProperty("organisation");
      });
    });
  });

  describe("getById", () => {
    describe("When an event with the given id does not exist", () => {
      it("should throw an error", async () => {
        const id = "5f8f8d4f9d9e5d1f7c9d4d9e";
        //giving promice as null
        expect(await EventService.getById(id)).toBe(null);
      });
    });

    describe("When an event with the given id exists", () => {
      it("should return the event", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const foundEvent = await EventService.getById(createdEvent._id);
        expect(foundEvent).toHaveProperty("_id", createdEvent._id);
        expect(foundEvent).toHaveProperty("name", event.name);
        expect(foundEvent).toHaveProperty("type", event.type);
        expect(foundEvent).toHaveProperty("summary", event.summary);
        expect(foundEvent).toHaveProperty("description", event.description);
        expect(foundEvent).toHaveProperty("venue", event.venue);
        expect(foundEvent).toHaveProperty("timeline");
        foundEvent.timeline.forEach((timePoint, index) => {
          expect(timePoint).toHaveProperty("time", event.timeline[index].time);
          expect(timePoint).toHaveProperty(
            "venue",
            event.timeline[index].venue
          );
          expect(timePoint).toHaveProperty(
            "description",
            event.timeline[index].description
          );
        });
        expect(foundEvent).toHaveProperty("image", event.image);
        expect(foundEvent).toHaveProperty("organisation");
      });
    });
  });

  describe("getAll", () => {
    describe("When there are no events", () => {
      it("should return an empty array", async () => {
        const events = await EventService.getAll({ extended: false });
        expect(events).toBeInstanceOf(Array);
        expect(events.length).toBe(0);
      });
    });

    describe("When extended is false", () => {
      it("should return all events without description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const events = await EventService.getAll({ extended: false });
        expect(events).toBeInstanceOf(Array);
        expect(events[0].description).toBeUndefined();
        expect(events[0].timeline).toBeUndefined();
      });
    });

    describe("When extended is true", () => {
      it("should return all events with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const events = await EventService.getAll({ extended: true });
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });
  });

  describe("getAllByType", () => {
    describe("When there are no events of the given type", () => {
      it("should return an empty array", async () => {
        const events = await EventService.getAllByType("event", {
          extended: false,
        });
        expect(events).toBeInstanceOf(Array);
        expect(events.length).toBe(0);
      });
    });

    describe("When extended is false", () => {
      it("should return all events of the given type without description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const events = await EventService.getAllByType("event", {
          extended: false,
        });
        expect(events).toBeInstanceOf(Array);
        expect(events[0].description).toBeUndefined();
        expect(events[0].timeline).toBeUndefined();
      });
    });

    describe("When extended is true", () => {
      it("should return all events of the given type with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const events = await EventService.getAllByType("event", {
          extended: true,
        });
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });

    describe("when there are multiple event of different types", () => {
      it("should return all events of the given type with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        event.type = "competition";
        const createdEvent2 = await EventService.create(event);
        const events = await EventService.getAllByType("event", {
          extended: true,
        });
        expect(events).toBeInstanceOf(Array);
        expect(events.length).toBe(1);
        expect(events[0].type).toBe("event");
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });
  });

  describe("getAllByOrganisation", () => {
    describe("When there are no events by the given organisation", () => {
      it("should return an empty array", async () => {
        const events = await EventService.getAllByOrganisation(
          "5f8f8d4f9d9e5d1f7c9d4d9e",
          { extended: false }
        );
        expect(events).toBeInstanceOf(Array);
        expect(events.length).toBe(0);
      });
    });

    describe("When extended is false", () => {
      it("should return all events by the given organisation without description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const events = await EventService.getAllByOrganisation(
          "5f8f8d4f9d9e5d1f7c9d4d9e",
          { extended: false }
        );
        expect(events).toBeInstanceOf(Array);
        expect(events[0].description).toBeUndefined();
        expect(events[0].timeline).toBeUndefined();
      });
    });

    describe("When extended is true", () => {
      it("should return all events by the given organisation with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const events = await EventService.getAllByOrganisation(
          "5f8f8d4f9d9e5d1f7c9d4d9e",
          { extended: true }
        );
        expect(events).toBeInstanceOf(Array);
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });

    describe("when there are multiple event by different organisations", () => {
      it("should return all events by the given organisation with description and timeline", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        event.organisation = "5f8f8d4f9d9e5d1f7c9d4d9f";
        const createdEvent2 = await EventService.create(event);
        const events = await EventService.getAllByOrganisation(
          "5f8f8d4f9d9e5d1f7c9d4d9e",
          { extended: true }
        );
        expect(events).toBeInstanceOf(Array);
        expect(events.length).toBe(1);
        expect(events[0].organisation).toBeDefined();
        expect(events[0]).toHaveProperty("description");
        expect(events[0]).toHaveProperty("timeline");
      });
    });
  });

  describe("updateById", () => {
    describe("When an event with the given id does not exist", () => {
      it("should throw an error", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const id = createdEvent._id;
        await EventService.deleteById(createdEvent._id);
        expect(await EventService.updateById(id, event)).toBe(null);
      });
    });

    describe("When an event with the given id exists", () => {
      it("should update the event", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const id = createdEvent._id;
        const updatedEvent = {
          name: "Updated Test Event",
          type: "competition",
          summary: "Updated Test Summary",
          description: "Updated Test Description",
          venue: "Updated Test Venue",
          timeline: [
            {
              time: new Date(),
              venue: "Updated Test Venue",
              description: "Updated Test Description",
            },
          ],
          image: "Updated Test Image",
          organisation: "5f8f8d4f9d9e5d1f7c9d4d9e",
        };
        const newEvent = await EventService.updateById(id, updatedEvent);
        expect(newEvent).toHaveProperty("_id", id);
        expect(newEvent).toHaveProperty("name", updatedEvent.name);
        expect(newEvent).toHaveProperty("type", updatedEvent.type);
        expect(newEvent).toHaveProperty("summary", updatedEvent.summary);
        expect(newEvent).toHaveProperty(
          "description",
          updatedEvent.description
        );
        expect(newEvent).toHaveProperty("venue", updatedEvent.venue);
        expect(newEvent).toHaveProperty("timeline");
        newEvent.timeline.forEach((timePoint, index) => {
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
        expect(newEvent).toHaveProperty("image", updatedEvent.image);
        expect(newEvent).toHaveProperty("organisation");
      });
    });

    describe("When a required field is missing", () => {
      it("should throw an error", async () => {
        const event = { ...testEvent };
        const createdEvent = await EventService.create(event);
        delete event.name;
        expect(
          EventService.updateById(createdEvent._id, event)
        ).rejects.toThrow("Missing fields: name");
      });
    });
  });

  describe("deleteById", () => {
    describe("When an event with the given id does not exist", () => {
      it("should throw an error", async () => {
        await expect(
          await EventService.deleteById("5f9d5b9b9d9b4b1b1c9d9b9b")
        ).toBe(null);
      });
    });

    describe("deleting an event twice", () => {
      it("should throw an error", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const id = createdEvent._id;
        await EventService.deleteById(createdEvent._id);
        await expect(await EventService.deleteById(id)).toBe(null);
        await expect(await EventService.deleteById(id)).toBe(null);
      });
    });

    describe("When an event with the given id exists", () => {
      it("should delete the event", async () => {
        const event = testEvent;
        const createdEvent = await EventService.create(event);
        const id = createdEvent._id;
        const deletedEvent = await EventService.deleteById(id);
        expect(deletedEvent).toHaveProperty("_id", createdEvent._id);
        expect(deletedEvent).toHaveProperty("description", event.description);
        expect(deletedEvent).toHaveProperty("timeline");
        deletedEvent.timeline.forEach((timePoint, index) => {
          expect(timePoint).toHaveProperty("time", event.timeline[index].time);
          expect(timePoint).toHaveProperty(
            "venue",
            event.timeline[index].venue
          );
          expect(timePoint).toHaveProperty(
            "description",
            event.timeline[index].description
          );
        });
        await expect(await EventService.getById(id)).toBe(null);
      });
    });
  });
});
