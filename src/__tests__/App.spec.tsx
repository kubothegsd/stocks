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
    - show and click country button to open Australia option 
    - Show and click Australia option to reset and load data again for au
  `, async () => {
    render(<App />, { store });

    expect(screen.getByText('Loading...')).toBeVisible();

    // show a list of 12 first tiles
    expect(await screen.findByText(/name0ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name0ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name11ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name12ca/)).not.toBeInTheDocument();

    // show and click load more
    const loadMoreButton = screen.getByRole('button', { name: 'Load more' });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(await screen.findByText(/name12ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name13ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name23ca/)).toBeInTheDocument();
    expect(screen.queryByText(/name24ca/)).not.toBeInTheDocument();

    // country dropdown
    const countryDopdownButton = screen.getByRole('button', {
      name: 'Select a country ca',
    });
    expect(countryDopdownButton).toBeInTheDocument();
    fireEvent.click(countryDopdownButton);

    // show and click australia option
    expect(await screen.findByText(/Australia/)).toBeInTheDocument();
    const australiaButton = screen.getByText('Australia');
    expect(australiaButton).toBeInTheDocument();
    fireEvent.click(australiaButton);
    expect(await screen.findByText(/name0au/)).toBeInTheDocument();

    expect(screen.queryByText(/name0au/)).toBeInTheDocument();
    expect(screen.queryByText(/name11au/)).toBeInTheDocument();
    expect(screen.queryByText(/name0ca/)).not.toBeInTheDocument();
    expect(screen.queryByText(/name12au/)).not.toBeInTheDocument();
  });
});
