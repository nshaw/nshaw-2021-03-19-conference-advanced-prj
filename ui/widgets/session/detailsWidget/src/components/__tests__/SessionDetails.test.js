import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import SessionDetails from 'components/SessionDetails';
import sessionMock from 'components/__mocks__/sessionMocks';

describe('SessionDetails component', () => {
  test('renders data in details widget', () => {
    const { getByText } = render(<SessionDetails session={sessionMock} />);

    expect(getByText('entities.session.name')).toBeInTheDocument();
  });
});
