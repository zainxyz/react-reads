/**
 * Class for creating custom Error objects
 * @class
 * @extends Error
 */
class CustomError extends Error {
  /**
   * Create a CustomError
   * @param {String} name
   * @param {string} message
   */
  constructor(name, message) {
    super(message);

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: name,
      writable: true,
    });

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });

    if (
      Object.prototype.hasOwnProperty.call(Error, 'captureStackTrace') &&
      typeof Error.captureStackTrace === 'function'
    ) {
      Error.captureStackTrace(this, this.constructor);
      return;
    }

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      value: (new Error(message)).stack,
      writable: true,
    });
  }
}

export default CustomError;
