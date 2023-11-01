const dbHandler = require("../db-handler");
const AuthService = require("../../src/services/auth");

describe("Auth Service", () => {
  beforeAll(async () => await dbHandler.connectDatabase());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  const testUser = {
    name: "Test User",
    email: "test@gmail.com",
    password: "testaaaaaaaaa",
    role: "admin",
  };

  process.env.JWT_SECRET = "testsecret";
  process.env.JWT_EXPIRES_IN = "3600";
  process.env.JWT_REFRESH_SECRET = "testrefreshsecret";
  process.env.JWT_REFRESH_EXPIRES_IN = "86400";

  describe("register", () => {
    describe("when user is Invalid", () => {
      describe("when email is invalid", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.email = "test";
          await expect(AuthService.register(user)).rejects.toThrow(
            "Invalid email"
          );
        });
      });
      describe("when password is less than 8 characters", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.password = "test";
          await expect(AuthService.register(user)).rejects.toThrow(
            "Password must be at least 8 characters long"
          );
        });
      });
      describe("when user with email already exists", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          await AuthService.register(user);
          await expect(AuthService.register({ ...testUser })).rejects.toThrow(
            "User with email already exists"
          );
        });
      });
      describe("when password is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.password = undefined;
          await expect(AuthService.register(user)).rejects.toThrow(
            "Invalid email or password"
          );
        });
      });
      describe("when email is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.email = undefined;
          await expect(AuthService.register(user)).rejects.toThrow(
            "Invalid email or password"
          );
        });
      });
    });
    describe("when user is valid", () => {
      it("should return a user with accessToken and refreshToken", async () => {
        const user = { ...testUser };
        const result = await AuthService.register(user);
        expect(result).toHaveProperty("accessToken");
        expect(result).toHaveProperty("refreshToken");
        expect(result).toHaveProperty("user");
        expect(result.user).toHaveProperty("_id");
        expect(result.user).toHaveProperty("name", user.name);
        expect(result.user).toHaveProperty("email", user.email);
        expect(result.user).toHaveProperty("role", user.role || "user");
        expect(result.user).toHaveProperty("organisation");
      });
    });
  });

  describe("loginWithEmailPassword", () => {
    describe("when user is Invalid", () => {
      describe("when email is invalid", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.email = "test";
          await expect(
            AuthService.loginWithEmailPassword(user.email, user.password)
          ).rejects.toThrow("Invalid email");
        });
      });
      describe("when password is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.password = undefined;
          await expect(
            AuthService.loginWithEmailPassword(user.email, user.password)
          ).rejects.toThrow("Invalid email or password");
        });
      });
      describe("when email is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          user.email = undefined;
          await expect(
            AuthService.loginWithEmailPassword(user.email, user.password)
          ).rejects.toThrow("Invalid email or password");
        });
      });
      describe("when user with email does not exist", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          await expect(
            AuthService.loginWithEmailPassword(user.email, user.password)
          ).rejects.toThrow("Invalid email or password");
        });
      });
    });
    describe("when user is valid", () => {
      describe("when password is incorrect", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          await AuthService.register(user);
          await expect(
            AuthService.loginWithEmailPassword(user.email, "test")
          ).rejects.toThrow("Invalid email or password");
        });
      });
      describe("when password is correct", () => {
        it("should return a user with accessToken and refreshToken", async () => {
          const user = { ...testUser };
          await AuthService.register({ ...testUser });
          const result = await AuthService.loginWithEmailPassword(
            user.email,
            user.password
          );
          expect(result).toHaveProperty("accessToken");
          expect(result).toHaveProperty("refreshToken");
          expect(result).toHaveProperty("user");
          expect(result.user).toHaveProperty("_id");
          expect(result.user).toHaveProperty("name", user.name);
          expect(result.user).toHaveProperty("email", user.email);
          expect(result.user).toHaveProperty("role", user.role || "user");
          expect(result.user).toHaveProperty("organisation");
        });
      });
    });
  });
  describe("refreshAccessToken", () => {
    describe("when refreshToken is missing", () => {
      it("should throw an error", async () => {
        await expect(AuthService.refreshAccessToken()).rejects.toThrow(
          "Missing refresh token"
        );
      });
    });
    describe("when refreshToken is invalid", () => {
      it("should throw an error", async () => {
        await expect(
          AuthService.refreshAccessToken("invalidtoken")
        ).rejects.toThrow("Invalid refresh token");
      });
    });
    describe("when refreshToken is valid", () => {
      it("should return a user with accessToken and refreshToken", async () => {
        const user = { ...testUser };
        await AuthService.register({ ...testUser });
        const { refreshToken } = await AuthService.loginWithEmailPassword(
          user.email,
          user.password
        );
        const result = await AuthService.refreshAccessToken(refreshToken);
        expect(result).toHaveProperty("accessToken");
        expect(result).toHaveProperty("refreshToken");
        expect(result).toHaveProperty("user");
        expect(result.user).toHaveProperty("_id");
        expect(result.user).toHaveProperty("name", user.name);
        expect(result.user).toHaveProperty("email", user.email);
        expect(result.user).toHaveProperty("role", user.role || "user");
        expect(result.user).toHaveProperty("organisation");
      });
    });
    describe("when refreshToken is valid and user is organizer", () => {
      it("should return a user with accessToken and refreshToken", async () => {
        const user = { ...testUser, role: "organiser" };
        user.role = "organiser";
        await AuthService.register({ ...testUser, role: "organiser" });
        const { refreshToken } = await AuthService.loginWithEmailPassword(
          user.email,
          user.password
        );
        const result = await AuthService.refreshAccessToken(refreshToken);
        expect(result).toHaveProperty("accessToken");
        expect(result).toHaveProperty("refreshToken");
        expect(result).toHaveProperty("user");
        expect(result.user).toHaveProperty("_id");
        expect(result.user).toHaveProperty("name", user.name);
        expect(result.user).toHaveProperty("email", user.email);
        expect(result.user).toHaveProperty("role", user.role || "user");
        expect(result.user).toHaveProperty("organisation");
      });
    });
  });
});
