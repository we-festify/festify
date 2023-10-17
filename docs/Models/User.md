# User Model

The User Model represents the structure of an user in festify fest management framework.

## User Attributes

| Attribute               | Data Type          | Description                                                                                                      |
| ----------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------  |
| `_id`                   | string(ObjectId)   | The unique identifier for the user.                                                                              |
| `name`                  | string             | The name of the user.                                                                                            |
| `email`                 | string             | The email id of the user                                                                                         |
| `passwordHash`          | string             | The password of the user                                                                                         |
| `role`                  | string(ENUM)       | The type of role. Value can contain any one of ["admin", "organiser", "user"].                                   |
| `organisation`          | string             | The name of the organisation the user works for.                                                                 |

## Example User Object

```json
{
  "_id": "5349b4ddd2781d08c09890f3",
  "name": "Dhan Bahadur Chhettri",
  "email": "progcomp29@gmail.com",
  "passwordHash": "$2a$10$saltroundsandhashedpassword",
  "role": "admin",
  "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
}
```

## Usage

The User Model is used for storing and managing information about different kinds of users within our fest management system.
