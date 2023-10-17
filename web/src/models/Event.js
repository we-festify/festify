class Event {
  constructor({
    _id = null,
    name = "",
    type = "",
    summary = "",
    description = "",
    venue = "",
    timeline = [],
    image = "",
  }) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.summary = summary;
    this.description = description;
    this.venue = venue;
    this.timeline = timeline;
    this.image = image;
  }
}

export default Event;
