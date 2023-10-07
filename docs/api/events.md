# Events API Documentation

This documentation describes the API endpoints for managing events in our fest management framework.

## Base URL

`/api/events`

## Endpoints

### `GET` /api/events

Retreive a list of all events.

#### Response

```json
[
  {
    "name": "Music Festival",
    "type": "EVENT",
    "summary": "A lively music festival with various bands and artists.",
    "description": "Join us for a day filled with music, food, and fun.",
    "venue": "City Park",
    "timeline": [
      {
        "time": "2023-10-15T14:00:00Z",
        "venue": "Main Stage",
        "description": "Opening ceremony and first performance."
      },
      {
        "time": "2023-10-15T18:00:00Z",
        "venue": "Food Court",
        "description": "Enjoy a variety of delicious cuisines."
      },
      {
        "time": "2023-10-15T20:00:00Z",
        "venue": "Main Stage",
        "description": "Headlining act and fireworks show."
      }
    ],
    "image": "https://fake-url.com/music_festival.jpg"
  },
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
]
```

### `GET` /api/events/:id

Retreive details of a specific event by its id.

#### Parameters

- `id` (string)
  - The unique ID of the event

#### Response

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

### `GET` /api/events/type/:type

Retreive a list of all events of a specific type.

#### Parameters

- `type` (string)
  - The type of the event (EVENT, EXHIBITION, or WORKSHOP etc.)

#### Response

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

### `POST` /api/events

Create a new event.

#### Request

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

#### Response

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

### `PUT` /api/events/:id

Update an existing event.

#### Parameters

- `id` (string)
  - The unique ID of the event

#### Request

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

#### Response

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

### `DELETE` /api/events/:id

Delete an existing event.

#### Parameters

- `id` (string)
  - The unique ID of the event

#### Response

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
