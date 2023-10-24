const TeamRepository = require("../repositories/team");

class TeamService {
  static checkRequiredFields(team) {
    if (!team) throw new BadRequestError("Missing team");
    const requiredFields = ["name", "members", "leader"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!team[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async create(team) {
    try {
      this.checkRequiredFields(team);
      team.members = [...new Set(team.members)]; // remove duplicates
      return await TeamRepository.create(team);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TeamService;
