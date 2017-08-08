import CustomError from 'common/customError';

/**
 * Class for throwing an Undefined Books Details Exception
 * @class
 * @extends {CustomError}
 */
class UndefinedBookDetailsException extends CustomError {
  constructor(message = 'Undefined Books Details') {
    super('UndefinedBookDetailsException', message);
  }
}

export default UndefinedBookDetailsException;
