import React from 'react';
import {
  render,
  screen,
  fireEvent,
  setUpMockServer,
} from '../utils/test-helper';
import { App } from '../App';
import { store } from '../store';

const { server, dataResponse } = setUpMockServer();

describe('App', () => {
  it(`
    - shows a list of 12 first tiles
    - show and click load more to show next 12 items
    - show and click Canada button to open Australia option 
    - show and click Australia option to reset and load data again for au
    - show and click desc button to open asc button
    - show and click asc option to reset and load data again for asc
  `, async () => {
    server.use(dataResponse);
    render(<App />, { store });

    expect(screen.getByText('Loading...')).toBeVisible();

    // show a list of 12 first tiles

    expect(await screen.findByText(/name-0/)).toBeInTheDocument();

    expect(screen.queryByText(/name-0-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-11-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-12-au/)).not.toBeInTheDocument();

    // // show and click load more
    const loadMoreButton = screen.getByRole('button', { name: 'Load more' });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(await screen.findByText(/name-12-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-13-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-23-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-24-au/)).not.toBeInTheDocument();

    // // country dropdown
    const countryDopdownButton = screen.getByRole('button', {
      name: 'Australia',
    });
    expect(countryDopdownButton).toBeInTheDocument();
    fireEvent.click(countryDopdownButton);

    // // show and click australia option
    expect(await screen.findByText(/Canada/)).toBeInTheDocument();
    const australiaButton = screen.getByText('Canada');
    expect(australiaButton).toBeInTheDocument();
    fireEvent.click(australiaButton);
    expect(await screen.findByText(/name-0-ca/)).toBeInTheDocument();

    expect(screen.queryByText(/name-0-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-11-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-0-au/)).not.toBeInTheDocument();
    expect(screen.queryByText(/name-12-ca/)).not.toBeInTheDocument();

    // // marketcap sort filter
    const marketCapSortButton = screen.getByRole('button', {
      name: 'Market Cap High to Low',
    });
    expect(marketCapSortButton).toBeInTheDocument();
    expect(screen.getByText(/name-0-ca-desc/)).toBeInTheDocument();

    // // show and click asc
    fireEvent.click(marketCapSortButton);
    expect(
      await screen.findByText(/Market Cap Low to High/)
    ).toBeInTheDocument();
    const ascButton = screen.getByText('Market Cap Low to High');
    expect(ascButton).toBeInTheDocument();

    // // Click Asc
    fireEvent.click(ascButton);

    expect(await screen.findByText(/name-0-ca-asc/)).toBeInTheDocument();
    expect(screen.queryByText(/name-0-ca-desc/)).not.toBeInTheDocument();
    expect(screen.queryByText(/name-11-ca-asc/)).toBeInTheDocument();
    expect(screen.queryByText(/name-12-ca-asc/)).not.toBeInTheDocument();
  });
});
