const UserRepository = require("../repositories/user");
const OrganisationRepository = require("../repositories/organisation");
const { BadRequestError } = require("../utils/errors");
const { hashPassword } = require("../utils/password");
const { validateEmail } = require("../utils/validations");

class UserService {
  static #checkRequiredFields(user) {
    const requiredFields = [
      "name",
      "email",
      "password",
      "gender",
      "college",
      "zipCode",
      "degree",
      "yearOfGraduation",
    ];
    const missingFields = requiredFields.filter((field) => !user[field]);
    if (missingFields.length) {
      throw new BadRequestError(`Missing ${missingFields.join(", ")}`);
    }
  }

  static async #checkEmailAlreadyExists(email) {
    const user = await UserRepository.getByEmail(email);
    if (user) {
      throw new BadRequestError("User already exists");
    }
  }

  static async #checkValidOrganisation(organisationId) {
    if (!organisationId) return;
    const organisation = await OrganisationRepository.getById(organisationId);
    if (!organisation) {
      throw new BadRequestError("Invalid organisation");
    }
  }

  static async getAll() {
    try {
      return (await UserRepository.getAll()).map((user) => {
        return UserRepository.excludeSensitiveFields(user);
      });
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const user = await UserRepository.getById(id);
      if (!user) {
        throw new BadRequestError("Invalid user");
      }
      return UserRepository.excludeSensitiveFields(user);
    } catch (err) {
      throw err;
    }
  }

  static async create(user) {
    try {
      this.#checkRequiredFields(user);
      if (!validateEmail(user.email)) {
        throw new BadRequestError("Invalid email");
      }
      if (user.password.length < 8) {
        throw new BadRequestError(
          "Password must be at least 8 characters long"
        );
      }
      await this.#checkEmailAlreadyExists(user.email);
      await this.#checkValidOrganisation(user.organisation);
      const passwordHash = await hashPassword(user.password);
      user.password = undefined;
      user.passwordHash = passwordHash;
      return UserRepository.excludeSensitiveFields(
        await UserRepository.create(user)
      );
    } catch (err) {
      throw err;
    }
  }

  static async update(id, user) {
    try {
      this.#checkRequiredFields(user);
      if (!validateEmail(user.email)) {
        throw new BadRequestError("Invalid email");
      }
      if (user.password.length < 8) {
        throw new BadRequestError(
          "Password must be at least 8 characters long"
        );
      }
      if (user.organisation) {
        await this.#checkValidOrganisation(user.organisation);
      }
      const userPayload = await UserRepository.updateById(id, user);
      if (!userPayload) {
        throw new BadRequestError("Invalid user");
      }
      return UserRepository.excludeSensitiveFields(userPayload);
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const user = await UserRepository.deleteById(id);
      if (!user) {
        throw new BadRequestError("Invalid user");
      }
      return UserRepository.excludeSensitiveFields(user);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
