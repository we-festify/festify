const User = require("../models/User");

class UserRepository {
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

  static async getById(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await User.find();
    } catch (err) {
      throw err;
    }
  }

  static async getByResetPasswordToken(resetPasswordToken) {
    try {
      return await User.findOne({ resetPasswordToken });
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
