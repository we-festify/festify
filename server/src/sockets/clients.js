const clients = new Map();

const addClient = (userId, ws) => {
  clients.set(userId, ws);
};

const removeClient = (userId) => {
  clients.delete(userId);
};

const getClient = (userId) => {
  return clients.get(userId);
};

const getClients = () => {
  return clients.values();
};

module.exports = {
  addClient,
  removeClient,
  getClient,
  getClients,
};
