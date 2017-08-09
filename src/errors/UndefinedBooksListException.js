import CustomError from 'errors/CustomError';

/**
 * Class for throwing an Undefined Books List Exception
 * @class
 * @extends {CustomError}
 */
class UndefinedBooksListException extends CustomError {
  constructor(message = 'Undefined Books List') {
    super('UndefinedBooksListException', message);
  }
}

export default UndefinedBooksListException;
