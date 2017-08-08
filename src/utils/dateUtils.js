import moment from 'moment';

/**
 * Format a given date and inputFormat to a given outputFormat
 * @param  {string|Date} date         The given date
 * @param  {string}      inputFormat  The given input format for the date
 * @param  {string}      outputFormat The required format for the output
 * @return {string}
 */
export const formatDate = (date, inputFormat, outputFormat) => {
  const formattedDate = moment(date, inputFormat).format(outputFormat);
  if (formattedDate.toLowerCase() === 'invalid date') {
    return '';
  }
  return formattedDate;
};
