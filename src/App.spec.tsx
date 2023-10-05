import { fireEvent, render, waitFor } from '@testing-library/react';
import ContentResults from './components/ContentResults';

describe('ContentResults Component', () => {
  it('should render search results for a valid animal name', async () => {
    const mockResults = [
      {
        route: '/animals/bird',
        title: 'Bird',
        description: 'A flying animal with feathers.',
      },
    ];

    const { getByText } = render(<ContentResults results={mockResults} />);
    const birdElement = await waitFor(() => getByText('Bird'));
    expect(birdElement).toBeInTheDocument();
  });

  it('should display a message for invalid animal names', async () => {
    const { getByText } = render(<ContentResults results={[]} />);
    const invalidMessageElement = await waitFor(() =>
      getByText("No results found for .")
    );
    expect(invalidMessageElement).toBeInTheDocument();
  });

  it('should display a message for empty search term', async () => {
    const { getByText } = render(<ContentResults results={[]} />);
    const emptySearchMessageElement = await waitFor(() =>
      getByText('Try looking for:')
    );
    expect(emptySearchMessageElement).toBeInTheDocument();
  });
});
