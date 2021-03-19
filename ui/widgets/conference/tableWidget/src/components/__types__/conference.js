import PropTypes from 'prop-types';

const conferenceType = PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
});

export default conferenceType;
