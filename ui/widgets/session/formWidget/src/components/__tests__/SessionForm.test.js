import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import sessionMock from 'components/__mocks__/sessionMocks';
import SessionForm from 'components/SessionForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Session Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <SessionForm session={sessionMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.session.name').value).toBe(
      'Consectetur autem aspernatur itaque et aut nam. Veniam molestiae nobis ut accusamus ea non ad. Expedita expedita vero necessitatibus commodi voluptate perferendis earum. Consequatur sed impedit nulla sint minima ea molestias. Accusamus aut harum qui nulla iure. Praesentium consequatur ipsa aliquam alias deserunt delectus repellendus.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SessionForm session={sessionMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('session-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
