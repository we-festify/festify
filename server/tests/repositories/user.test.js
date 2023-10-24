const dbHandler = require("../db-handler");
const UserRepository = require("../../src/repositories/user");
const OrganisationRepository = require("../../src/repositories/organisation");

describe("User Repository", () => {
  beforeAll(async () => await dbHandler.connectDatabase());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  const testUser = {
    name: "Test User",
    email: "test@gmail.com",
    passwordHash: "test",
    role: "user",
    organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
  };

  describe("create", () => {
    describe("when user is Invalid", () => {
      describe("when name is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          delete user.name;
          await expect(UserRepository.create(user)).rejects.toThrow(
            "User validation failed: name: Name is required"
          );
        });
      });

      describe("when email is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          delete user.email;
          await expect(UserRepository.create(user)).rejects.toThrow(
            "User validation failed: email: Email is required"
          );
        });
      });

      describe("when password is missing", () => {
        it("should throw an error", async () => {
          const user = { ...testUser };
          delete user.passwordHash;
          await expect(UserRepository.create(user)).rejects.toThrow(
            "User validation failed: passwordHash: Password is required"
          );
        });
      });

      describe("when role is missing", () => {
        it("should take role as user by default", async () => {
          const user = { ...testUser };
          delete user.role;
          const createdUser = await UserRepository.create(user);
          expect(createdUser).toHaveProperty("_id");
          expect(createdUser).toHaveProperty("name", user.name);
          expect(createdUser).toHaveProperty("email", user.email);
          expect(createdUser).toHaveProperty("passwordHash", user.passwordHash);
          expect(createdUser).toHaveProperty("role", "user");
          expect(createdUser).toHaveProperty("organisation");
          expect(createdUser.organisation.equals(user.organisation)).toBe(true);
        });
      });

      describe("when organisation is missing", () => {
        it("should have value set to null by default", async () => {
          const user = { ...testUser };
          delete user.organisation;
          const createdUser = await UserRepository.create(user);
          expect(createdUser).toHaveProperty("_id");
          expect(createdUser).toHaveProperty("name", user.name);
          expect(createdUser).toHaveProperty("email", user.email);
          expect(createdUser).toHaveProperty("passwordHash", user.passwordHash);
          expect(createdUser).toHaveProperty("role", user.role);
          expect(createdUser).toHaveProperty("organisation", null);
        });
      });
    });
    describe("when user is valid", () => {
      it("should create a new user", async () => {
        const user = { ...testUser };
        const createdUser = await UserRepository.create(user);
        expect(createdUser).toHaveProperty("_id");
        expect(createdUser).toHaveProperty("name", user.name);
        expect(createdUser).toHaveProperty("email", user.email);
        expect(createdUser).toHaveProperty("passwordHash", user.passwordHash);
        expect(createdUser).toHaveProperty("role", user.role);
        expect(createdUser).toHaveProperty("organisation");
        expect(createdUser.organisation.equals(user.organisation)).toBe(true);
      });
    });
  });

  describe("getById", () => {
    describe("when user is not found", () => {
      it("should return null", async () => {
        const user = { ...testUser };
        const findUser = await UserRepository.getById(user._id);
        expect(findUser).toBeNull();
      });
    });

    describe("when user is found", () => {
      it("should return the user", async () => {
        const user = { ...testUser };
        const createdUser = await UserRepository.create(user);
        const findUser = await UserRepository.getById(createdUser._id);
        expect(findUser).toHaveProperty("_id", createdUser._id);
        expect(findUser).toHaveProperty("name", user.name);
        expect(findUser).toHaveProperty("email", user.email);
        expect(findUser).toHaveProperty("passwordHash", user.passwordHash);
        expect(findUser).toHaveProperty("role", user.role);
        expect(findUser).toHaveProperty("organisation");
        expect(findUser.organisation.equals(user.organisation)).toBe(true);
      });
    });
  });

  describe("getByEmail", () => {
    describe("when user is not found", () => {
      it("should return null", async () => {
        const user = { ...testUser };
        const findUser = await UserRepository.getByEmail(user.email);
        expect(findUser).toBeNull();
      });
    });

    describe("when user is found", () => {
      it("should return the user", async () => {
        const user = { ...testUser };
        const createdUser = await UserRepository.create(user);
        const findUser = await UserRepository.getByEmail(user.email);
        expect(findUser).toHaveProperty("_id", createdUser._id);
        expect(findUser).toHaveProperty("name", user.name);
        expect(findUser).toHaveProperty("email", user.email);
        expect(findUser).toHaveProperty("passwordHash", user.passwordHash);
        expect(findUser).toHaveProperty("role", user.role);
        expect(findUser).toHaveProperty("organisation");
        expect(findUser.organisation.equals(user.organisation)).toBe(true);
      });
    });
  });

  describe("getAll", () => {
    describe("when users are not found", () => {
      it("should return an empty array", async () => {
        const users = await UserRepository.getAll();
        expect(users).toEqual([]);
      });
    });

    describe("when users are found", () => {
      it("should return an array of users", async () => {
        const user = { ...testUser };
        const createdUser = await UserRepository.create(user);
        const users = await UserRepository.getAll();
        expect(users).toHaveLength(1);
        expect(users[0]).toHaveProperty("_id", createdUser._id);
        expect(users[0]).toHaveProperty("name", user.name);
        expect(users[0]).toHaveProperty("email", user.email);
        expect(users[0]).toHaveProperty("passwordHash", user.passwordHash);
        expect(users[0]).toHaveProperty("role", user.role);
        expect(users[0]).toHaveProperty("organisation");
        expect(users[0].organisation.equals(user.organisation)).toBe(true);
      });
    });
  });

  describe("updateById", () => {
    describe("when user is not found", () => {
      it("should return null", async () => {
        const user = { ...testUser };
        const updatedUser = await UserRepository.updateById(user._id, user);
        expect(updatedUser).toBeNull();
      });
    });

    describe("when user is found", () => {
      describe("when name is missing", () => {
        it("should update the user without changing the name", async () => {
          const user = { ...testUser };
          const createdUser = await UserRepository.create(user);
          const updatedUser = {
            email: "test1@gmail.com",
            passwordHash: "test1",
            role: "admin",
            organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
          };
          const findUser = await UserRepository.updateById(
            createdUser._id,
            updatedUser
          );
          expect(findUser).toHaveProperty("_id", createdUser._id);
          expect(findUser).toHaveProperty("name", user.name);
          expect(findUser).toHaveProperty("email", updatedUser.email);
          expect(findUser).toHaveProperty(
            "passwordHash",
            updatedUser.passwordHash
          );
          expect(findUser).toHaveProperty("role", updatedUser.role);
          expect(findUser).toHaveProperty("organisation");
          expect(findUser.organisation.equals(updatedUser.organisation)).toBe(
            true
          );
        });
      });
      describe("when email and passwordHash is missing", () => {
        it("should update the user without changing the email and passwordHash", async () => {
          const user = { ...testUser };
          const createdUser = await UserRepository.create(user);
          const updatedUser = {
            name: "Updated User",
            role: "admin",
            organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
          };
          const findUser = await UserRepository.updateById(
            createdUser._id,
            updatedUser
          );
          expect(findUser).toHaveProperty("_id", createdUser._id);
          expect(findUser).toHaveProperty("name", updatedUser.name);
          expect(findUser).toHaveProperty("email", user.email);
          expect(findUser).toHaveProperty("passwordHash", user.passwordHash);
          expect(findUser).toHaveProperty("role", updatedUser.role);
          expect(findUser).toHaveProperty("organisation");
          expect(findUser.organisation.equals(updatedUser.organisation)).toBe(
            true
          );
        });
      });
      describe("when role and organization is missing", () => {
        it("should update the user without changing the role and organization", async () => {
          const user = { ...testUser };
          const createdUser = await UserRepository.create(user);
          const updatedUser = {
            name: "Updated User",
            email: "test1@gmail.com",
            passwordHash: "test1",
          };
          const findUser = await UserRepository.updateById(
            createdUser._id,
            updatedUser
          );
          expect(findUser).toHaveProperty("_id", createdUser._id);
          expect(findUser).toHaveProperty("name", updatedUser.name);
          expect(findUser).toHaveProperty("email", updatedUser.email);
          expect(findUser).toHaveProperty(
            "passwordHash",
            updatedUser.passwordHash
          );
          expect(findUser).toHaveProperty("role", user.role);
          expect(findUser).toHaveProperty("organisation");
          expect(findUser.organisation.equals(user.organisation)).toBe(true);
        });
      });
      describe("when all fields are present", () => {
        it("should update the user", async () => {
          const user = { ...testUser };
          const createdUser = await UserRepository.create(user);
          const updatedUser = {
            name: "Updated User",
            email: "test1@gmail.com",
            passwordHash: "test1",
            role: "admin",
            organisation: "5f7d7e8c8d8f8e8d8c8f8d8f",
          };
          const findUser = await UserRepository.updateById(
            createdUser._id,
            updatedUser
          );
          expect(findUser).toHaveProperty("_id", createdUser._id);
          expect(findUser).toHaveProperty("name", updatedUser.name);
          expect(findUser).toHaveProperty("email", updatedUser.email);
          expect(findUser).toHaveProperty(
            "passwordHash",
            updatedUser.passwordHash
          );
          expect(findUser).toHaveProperty("role", updatedUser.role);
          expect(findUser).toHaveProperty("organisation");
          expect(findUser.organisation.equals(updatedUser.organisation)).toBe(
            true
          );
        });
      });
    });
  });

  describe("deleteById", () => {
    describe("when user is not found", () => {
      it("should return null", async () => {
        const user = { ...testUser };
        const deletedUser = await UserRepository.deleteById(user._id);
        expect(deletedUser).toBeNull();
      });
    });
    describe("when user is found", () => {
      it("should delete the user", async () => {
        const user = { ...testUser };
        const createdUser = await UserRepository.create(user);
        const deletedUser = await UserRepository.deleteById(createdUser._id);
        await expect(
          UserRepository.getById(createdUser._id)
        ).resolves.toBeNull();
        expect(deletedUser).toHaveProperty("_id", createdUser._id);
        expect(deletedUser).toHaveProperty("name", user.name);
        expect(deletedUser).toHaveProperty("email", user.email);
        expect(deletedUser).toHaveProperty("passwordHash", user.passwordHash);
        expect(deletedUser).toHaveProperty("role", user.role);
        expect(deletedUser).toHaveProperty("organisation");
        expect(deletedUser.organisation.equals(user.organisation)).toBe(true);
      });
    });
  });
});
