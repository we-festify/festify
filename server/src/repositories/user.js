const User = require("../models/User");

class UserRepository {
  static excludeSensitiveFields(user) {
    const { passwordHash, ...userWithoutSensitiveFields } = user._doc;
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
}

module.exports = UserRepository;
