const MapMarkerService = require("../services/mapMarker");
const { BadRequestError } = require("../utils/errors");

class MapController {
  static async createMarker(req, res, next) {
    try {
      const { marker } = req.body;
      if (!marker) {
        throw new BadRequestError("Missing marker");
      }
      const { user } = req;
      marker.createdBy = user._id;
      const createdMarker = await MapMarkerService.create(marker);
      res.status(201).json({ marker: createdMarker });
    } catch (err) {
      next(err);
    }
  }

  static async getAllMarkers(req, res, next) {
    try {
      const markers = await MapMarkerService.getAll();
      res.status(200).json({ markers });
    } catch (err) {
      next(err);
    }
  }

  static async getMarkerById(req, res, next) {
    try {
      const { id } = req.params;
      const marker = await MapMarkerService.getById(id);
      res.status(200).json({ marker });
    } catch (err) {
      next(err);
    }
  }

  static async updateMarkerById(req, res, next) {
    try {
      const { id } = req.params;
      const { marker } = req.body;
      if (!marker) {
        throw new BadRequestError("Missing marker");
      }
      const { user } = req;
      marker.createdBy = user._id;
      const updatedMarker = await MapMarkerService.updateById(id, marker);
      res.status(200).json({ marker: updatedMarker });
    } catch (err) {
      next(err);
    }
  }

  static async deleteMarkerById(req, res, next) {
    try {
      const { id } = req.params;
      await MapMarkerService.deleteById(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  static async selfValidator(req) {
    try {
      const { id } = req.params;
      const { user } = req;
      const marker = await MapMarkerService.getById(id);
      if (!marker) return false;
      if (marker.createdBy.toString() !== user._id.toString()) return false;
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = MapController;
