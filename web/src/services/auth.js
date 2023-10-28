import axios from "axios";

class AuthService {
  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true,
    });
  }

  async login(user) {
    try {
      if (!user.email || !user.password)
        throw new Error("Email and password are required");
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(user.email))
        throw new Error("Please enter a valid email");
      const response = await this.axios.post("/login", { user });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async register(user) {
    try {
      if (!user.name || !user.email || !user.password)
        throw new Error("Name, email and password are required");
      if (user.password !== user.confirmPassword)
        throw new Error("Passwords do not match");
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(user.email))
        throw new Error("Please enter a valid email");
      const response = await this.axios.post("/register", { user });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async refresh() {
    try {
      const response = await this.axios.get("/refresh");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async logout() {
    try {
      const response = await this.axios.get("/logout");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async verifyEmail(verificationToken) {
    try {
      const response = await this.axios.get(
        `/verify-email?token=${verificationToken}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
