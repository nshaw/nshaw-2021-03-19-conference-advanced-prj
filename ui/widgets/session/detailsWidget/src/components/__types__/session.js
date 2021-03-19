import PropTypes from 'prop-types';

const sessionType = PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
  track: PropTypes.string,
});

export default sessionType;
