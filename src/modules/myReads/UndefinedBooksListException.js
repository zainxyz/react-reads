import CustomError from '../../common/customError';

class UndefinedBooksListException extends CustomError {
  constructor(message = 'Undefined Books List') {
    super('UndefinedBooksListException', message);
  }
}

export default UndefinedBooksListException;
