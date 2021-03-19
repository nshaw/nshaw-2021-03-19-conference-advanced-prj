import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import sessionType from 'components/__types__/session';

const SessionFieldTable = ({ t, session }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('common.name')}</TableCell>
        <TableCell>{t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <span>{t('entities.session.id')}</span>
        </TableCell>
        <TableCell>
          <span>{session.id}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.session.name')}</span>
        </TableCell>
        <TableCell>
          <span>{session.name}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.session.track')}</span>
        </TableCell>
        <TableCell>
          <span>{session.track}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

SessionFieldTable.propTypes = {
  session: sessionType,
  t: PropTypes.func.isRequired,
};

SessionFieldTable.defaultProps = {
  session: [],
};

export default withTranslation()(SessionFieldTable);
