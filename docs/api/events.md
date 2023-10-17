# Events API

This documentation describes the API endpoints for managing events in our fest management framework.

## Base URL

`/api/events`

## Endpoints

### `GET` /

Retreive a list of all events.

#### Response

<details>
<summary> Toggle Response </summary>

```json
{
  "events": [
    {
      "_id": "5349b4ddd2781d08c09890f3",
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
      "image": "https://fake-url.com/music_festival.jpg",
      "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
    },
    {
      "_id": "5349b4ddd2781d08c09890f3",
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
      "image": "https://fake-url.com/art_exhibition.jpg",
      "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
    }
  ]
}
```

</details>

### `GET` /:id

Retreive details of a specific event by its id.

#### Parameters

- `id` (string)
  - The unique ID of the event

#### Response

<details>
<summary> Toggle Response </summary>

```json
{
  "event": {
    "_id": "5349b4ddd2781d08c09890f3",
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>

### `GET` /type/:type

Retreive a list of all events of a specific type.

#### Parameters

- `type` (string)
  - The type of the event (EVENT, EXHIBITION, or WORKSHOP etc.)

#### Response

<details>
<summary> Toggle Response </summary>

```json
{
  "event": {
    "_id": "5349b4ddd2781d08c09890f3",
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>

### `GET` /organisation/:id

Retreive a list of all events hosted by a specific organisation.

#### Parameters

- `id` (string)
  - The unique ID of the organisation

#### Response

<details>
<summary>Toggle Response</summary>

```json
{
  "events": [
    {
      "_id": "5349b4ddd2781d08c09890f3",
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
      "image": "https://fake-url.com/music_festival.jpg",
      "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
    },
    {
      "_id": "5349b4ddd2781d08c09890f3",
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
      "image": "https://fake-url.com/art_exhibition.jpg",
      "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
    }
  ]
}
```

</details>

### `POST` /

Create a new event.

#### Request

<details>
<summary> Toggle Request Body </summary>

```json
{
  "event": {
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>

#### Response

<details>
<summary>  Toggle Response </summary>

```json
{
  "event": {
    "_id": "5349b4ddd2781d08c09890f3",
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>

### `PUT` /:id

Update an existing event.

#### Parameters

- `id` (string)
  - The unique ID of the event

#### Request

<details>
<summary> Toggle Request Body </summary>

```json
{
  "event": {
    "_id": "5349b4ddd2781d08c09890f3",
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>

#### Response

<details>
<summary> Toggle response </summary>

```json
{
  "event": {
    "_id": "5349b4ddd2781d08c09890f3",
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>

### `DELETE` /:id

Delete an existing event.

#### Parameters

- `id` (string)
  - The unique ID of the event

#### Response

<details>
<summary> Toggle Response </summary>

```json
{
  "event": {
    "_id": "5349b4ddd2781d08c09890f3",
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
    "image": "https://fake-url.com/art_exhibition.jpg",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```

</details>
