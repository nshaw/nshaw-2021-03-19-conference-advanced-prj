import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import conferenceMock from 'components/__mocks__/conferenceMocks';
import ConferenceForm from 'components/ConferenceForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Conference Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConferenceForm conference={conferenceMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.conference.name').value).toBe(
      'Similique magnam enim iste impedit assumenda nam quisquam blanditiis. Omnis molestias eos asperiores et sit fuga. Ex aut vel dignissimos eum voluptatem et est. Necessitatibus ea aut quia sint nesciunt. Eius rerum natus odio quae quos.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConferenceForm conference={conferenceMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('conference-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
