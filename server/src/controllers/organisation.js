const OrganisationService = require("../services/organisation");

class OrganisationController {
  static async create(req, res, next) {
    try {
      const { organisation } = req.body;
      const createdOrganisation = await OrganisationService.create(
        organisation
      );
      res.status(201).json({ organisation: createdOrganisation });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const organisation = await OrganisationService.getById(id);
      res.status(200).json({ organisation });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { extended } = req.query;
      const organisations = await OrganisationService.getAll({ extended });
      res.status(200).json({ organisations });
    } catch (err) {
      next(err);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { organisation } = req.body;
      const updatedOrganisation = await OrganisationService.updateById(
        id,
        organisation
      );
      res.status(200).json({ organisation: updatedOrganisation });
    } catch (err) {
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedOrganisation = await OrganisationService.deleteById(id);
      res.status(200).json({ organisation: deletedOrganisation });
    } catch (err) {
      next(err);
    }
  }

  static async organisationMemberValidator(req) {
    try {
      const { id } = req.params;
      const { user } = req;
      if (id !== user.organisation) return false;
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = OrganisationController;
