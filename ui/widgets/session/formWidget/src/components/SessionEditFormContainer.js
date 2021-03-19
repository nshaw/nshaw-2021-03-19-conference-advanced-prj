import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import keycloakType from 'components/__types__/keycloak';
import withKeycloak from 'auth/withKeycloak';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import { apiSessionGet, apiSessionDelete, apiSessionPut } from 'api/sessions';
import Notification from 'components/common/Notification';
import SessionForm from 'components/SessionForm';

class SessionEditFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notificationMessage: null,
      notificationStatus: null,
    };

    this.closeNotification = this.closeNotification.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { keycloak, id } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    const changedAuth = prevProps.keycloak.authenticated !== authenticated;
    const changedId = id && id !== prevProps.id;

    if (authenticated && (changedId || changedAuth)) {
      this.fetchData();
    }
  }

  async fetchData() {
    const { keycloak, id, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated && id) {
      try {
        const session = await apiSessionGet(serviceUrl, id);
        this.setState(() => ({
          session,
        }));
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  closeNotification() {
    this.setState(() => ({
      notificationMessage: null,
    }));
  }

  async handleSubmit(session) {
    const { t, onUpdate, keycloak, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const updatedSession = await apiSessionPut(serviceUrl, session);
        onUpdate(updatedSession);

        this.setState({
          session: updatedSession,
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  async handleDelete(session) {
    const { t, onDelete, keycloak, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        await apiSessionDelete(serviceUrl, session.id);
        onDelete(session);
        this.setState({
          session: null,
          notificationMessage: t('common.dataDeleted'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  handleError(err) {
    const { t, onError } = this.props;
    onError(err);
    this.setState(() => ({
      notificationMessage: t('error.dataLoading'),
      notificationStatus: Notification.ERROR,
    }));
  }

  render() {
    const { keycloak, onCancelEditing, t } = this.props;
    const { notificationMessage, notificationStatus, session } = this.state;

    let form;
    if (typeof session === 'undefined') {
      form = t('entities.session.notFound');
    } else if (session === null) {
      form = t('entities.session.deleted');
    } else {
      form = (
        <SessionForm
          session={session}
          onSubmit={this.handleSubmit}
          onCancelEditing={onCancelEditing}
          onDelete={this.handleDelete}
        />
      );
    }
    return (
      <>
        <UnauthenticatedView keycloak={keycloak}>
          {t('common.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>{form}</AuthenticatedView>
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

SessionEditFormContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onCancelEditing: PropTypes.func,
  onError: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  t: PropTypes.func.isRequired,
  keycloak: keycloakType.isRequired,
  serviceUrl: PropTypes.string,
};

SessionEditFormContainer.defaultProps = {
  onCancelEditing: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onError: () => {},
  serviceUrl: '',
};

export default withKeycloak(withTranslation()(SessionEditFormContainer));
