import CustomError from 'common/customError';

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
