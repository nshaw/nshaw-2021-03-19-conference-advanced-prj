import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import sessionType from 'components/__types__/session';
import SessionFieldTable from 'components/session-field-table/SessionFieldTable';

const SessionDetails = ({ t, session }) => {
  return (
    <Box>
      <h3>
        {t('common.widgetName', {
          widgetNamePlaceholder: 'Session',
        })}
      </h3>
      <SessionFieldTable session={session} />
    </Box>
  );
};

SessionDetails.propTypes = {
  session: sessionType,
  t: PropTypes.func.isRequired,
};

SessionDetails.defaultProps = {
  session: {},
};

export default withTranslation()(SessionDetails);
