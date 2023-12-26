/**
 * @type HandlerFunction
 * @param {any} payload
 * @param {WebSocket} ws
 * @param {WebSocketServer} wss
 * @returns {void}
 */

/**
 * SocketRouter
 * @class
 */
class SocketRouter {
  constructor() {
    /** @type string */
    this._type = null;
    /** @type Record<string, HandlerFunction> */
    this._types = {};
  }

  /**
   * Add sub-router
   * @param {string} type
   * @param {SocketRouter} router
   * @returns {void}
   */
  use = (type, router) => {
    const handlers = router._getHandlers();
    for (const [key, handler] of Object.entries(handlers)) {
      const newType = `${type}:${key}`;
      this._types[newType] = handler;
    }
  };

  /**
   * Register a new type of message
   * @param {string} type
   * @param {HandlerFunction} handler
   * @returns {void}
   */
  type = (type, handler) => {
    this._types[type] = handler;
  };

  /**
   * Handle a message
   * @param {string} type
   * @param {any} payload
   * @param {WebSocket} ws
   * @param {WebSocketServer} wss
   */
  handle = (type, payload, ws, wss) => {
    /** @type HandlerFunction */
    const handler = this._types[type];
    if (handler) {
      handler(payload, ws, wss);
    } else {
      ws.send(JSON.stringify(["error", `No type found for ${type}`]));
    }
  };

  _getHandlers = () => {
    return this._types;
  };
}

module.exports = SocketRouter;
