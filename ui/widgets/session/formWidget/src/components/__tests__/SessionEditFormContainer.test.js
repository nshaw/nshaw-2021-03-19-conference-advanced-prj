import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiSessionGet, apiSessionPut } from 'api/sessions';
import SessionEditFormContainer from 'components/SessionEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import sessionMock from 'components/__mocks__/sessionMocks';

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

describe('SessionEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiSessionGet.mockImplementation(() => Promise.resolve(sessionMock));
    const { queryByText } = render(
      <SessionEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiSessionGet).toHaveBeenCalledTimes(1);
      expect(apiSessionGet).toHaveBeenCalledWith('', '1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
  }, 7000);

  it('saves data', async () => {
    apiSessionGet.mockImplementation(() => Promise.resolve(sessionMock));
    apiSessionPut.mockImplementation(() => Promise.resolve(sessionMock));

    const { findByTestId, queryByText } = render(
      <SessionEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiSessionPut).toHaveBeenCalledTimes(1);
      expect(apiSessionPut).toHaveBeenCalledWith('', sessionMock);
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully loaded', async () => {
    apiSessionGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(
      <SessionEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiSessionGet).toHaveBeenCalledTimes(1);
      expect(apiSessionGet).toHaveBeenCalledWith('', '1');
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiSessionGet.mockImplementation(() => Promise.resolve(sessionMock));
    apiSessionPut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(
      <SessionEditFormContainer id="1" onError={onErrorMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiSessionGet).toHaveBeenCalledTimes(1);
      expect(apiSessionGet).toHaveBeenCalledWith('', '1');

      expect(apiSessionPut).toHaveBeenCalledTimes(1);
      expect(apiSessionPut).toHaveBeenCalledWith('', sessionMock);

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
