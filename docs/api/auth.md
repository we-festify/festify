# Auth API

This documentation describes the API endpoints for user authentication and authorization in our fest management framework.

## Base URL

`/api/auth`

## Endpoints

### `POST` /login

Authenticate a user with email and password.

#### Request

<details>
<summary> Toggle Request Body </summary>

```json
{
  "email": "user@example.com",
  "password": "user_password"
}
```

</details>
Response
<details>
<summary> Toggle Response </summary>

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA8c2FsdHJvdW5kcyFuZGhhZGhhcHBlcnMiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNDkyOTk4MSwiZXhwIjoxNjcwOTIyOTgxLCJvcmdhbmlzYXRpb24iOiI1ZjdmMmI5YTRmM2QxZTBiMWM5YjRjN2EiLCJyb2xlIjoiVXNlciBDaGV0dHJpIn0.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA4YzA5ODRmMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0OTI5OTgxLCJleHAiOjE2NzA5MjI5ODF9.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk",
  "user": {
    "_id": "5349b4ddd2781d08c09890f3",
    "name": "Dhan Bahadur Chhettri",
    "email": "user@example.com",
    "role": "user",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```
</details>


### `POST` /register
Register a new user.

#### Request
<details>
<summary> Toggle Request Body </summary>

```json
{
  "name": "Dhan Bahadur Chhettri",
  "email": "user@example.com",
  "password": "user_password",
  "role": "user",
  "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
}
```

</details>

Response
<details>
<summary> Toggle Response </summary>

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA8c2FsdHJvdW5kcyFuZGhhZGhhcHBlcnMiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNDkyOTk4MSwiZXhwIjoxNjcwOTIyOTgxLCJvcmdhbmlzYXRpb24iOiI1ZjdmMmI5YTRmM2QxZTBiMWM5YjRjN2EiLCJyb2xlIjoiVXNlciBDaGV0dHJpIn0.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA4YzA5ODRmMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0OTI5OTgxLCJleHAiOjE2NzA5MjI5ODF9.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk",
  "user": {
    "_id": "5349b4ddd2781d08c09890f3",
    "name": "Dhan Bahadur Chhettri",
    "email": "user@example.com",
    "role": "user",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```
</details>


### `GET` /refresh
Refresh an access token using a refresh token.

Request
<details>
<summary> Toggle Request Body </summary>

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA4YzA5ODRmMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0OTI5OTgxLCJleHAiOjE2NzA5MjI5ODF9.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk"

}
```
</details>


Response
<details>
<summary> Toggle Response </summary>

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA8c2FsdHJvdW5kcyFuZGhhZGhhcHBlcnMiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNDkyOTk4MSwiZXhwIjoxNjcwOTIyOTgxLCJvcmdhbmlzYXRpb24iOiI1ZjdmMmI5YTRmM2QxZTBiMWM5YjRjN2EiLCJyb2xlIjoiVXNlciBDaGV0dHJpIn0.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzQ5YjRkZGQyNzgxZDA4YzA5ODRmMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0OTI5OTgxLCJleHAiOjE2NzA5MjI5ODF9.WYsdP4_U8SVsC9vV9vyG_BrG3A3gD9GkN0m1i6S7auk",
  "user": {
    "_id": "5349b4ddd2781d08c09890f3",
    "name": "Dhan Bahadur Chhettri",
    "email": "user@example.com",
    "role": "user",
    "organisation": "5f7f2b9a4f3d1e0b1c9b4c7a"
  }
}
```
</details>

### `GET` /logout
Logout a user (requires authentication).

Response
<details>
<summary> Toggle Response </summary>

```json
{
  "message": "User logged out"
}
```
</details>