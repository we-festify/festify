<div align="center">

<a href="https://github.com/we-festify/festify/issues"><img src="https://img.shields.io/github/issues/we-festify/festify"></a>
<a href="https://github.com/we-festify/festify/pulls"><img src="https://img.shields.io/github/issues-pr/we-festify/festify"></a>
<a href="https://github.com/we-festify/festify/network/members"><img src="https://img.shields.io/github/forks/we-festify/festify"></a>
<a href="https://github.com/we-festify/festify/stargazers"><img src="https://img.shields.io/github/stars/we-festify/festify"></a>
<a href="https://github.com/we-festify/festify/blob/master/LICENSE"><img src="https://img.shields.io/github/license/we-festify/festify"></a>

</div>

# What is Festify

Festify is a free and open-source framework for building fest management websites for colleges and universities. It is a one-stop solution for all the fests related activities. It is built with the MERN stack and is highly scalable and customizable.

## Features

`*` - Upcoming

- Event Registrations
- Event Management (Create, Update, Delete)
- Entry Management (Blazing fast QR Code based Check-in)
- API Query Caching (RTK Query)
- Payment Gateway Integration (Razorpay)
- User Management (Admin, Organizers, Participants)
- User Authentication (JWT)
- Email Verification
- `*` Notifications (Email, Push, in-app)
- `*` Marketing Campaigns (Email, Push)
- `*` Real-time Updates (WebSockets)
- Dashboard (Admin, Organizers)
- Customizable
- `*` Scalable (Horizontal Scaling)
- Responsive and modern Design (Mobile, Desktop)

## Tech Stack

- **Frontend**

  - React (CRA)
  - Redux
  - Redux Toolkit
  - RTK Query
  - Modular CSS

- **Backend**

  - Node.js
  - Express
  - Mongoose
  - JWT and cookies

- **Communication Protocol**

  - REST API
  - WebSockets

- **Pub/Sub**

  - Redis

- **Package Manager**

  - npm

- **Database**

  - MongoDB Atlas

- **Version Control**
  - GitHub

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- Redis (Optional, for pub/sub during horizontal scaling)

### Installation

1. Clone the repo

```bash
git clone https://github.com/we-festify/festify.git
```

2. Install NPM packages

```bash
npm install
```

3. Create `.env` files in the directories and add the fields mentioned in the `.env.example` files.

4. Run the client and server simultaneously in different terminals

```bash
cd web
npm start
```

```bash
cd server
npm start
```

## Contributing

Contributions are always welcome!

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Our valuable Contributors

<a href="https://github.com/we-festify/festify/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=we-festify/festify" />
</a>

## License

Distributed under the Apache License 2.0. See [`LICENSE`](LICENSE) for more information.
