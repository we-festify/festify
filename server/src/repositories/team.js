const Team = require("../models/Team");

class TeamRepository {
  static async create(team) {
    try {
      return await Team.create(team);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Team.findById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TeamRepository;
