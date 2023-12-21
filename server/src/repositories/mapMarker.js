const { applicationDB } = require("../../database");

const MapMarker = require("../models/MapMarker")(applicationDB);

class MapMarkerRepository {
  static async create(marker) {
    try {
      return await MapMarker.create(marker);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await MapMarker.find();
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await MapMarker.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, marker) {
    try {
      return await MapMarker.findByIdAndUpdate(id, marker, { new: true });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await MapMarker.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MapMarkerRepository;
