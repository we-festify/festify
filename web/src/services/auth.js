import axios from "axios";

class AuthService {
  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
      withCredentials: true,
    });
  }

  async login(email, password) {
    try {
      const response = await this.axios.post("/login", {
        user: { email, password },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(user) {
    try {
      const response = await this.axios.post("/register", { user });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refresh() {
    try {
      const response = await this.axios.get("/refresh");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const response = await this.axios.get("/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
