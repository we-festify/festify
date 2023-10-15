const AuthService = require("../../src/services/auth");
const UserRepository = require("../../src/repositories/user");
const {
  BadRequestError,
  UnauthorizedError,
} = require("../../src/utils/errors");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../src/utils/jwt");
const { hashPassword, comparePassword } = require("../../src/utils/password");

jest.mock("../../src/repositories/user");
jest.mock("../../src/utils/jwt", () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
}));
jest.mock("../../src/utils/password", () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
}));

describe("AuthService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const user = { email: "test@example.com", password: "password123" };
      const userPayload = { _id: "123", email: user.email, role: "user" };
      const accessToken = "mockAccessToken";
      const refreshToken = "mockRefreshToken";

      UserRepository.getByEmail.mockResolvedValue(null);
      hashPassword.mockResolvedValue("hashedPassword");
      UserRepository.create.mockResolvedValue({ _id: "123", ...user });
      generateAccessToken.mockReturnValue(accessToken);
      generateRefreshToken.mockReturnValue(refreshToken);

      const result = await AuthService.register(user);

      expect(UserRepository.getByEmail).toHaveBeenCalledWith(user.email);
      expect(hashPassword).toHaveBeenCalledWith(user.password);
      expect(UserRepository.create).toHaveBeenCalledWith({
        email: user.email,
        password: user.password,
      });
      expect(generateAccessToken).toHaveBeenCalledWith(userPayload);
      expect(generateRefreshToken).toHaveBeenCalledWith(userPayload);
      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: { _id: "123", email: user.email, role: "user" },
      });
    });

    //Test cases for registering a user

    it("should throw a BadRequestError if the user already exists", async () => {
      const user = { email: "existing@example.com", password: "password123" };
      UserRepository.getByEmail.mockResolvedValue({ email: user.email });

      await expect(AuthService.register(user)).rejects.toThrow(BadRequestError);
    });

    it("should throw a BadRequestError for invalid email format", async () => {
      const user = { email: "invalid_email", password: "password123" };
      await expect(AuthService.register(user)).rejects.toThrow(BadRequestError);
    });

    it("should throw a BadRequestError for weak password", async () => {
      const user = { email: "test@example.com", password: "weak" };
      await expect(AuthService.register(user)).rejects.toThrow(BadRequestError);
    });

    it("should throw an error if password hashing fails", async () => {
      const user = { email: "test@example.com", password: "password123" };
      UserRepository.getByEmail.mockResolvedValue(null);
      hashPassword.mockRejectedValue(new BadRequestError());
      await expect(AuthService.register(user)).rejects.toThrow(BadRequestError);
    });
  });

  describe("login", () => {
    it("should log in an existing user", async () => {
      const user = { email: "test@example.com", password: "password123" };
      const userPayload = { _id: "123", email: user.email, role: "user" };
      const accessToken = "mockAccessToken";
      const refreshToken = "mockRefreshToken";

      UserRepository.getByEmail.mockResolvedValue({
        _id: "123",
        email: user.email,
        password: user.password,
      });

      hashPassword.mockResolvedValue("hashedPassword");
      comparePassword.mockResolvedValue(true);
      generateAccessToken.mockReturnValue(accessToken);
      generateRefreshToken.mockReturnValue(refreshToken);

      const result = await AuthService.loginWithEmailPassword(
        user.email,
        user.password
      );

      expect(UserRepository.getByEmail).toHaveBeenCalledWith(user.email);
      expect(hashPassword).toHaveBeenCalledWith(user.password);
      expect(comparePassword).toHaveBeenCalledWith(
        user.password,
        "hashedPassword"
      );
      expect(generateAccessToken).toHaveBeenCalledWith(userPayload);
      expect(generateRefreshToken).toHaveBeenCalledWith(userPayload);
      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: { _id: "123", email: user.email, role: "user" },
      });
    });

    // Test cases for login

    it("should successfully log in with valid credentials", async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = { email, password };
      const userPayload = { _id: "123", email, role: "user" };
      const accessToken = "mockAccessToken";
      const refreshToken = "mockRefreshToken";

      UserRepository.getByEmail.mockResolvedValue({
        email,
        password: "hashedPassword",
      });
      hashPassword.mockResolvedValue("hashedPassword");
      comparePassword.mockResolvedValue(true);
      generateAccessToken.mockReturnValue(accessToken);
      generateRefreshToken.mockReturnValue(refreshToken);

      const result = await AuthService.loginWithEmailPassword(email, password);

      expect(UserRepository.getByEmail).toHaveBeenCalledWith(email);
      expect(hashPassword).toHaveBeenCalledWith(user.password);
      expect(comparePassword).toHaveBeenCalledWith(
        user.password,
        "hashedPassword"
      );
      expect(generateAccessToken).toHaveBeenCalledWith(userPayload);
      expect(generateRefreshToken).toHaveBeenCalledWith(userPayload);
      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: { _id: "123", email, role: "user" },
      });
    });

    it("should throw UnauthorizedError for invalid email or password", async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = { email, password };
      UserRepository.getByEmail.mockResolvedValue(null);
      await expect(
        AuthService.loginWithEmailPassword(email, password)
      ).rejects.toThrow(BadRequestError);
    });
  });

  // Test cases for refreshAccessToken

  it("should refresh access token with a valid refresh token", async () => {
    const refreshToken = "validRefreshToken";
    const userPayload = {
      _id: "123",
      email: "test@example.com",
      role: "user",
    };
    const newAccessToken = "newAccessToken";

    UserRepository.getById.mockResolvedValue({
      _id: "123",
      email: "test@example.com",
      role: "user",
    });

    verifyRefreshToken.mockReturnValue(userPayload);
    generateAccessToken.mockReturnValue(newAccessToken);

    const result = await AuthService.refreshAccessToken(refreshToken);

    expect(verifyRefreshToken).toHaveBeenCalledWith(refreshToken);
    expect(generateAccessToken).toHaveBeenCalledWith(userPayload);
    expect(result).toEqual({
      accessToken: "newAccessToken",
      refreshToken: "validRefreshToken",
      user: undefined,
    });

    it("should throw UnauthorizedError for invalid refresh token", async () => {
      const refreshToken = "invalidRefreshToken";
      verifyRefreshToken.mockReturnValue(null);
      await expect(
        AuthService.refreshAccessToken(refreshToken)
      ).rejects.toThrow(UnauthorizedError);
    });
  });
});
