const request = require("supertest");
const express = require("express");
const AuthController = require("../../src/controllers/auth");
const AuthService = require("../../src/services/auth");
const { UnauthorizedError } = require("../../src/utils/errors");

jest.mock("../../src/services/auth");

const app = express();
app.use(express.json());

// Set up routes for testing
app.post("/login", AuthController.login);
app.post("/register", AuthController.register);
app.post("/refresh", AuthController.refresh);
app.post("/logout", AuthController.logout);

describe("AuthController", () => {
  describe("POST /login", () => {
    it("should respond with access token and user data on successful login", async () => {
      const userPayload = {
        /* User data for a successful login */
      };
      AuthService.loginWithEmailPassword.mockResolvedValue({
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken",
        user: userPayload,
      });

      const response = await request(app)
        .post("/login")
        .send({ user: { email: "test@example.com", password: "password123" } });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBe("mockAccessToken");
      expect(response.body.user).toEqual(userPayload);
    });

    it("should respond with an error on failed login", async () => {
      AuthService.loginWithEmailPassword.mockRejectedValue(
        new UnauthorizedError("Invalid credentials")
      );

      const response = await request(app)
        .post("/login")
        .send({
          user: { email: "invalid@example.com", password: "wrongpassword" },
        });

      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe("Invalid credentials");
    });
  });
  describe("POST /register", () => {
    it("should respond with a success message and user data on successful registration", async () => {
      const userPayload = {
        /* User data for a successful registration */
      };
      AuthService.register.mockResolvedValue({
        message: "Registration successful",
        user: userPayload,
      });

      const response = await request(app)
        .post("/register")
        .send({
          user: { email: "newuser@example.com", password: "newpassword123" },
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Registration successful");
      expect(response.body.user).toEqual(userPayload);
    });

    it("should respond with an error on failed registration", async () => {
      AuthService.register.mockRejectedValue(
        new UnauthorizedError("Registration failed")
      );

      const response = await request(app)
        .post("/register")
        .send({
          user: {
            email: "duplicate@example.com",
            password: "existingpassword",
          },
        });

      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe("Registration failed");
    });
  });

  describe("POST /refresh", () => {
    it("should respond with a new access token on successful token refresh", async () => {
      AuthService.refreshAccessToken.mockResolvedValue({
        accessToken: "newAccessToken",
      });

      const response = await request(app)
        .post("/refresh")
        .send({ refreshToken: "validRefreshToken" });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBe("newAccessToken");
    });

    it("should respond with an error on invalid refresh token", async () => {
      AuthService.refreshAccessToken.mockRejectedValue(
        new UnauthorizedError("Invalid refresh token")
      );

      const response = await request(app)
        .post("/refresh")
        .send({ refreshToken: "invalidRefreshToken" });

      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe("Invalid refresh token");
    });
  });

  describe('POST /logout', () => {
    it('should respond with a success message on successful logout', async () => {
      const refreshToken = 'validRefreshToken';
      AuthService.refreshAccessToken.mockResolvedValue({
        accessToken: 'newAccessToken',
      });

      const response = await request(app)
        .post('/logout')
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successful');
    });

    it('should respond with an error on failed logout', async () => {
      const invalidRefreshToken = 'invalidRefreshToken';
      AuthService.refreshAccessToken.mockRejectedValue(new UnauthorizedError('Logout failed'));

      const response = await request(app)
        .post('/logout')
        .send({ refreshToken: invalidRefreshToken });

      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe('Logout failed');
    });
  });
});
