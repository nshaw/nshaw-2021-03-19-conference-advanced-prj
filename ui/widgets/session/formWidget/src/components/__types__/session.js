import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
});

export const formValues = PropTypes.shape({
  name: PropTypes.string,
  track: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  track: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  track: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
