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
        'Similique magnam enim iste impedit assumenda nam quisquam blanditiis. Omnis molestias eos asperiores et sit fuga. Ex aut vel dignissimos eum voluptatem et est. Necessitatibus ea aut quia sint nesciunt. Eius rerum natus odio quae quos.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Asperiores et totam velit nobis esse reiciendis animi magnam. Itaque non nam quae rerum facilis debitis quia cum. Rem delectus vel similique nisi quae laboriosam dolor. Sunt sunt est perspiciatis quia. Commodi non est est dolores modi minus omnis earum.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Similique magnam enim iste impedit assumenda nam quisquam blanditiis. Omnis molestias eos asperiores et sit fuga. Ex aut vel dignissimos eum voluptatem et est. Necessitatibus ea aut quia sint nesciunt. Eius rerum natus odio quae quos.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Asperiores et totam velit nobis esse reiciendis animi magnam. Itaque non nam quae rerum facilis debitis quia cum. Rem delectus vel similique nisi quae laboriosam dolor. Sunt sunt est perspiciatis quia. Commodi non est est dolores modi minus omnis earum.'
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
        'Similique magnam enim iste impedit assumenda nam quisquam blanditiis. Omnis molestias eos asperiores et sit fuga. Ex aut vel dignissimos eum voluptatem et est. Necessitatibus ea aut quia sint nesciunt. Eius rerum natus odio quae quos.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
