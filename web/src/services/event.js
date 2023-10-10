import axios from "axios";
import Event from "./../models/Event";

class EventService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL + "/events";
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAllEvents() {
    try {
      const response = await this.axios.get("/");
      return response.data.events.map((event) => new Event(event));
    } catch (error) {
      throw error;
    }
  }

  async getEvent(id) {
    try {
      const response = await this.axios.get(`/${id}`);
      return new Event(response.data.event);
    } catch (error) {
      throw error;
    }
  }

  async getEventsByType(type) {
    try {
      const response = await this.axios.get(`/type/${type}`);
      return response.data.events.map((event) => new Event(event));
    } catch (error) {
      throw error;
    }
  }

  async createEvent(event) {
    try {
      const response = await this.axios.post("/", event);
      return new Event(response.data.event);
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(id, updatedEvent) {
    try {
      const response = await this.axios.put(`/${id}`, updatedEvent);
      return new Event(response.data.event);
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      const response = await this.axios.delete(`/${id}`);
      return new Event(response.data.event);
    } catch (error) {
      throw error;
    }
  }
}

const eventService = new EventService();
export default eventService;
