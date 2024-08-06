const { applicationDB } = require("../../database");

const User = require("../models/User")(applicationDB);

class UserRepository {
  static removeUnauthorizedFields(user) {
    const {
      passwordHash,
      resetPasswordToken,
      isVerified,
      role,
      organisation,
      ...userWithoutUnauthorizedFields
    } = user;
    return userWithoutUnauthorizedFields;
  }

  static excludeSensitiveFields(user) {
    const { passwordHash, resetPasswordToken, ...userWithoutSensitiveFields } =
      user._doc;
    return userWithoutSensitiveFields;
  }

  static async create(user) {
    try {
      return await User.create(user);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id, selectSensitiveFields = false) {
    try {
      if (!selectSensitiveFields) return await User.findById(id);
      return await User.findById(id).select(
        "+passwordHash +resetPasswordToken"
      );
    } catch (err) {
      throw err;
    }
  }

  static async getByEmail(email, selectSensitiveFields = false) {
    try {
      if (!selectSensitiveFields)
        return await User.findOne({ email: email.toLowerCase() });
      return await User.findOne({ email: email.toLowerCase() }).select(
        "+passwordHash +resetPasswordToken"
      );
    } catch (err) {
      throw err;
    }
  }

  static async getAll({ limit = 10, page = 1, search = "" }) {
    try {
      return await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { college: { $regex: search, $options: "i" } },
          { degree: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } },
          { gender: { $regex: search, $options: "i" } },
        ],
      })
        .sort({ _id: 1 })
        .limit(limit)
        .skip(limit * (page - 1));
    } catch (err) {
      throw err;
    }
  }

  static async getTotalCount({ search }) {
    try {
      return await User.countDocuments({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { college: { $regex: search, $options: "i" } },
          { degree: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } },
          { gender: { $regex: search, $options: "i" } },
        ],
      });
    } catch (err) {
      throw err;
    }
  }

  static async getByResetPasswordToken(resetPasswordToken) {
    try {
      return await User.findOne({ resetPasswordToken }).select(
        "+passwordHash +resetPasswordToken"
      );
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, user) {
    try {
      return await User.findByIdAndUpdate(id, user, { new: true });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  static async verifyById(id) {
    try {
      return await User.findByIdAndUpdate(id, { isVerified: true });
    } catch (err) {
      throw err;
    }
  }

  static async checkAllVerified(userIds) {
    try {
      const users = await User.find({ _id: { $in: userIds } });
      return users.every((user) => user.isVerified);
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserRepository;
