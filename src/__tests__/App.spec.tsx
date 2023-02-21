import React from 'react';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { render, screen, fireEvent } from '../utils/test-helper';
import { App } from '../App';
import { store } from '../store';

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => {
  server.printHandlers();
  server.close();
});

describe('App', () => {
  it(`
    - shows a list of 12 first tiles
    - show and click load more to show next 12 items
    - show and click Canada button to open Australia option 
    - show and click Australia option to reset and load data again for au
    - show and click desc button to open asc button
    - show and click asc option to reset and load data again for asc
  `, async () => {
    render(<App />, { store });

    expect(screen.getByText('Loading...')).toBeVisible();

    // show a list of 12 first tiles
    expect(await screen.findByText(/name-0-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-0-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-11-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-12-ca/)).not.toBeInTheDocument();

    // show and click load more
    const loadMoreButton = screen.getByRole('button', { name: 'Load more' });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(await screen.findByText(/name-12-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-13-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-23-ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name-24-ca/)).not.toBeInTheDocument();

    // country dropdown
    const countryDopdownButton = screen.getByRole('button', {
      name: 'Canada',
    });
    expect(countryDopdownButton).toBeInTheDocument();
    fireEvent.click(countryDopdownButton);

    // show and click australia option
    expect(await screen.findByText(/Australia/)).toBeInTheDocument();
    const australiaButton = screen.getByText('Australia');
    expect(australiaButton).toBeInTheDocument();
    fireEvent.click(australiaButton);
    expect(await screen.findByText(/name-0-au/)).toBeInTheDocument();

    expect(screen.queryByText(/name-0-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-11-au/)).toBeInTheDocument();
    expect(screen.queryByText(/name-0-ca/)).not.toBeInTheDocument();
    expect(screen.queryByText(/name-12-au/)).not.toBeInTheDocument();

    // marketcap sort filter
    expect(await screen.findByText(/Desc/)).toBeInTheDocument();
    const marketCapSortButton = screen.getByText('Desc');
    expect(marketCapSortButton).toBeInTheDocument();
    expect(screen.getByText(/name-0-au-desc/)).toBeInTheDocument();

    // show and click asc
    fireEvent.click(marketCapSortButton);
    expect(await screen.findByText(/Asc/)).toBeInTheDocument();
    const ascButton = screen.getByText('Asc');
    expect(ascButton).toBeInTheDocument();

    // Click Asc
    fireEvent.click(ascButton);

    expect(await screen.findByText(/name-0-au-asc/)).toBeInTheDocument();
    expect(screen.queryByText(/name-0-au-desc/)).not.toBeInTheDocument();
    expect(screen.queryByText(/name-11-au-asc/)).toBeInTheDocument();
    expect(screen.queryByText(/name-12-au-asc/)).not.toBeInTheDocument();
  });
});
