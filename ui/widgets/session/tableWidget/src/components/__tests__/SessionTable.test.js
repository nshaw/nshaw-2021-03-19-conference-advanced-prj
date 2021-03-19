import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import sessionMocks from 'components/__mocks__/sessionMocks';
import SessionTable from 'components/SessionTable';

describe('SessionTable', () => {
  it('shows sessions', () => {
    const { getByText } = render(<SessionTable items={sessionMocks} />);
    expect(
      getByText(
        'Consectetur autem aspernatur itaque et aut nam. Veniam molestiae nobis ut accusamus ea non ad. Expedita expedita vero necessitatibus commodi voluptate perferendis earum. Consequatur sed impedit nulla sint minima ea molestias. Accusamus aut harum qui nulla iure. Praesentium consequatur ipsa aliquam alias deserunt delectus repellendus.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Natus et sunt eius. Ut dolor possimus culpa dolores. Omnis deleniti odit soluta sit in incidunt officia. Qui qui et.'
      )
    ).toBeInTheDocument();
  });

  it('shows no sessions message', () => {
    const { queryByText } = render(<SessionTable items={[]} />);
    expect(
      queryByText(
        'Consectetur autem aspernatur itaque et aut nam. Veniam molestiae nobis ut accusamus ea non ad. Expedita expedita vero necessitatibus commodi voluptate perferendis earum. Consequatur sed impedit nulla sint minima ea molestias. Accusamus aut harum qui nulla iure. Praesentium consequatur ipsa aliquam alias deserunt delectus repellendus.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Natus et sunt eius. Ut dolor possimus culpa dolores. Omnis deleniti odit soluta sit in incidunt officia. Qui qui et.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.session.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<SessionTable items={sessionMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Consectetur autem aspernatur itaque et aut nam. Veniam molestiae nobis ut accusamus ea non ad. Expedita expedita vero necessitatibus commodi voluptate perferendis earum. Consequatur sed impedit nulla sint minima ea molestias. Accusamus aut harum qui nulla iure. Praesentium consequatur ipsa aliquam alias deserunt delectus repellendus.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
