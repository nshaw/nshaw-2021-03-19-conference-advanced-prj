import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import sessionMocks from 'components/__mocks__/sessionMocks';
import { apiSessionsGet } from 'api/sessions';
import 'i18n/__mocks__/i18nMock';
import SessionTableContainer from 'components/SessionTableContainer';

jest.mock('api/sessions');

jest.mock('auth/withKeycloak', () => {
  const withKeycloak = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return withKeycloak;
});

jest.mock('components/pagination/withPagination', () => {
  const withPagination = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        pagination={{
          onChangeItemsPerPage: () => {},
          onChangeCurrentPage: () => {},
        }}
      />
    );
  };

  return withPagination;
});

describe('SessionTableContainer', () => {
  const errorMessageKey = 'error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiSessionsGet.mockImplementation(() => Promise.resolve({ sessions: sessionMocks, count: 2 }));
    const { queryByText } = render(<SessionTableContainer />);

    await wait(() => {
      expect(apiSessionsGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    apiSessionsGet.mockImplementation(() => {
      throw new Error();
    });
    const { getByText } = render(<SessionTableContainer />);

    wait(() => {
      expect(apiSessionsGet).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
