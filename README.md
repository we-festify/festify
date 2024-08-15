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
- Notifications (Email, Push, in-app)
- `*` Marketing Campaigns (Email, Push)
- Real-time Updates (FCM)
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
  - Firebase Cloud Messaging

- **Communication Protocol**

  - REST API
  - WebSockets
  - Firebase Cloud Messaging

- **Message Broker**

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

4. Complete the configuration steps mentioned [here](#configuration) as per your requirements.

5. Run the client and server simultaneously in different terminals

   ```bash
   cd web
   npm start
   ```

   ```bash
   cd server

   # For testing data
   # To seed the database with mongoDB url from .env
   node seed
   # To seed the database with a custom mongoDB url
   node seed --url <mongoDB-url>
   # To clear the database before seeding
   node seed --clear --url <mongoDB-url>

   # For development
   npm run dev

   # For production
   npm run build
   npm start
   ```

## Configuration

### Razorpay

For the Razorpay payment gateway to work, you need to create a Razorpay account and add the credentials in the `.env` files. You can create a test account [here](https://dashboard.razorpay.com/app/dashboard).

Also, you need to add a webhook inside the Razorpay dashboard. The webhook URL should be `https://<your-domain>/api/payment/verify`. You can use [ngrok](https://ngrok.com/) to create a temporary domain for testing.

```bash
ngrok http 5000

# Output
Forwarding                    https://<random-string>.ngrok.io -> http://localhost:5000

# Add the webhook URL as https://<random-string>.ngrok.io/api/payments/verify
```

The webhook should be of type `Payment` and should be triggered only on `Payment Captured` and `Payment Failed` events.

### Redis

For the Redis to work, you need to create a Redis account and add the credentials in the `.env` files. You can run a Redis server locally using Docker.

```bash
docker run --name redis -p 6379:6379 -d redis
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
