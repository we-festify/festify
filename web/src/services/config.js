import axios from "axios";

class ConfigService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/config",
    });
  }

  async getPermissions() {
    try {
      const response = await this.axios.get("/permissions");
      return response.data.permissions;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}

const configService = new ConfigService();
export default configService;
