# Organisation Model

The Organization Model represents the structure of an organisation which is responsible for hosting events in festify fest management framework.

## Organisation Attributes

| Attribute | Data Type        | Description                          |
| --------- | ---------------- | ------------------------------------ |
| `_id`     | string(ObjectId) | The unique identifier for the event. |
| `name`    | string           | The name of the organization.        |

## Example Organisation Object

```json
{
  "_id": "5349b4ddd2781d08c09890f3",
  "name": "Art Freaks"
}
```

## Usage

The Organisation Model is used for storing and managing information about organisations within our fest management system.
