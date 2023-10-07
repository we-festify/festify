# Event Model

The Event Model represents the structure of an event in festify fest management framework.

## Event Attributes

| Attribute               | Data Type          | Description                                                                                                     |
| ----------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `_id`                   | string(ObjectId)   | The unique identifier for the event.                                                                            |
| `name`                  | string             | The name of the event.                                                                                          |
| `type`                  | string(ENUM)       | The type of activity. Value can contain any one of ["EVENT", "COMPETITION", "EXHIBITION", "WORKSHOP", "OTHER"]. |
| `summary`               | string             | The brief outline of the event                                                                                  |
| `description`           | string             | Complete details of an event including prizes, rules etc.                                                       |
| `venue `                | string             | Venue of the event                                                                                              |
| `timeline`              | array of timePoint | Includes time, venue, and description of the event                                                              |
| `timePoint.time`        | string             | Time of the event                                                                                               |
| `timePoint.venue`       | string             | Venue of the event                                                                                              |
| `timePoint.description` | string             | Description of the event                                                                                        |
| `image`                 | string             | Image of the event                                                                                              |

## Example Event Object

```json
{
  "name": "Art Exhibition",
  "type": "EXHIBITION",
  "summary": "An exhibition showcasing contemporary art pieces.",
  "description": "Explore the world of modern art through various paintings and sculptures.",
  "venue": "Art Gallery",
  "timeline": [
    {
      "time": "2023-11-05T10:00:00Z",
      "venue": "Gallery Entrance",
      "description": "Exhibition opening and welcome reception."
    },
    {
      "time": "2023-11-05T15:00:00Z",
      "venue": "Exhibition Halls",
      "description": "Guided tour of the art pieces."
    },
    {
      "time": "2023-11-05T18:00:00Z",
      "venue": "Gallery Courtyard",
      "description": "Closing ceremony and art auction."
    }
  ],
  "image": "https://fake-url.com/art_exhibition.jpg"
}
```

## Usage

The Event Model is used for storing and managing information about events within our fest management system.
