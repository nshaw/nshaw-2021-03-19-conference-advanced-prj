import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import { apiSessionGet } from 'api/session';
import sessionApiGetResponseMock from 'components/__mocks__/sessionMocks';
import SessionDetailsContainer from 'components/SessionDetailsContainer';

jest.mock('api/session');

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

beforeEach(() => {
  apiSessionGet.mockClear();
});

describe('SessionDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    apiSessionGet.mockImplementation(() => Promise.resolve(sessionApiGetResponseMock));

    render(<SessionDetailsContainer id="1" />);

    await wait(() => {
      expect(apiSessionGet).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    apiSessionGet.mockImplementation(() => Promise.resolve(sessionApiGetResponseMock));

    const { getByText } = render(<SessionDetailsContainer id="1" />);

    await wait(() => {
      expect(apiSessionGet).toHaveBeenCalledTimes(1);
      expect(getByText('entities.session.name')).toBeInTheDocument();
      expect(getByText('entities.session.track')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    apiSessionGet.mockImplementation(() => Promise.reject());

    const { getByText } = render(<SessionDetailsContainer id="1" onError={onErrorMock} />);

    await wait(() => {
      expect(apiSessionGet).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
