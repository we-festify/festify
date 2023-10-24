const TeamService = require("../services/team");

class TeamController {
  static async create(req, res, next) {
    try {
      const { team } = req.body;
      const createdTeam = await TeamService.create(team);
      res.status(201).json({ team: createdTeam });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TeamController;
