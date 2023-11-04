const UserRepository = require("../repositories/user");

class UserService {
  static async getAll() {
    try {
      return await UserRepository.getAll();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
