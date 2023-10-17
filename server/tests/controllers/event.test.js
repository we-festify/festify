const EventController = require("../../src/controllers/event");
const EventService = require("../../src/services/event");
jest.mock("../../src/services/event");
const { BadRequestError } = require("../../src/utils/errors");

describe("EventController", () => {
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
  const testEvents = [
    {
      name: "My Event",
      type: "event",
      summary: "This is my event summary.",
      description: "This is my event description.",
      venue: "My Venue",
      timeline: [
        {
          time: new Date(),
          venue: "My Venue",
          description: "My Event Timeline",
        },
      ],
      image: "My Event Image",
      organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
    },
    {
      name: "Another Event",
      type: "event",
      summary: "This is another event summary.",
      description: "This is another event description.",
      venue: "Another Venue",
      timeline: [
        {
          time: new Date(),
          venue: "Another Venue",
          description: "Another Event Timeline",
        },
      ],
      image: "Another Event Image",
      organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
    },
  ];
  describe("create", () => {
    it("should create an event successfully", async () => {
      EventService.create.mockResolvedValue(testEvent);

      const req = { body: { event: testEvent } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.create(req, res, next);

      expect(EventService.create).toHaveBeenCalledWith(testEvent);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ event: testEvent });
    });

    it("should throw a BadRequestError if the event data is missing", async () => {
      EventService.create.mockRejectedValue(
        new BadRequestError("Missing event")
      );

      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.create(req, res, next);
      expect(EventService.create).toHaveBeenCalledWith(undefined);
      expect(next).toHaveBeenCalledWith(new BadRequestError("Missing event"));
    });
  });
  describe("getById", () => {
    it("should successfully return an event when the event id exists", async () => {
      EventService.getById.mockResolvedValue(testEvent);

      const req = { params: { id: "1234567890" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ event: testEvent });
    });
    it("should not return any event when the event id does not exist", async () => {
      EventService.getById.mockResolvedValue(null);

      const req = { params: { id: "1234567890" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getById(req, res, next);

      expect(EventService.getById).toHaveBeenCalledWith("1234567890");
      expect(res.json).toHaveBeenCalledWith({ event: null });
    });
  });
  describe("getAll", () => {
    it("should successfully return a list of events when there are events in the database", async () => {
      EventService.getAll.mockResolvedValue(testEvents);

      const req = { query: { extended: false } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getAll(req, res, next);

      expect(EventService.getAll).toHaveBeenCalledWith({ extended: false });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: testEvents });
    });

    it("should return an empty list when there are no events in the database", async () => {
      EventService.getAll.mockResolvedValue([]);

      const req = { query: { extended: false } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getAll(req, res, next);

      expect(EventService.getAll).toHaveBeenCalledWith({ extended: false });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: [] });
    });
  });

  describe("getAllByType", () => {
    it("should successfully return a list of events when there are events of the specified type in the database", async () => {
      EventService.getAllByType.mockResolvedValue(testEvents);

      const req = { params: { type: "event" }, query: { extended: false } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getAllByType(req, res, next);

      expect(EventService.getAllByType).toHaveBeenCalledWith("event", {
        extended: false,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: testEvents });
    });

    it("should return an empty list when there are no events of the specified type in the database", async () => {
      EventService.getAllByType.mockResolvedValue([]);

      const req = { params: { type: "event" }, query: { extended: false } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getAllByType(req, res, next);

      expect(EventService.getAllByType).toHaveBeenCalledWith("event", {
        extended: false,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: [] });
    });
  });

  describe("getAllByOrganisation", () => {
    it("should successfully return a list of events when there are events of the specified organisation in the database", async () => {
      EventService.getAllByOrganisation.mockResolvedValue(testEvents);

      const req = {
        params: { organisationId: "1234567890" },
        query: { extended: false },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getAllByOrganisation(req, res, next);

      expect(EventService.getAllByOrganisation).toHaveBeenCalledWith(
        "1234567890",
        { extended: false }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: testEvents });
    });
    it("should return an empty list when there are no events of the specified organisation in the database", async () => {
      EventService.getAllByOrganisation.mockResolvedValue([]);

      const req = {
        params: { organisationId: "1234567890" },
        query: { extended: false },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.getAllByOrganisation(req, res, next);

      expect(EventService.getAllByOrganisation).toHaveBeenCalledWith(
        "1234567890",
        { extended: false }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: [] });
    });
  });

  describe("updateById", () => {
    it("should successfully update an event when the event exists and the event data is provided", async () => {
      EventService.updateById.mockResolvedValue(testEvent);

      const req = {
        params: { id: "1234567890" },
        body: { event: testEvent },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.updateById(req, res, next);

      expect(EventService.updateById).toHaveBeenCalledWith(
        "1234567890",
        testEvent
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ event: testEvent });
    });
    it("should not update an event when the event id does not exist", async () => {
      EventService.updateById.mockResolvedValue(null);

      const req = { params: { id: "1234567890" }, body: { event: {} } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.updateById(req, res, next);

      expect(EventService.updateById).toHaveBeenCalledWith("1234567890", {});
      expect(res.json).toHaveBeenCalledWith({ event: null });
    });
  });

  describe("deleteById", () => {
    it("should successfully delete an event by its id when the event with that id is present", async () => {
      EventService.deleteById.mockResolvedValue(testEvent);

      const req = { params: { id: "1234567890" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.deleteById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ event: testEvent });
    });

    it("should not delete any event when event id is not present", async () => {
      EventService.deleteById.mockResolvedValue(null);

      const req = { params: { id: "1234567890" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await EventController.deleteById(req, res, next);

      expect(EventService.deleteById).toHaveBeenCalledWith("1234567890");
      expect(res.json).toHaveBeenCalledWith({ event: null });
    });
  });
});
