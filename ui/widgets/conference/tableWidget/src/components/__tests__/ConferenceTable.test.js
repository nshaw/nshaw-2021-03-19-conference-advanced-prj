import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import conferenceMocks from 'components/__mocks__/conferenceMocks';
import ConferenceTable from 'components/ConferenceTable';

describe('ConferenceTable', () => {
  it('shows conferences', () => {
    const { getByText } = render(<ConferenceTable items={conferenceMocks} />);
    expect(
      getByText(
        'Architecto recusandae et quia. Ratione fuga magnam cum. Voluptatem est architecto qui et. Nesciunt sed earum velit voluptatem.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Sed rem aut omnis. Nihil sapiente eveniet omnis consequatur necessitatibus molestiae et dignissimos. Atque non velit. Quidem non distinctio consequatur voluptas possimus alias qui odio. Nam architecto ullam dolorem ab ad aut. Dolore dolor et modi quia expedita.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Architecto recusandae et quia. Ratione fuga magnam cum. Voluptatem est architecto qui et. Nesciunt sed earum velit voluptatem.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Sed rem aut omnis. Nihil sapiente eveniet omnis consequatur necessitatibus molestiae et dignissimos. Atque non velit. Quidem non distinctio consequatur voluptas possimus alias qui odio. Nam architecto ullam dolorem ab ad aut. Dolore dolor et modi quia expedita.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.conference.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <ConferenceTable items={conferenceMocks} onSelect={onSelectMock} />
    );
    fireEvent.click(
      getByText(
        'Architecto recusandae et quia. Ratione fuga magnam cum. Voluptatem est architecto qui et. Nesciunt sed earum velit voluptatem.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
