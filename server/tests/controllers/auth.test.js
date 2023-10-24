const AuthController = require("../../src/controllers/auth");
const AuthService = require("../../src/services/auth");
const {
  BadRequestError,
  UnauthorizedError,
} = require("../../src/utils/errors");
jest.mock("../../src/services/auth");

describe("AuthController", () => {
  describe("login", () => {
    describe("when user is missing", () => {
      it("should throw an error", async () => {
        const req = {
          body: {},
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.login(req, res, next);
        expect(next).toHaveBeenCalledWith(new BadRequestError("Missing user"));
      });
    });

    describe("when email is missing", () => {
      it("should throw an error", async () => {
        AuthService.loginWithEmailPassword.mockRejectedValue(
          new BadRequestError("Invalid email or password")
        );
        const req = {
          body: {
            user: {
              password: "test",
            },
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.login(req, res, next);
        expect(next).toHaveBeenCalledWith(
          new BadRequestError("Invalid email or password")
        );
      });
    });

    describe("when password is missing", () => {
      it("should throw an error", async () => {
        AuthService.loginWithEmailPassword.mockRejectedValue(
          new BadRequestError("Invalid email or password")
        );
        const req = {
          body: {
            user: {
              email: "test@gmail.com",
            },
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.login(req, res, next);
        expect(next).toHaveBeenCalledWith(
          new BadRequestError("Invalid email or password")
        );
      });
    });

    describe("when all fields are present", () => {
      it("should return a 200 status code", async () => {
        const accessToken = "dummyAccessToken";
        const refreshToken = "dummyRefreshToken";
        const user = {
          email: "test@gmail.com",
          role: "organiser",
          organisation: "dummyOrganisation",
        };
        AuthService.loginWithEmailPassword.mockResolvedValue({
          accessToken,
          refreshToken,
          user,
        });
        const req = {
          body: {
            user: {
              email: "test@gmail.com",
              password: "test",
            },
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.login(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          accessToken,
          user,
        });
        expect(res.cookie).toHaveBeenCalledWith(
          "festifyRefreshToken",
          refreshToken,
          {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
          }
        );
      });
    });
  });

  describe("register", () => {
    describe("when user is missing", () => {
      it("should throw an error", async () => {
        AuthService.register.mockRejectedValue(
          new BadRequestError("Invalid email or password")
        );
        const req = {
          body: {},
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.register(req, res, next);
        expect(next).toHaveBeenCalledWith(
          new BadRequestError("Invalid email or password")
        );
      });
    });

    describe("when everything is present", () => {
      it("should return a 201 status code", async () => {
        const accessToken = "dummyAccessToken";
        const refreshToken = "dummyRefreshToken";
        const user = {
          email: "test@gmail.com",
          role: "organiser",
          organisation: "dummyOrganisation",
          password: "test",
        };
        AuthService.register.mockResolvedValue({
          accessToken,
          refreshToken,
          user,
        });
        const req = {
          body: {
            user,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.register(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          accessToken,
          user,
        });
        expect(res.cookie).toHaveBeenCalledWith(
          "festifyRefreshToken",
          refreshToken,
          {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
          }
        );
      });
    });
  });

  describe("refresh", () => {
    describe("when refresh token is missing", () => {
      it("should throw an error", async () => {
        AuthService.refreshAccessToken.mockRejectedValue(
          new UnauthorizedError("Missing refresh token")
        );
        const req = {
          cookies: {},
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.refresh(req, res, next);
        expect(next).toHaveBeenCalledWith(
          new UnauthorizedError("Missing refresh token")
        );
      });
    });

    describe("when refresh token is present", () => {
      it("should return a 200 status code", async () => {
        const accessToken = "dummyAccessToken";
        const refreshToken = "dummyRefreshToken";
        const user = {
          email: "test@gmail.com",
          role: "organiser",
          organisation: "dummyOrganisation",
          password: "test",
        };
        AuthService.refreshAccessToken.mockResolvedValue({
          accessToken,
          refreshToken,
          user,
        });
        const req = {
          cookies: {
            festifyRefreshToken: refreshToken,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          cookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.refresh(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          accessToken,
          user,
        });
        expect(res.cookie).toHaveBeenCalledWith(
          "festifyRefreshToken",
          refreshToken,
          {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
          }
        );
      });
    });
  });

  describe("logout", () => {
    describe("when refresh token is missing", () => {
      it("should return a 200 status code", async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          clearCookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.logout(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "Logged out successfully",
        });
        expect(res.clearCookie).toHaveBeenCalledWith("festifyRefreshToken");
      });
    });

    describe("when refresh token is present", () => {
      it("should return a 200 status code", async () => {
        const refreshToken = "dummyRefreshToken";
        const req = {
          cookies: {
            festifyRefreshToken: refreshToken,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          clearCookie: jest.fn(),
        };
        const next = jest.fn();
        await AuthController.logout(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "Logged out successfully",
        });
        expect(res.clearCookie).toHaveBeenCalledWith("festifyRefreshToken");
      });
    });
  });
});
