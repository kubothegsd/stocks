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
  `, async () => {
    render(<App />, { store });

    expect(screen.getByText('Loading...')).toBeVisible();

    // show a list of 12 first tiles
    expect(await screen.findByText(/name0/)).toBeInTheDocument();
    expect(screen.queryByText(/name0/)).toBeInTheDocument();
    expect(screen.queryByText(/name11/)).toBeInTheDocument();
    expect(screen.queryByText(/name12/)).not.toBeInTheDocument();

    // show and click load more
    const loadMoreButton = screen.getByRole('button', { name: 'Load more' });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(await screen.findByText(/name12/)).toBeInTheDocument();
    expect(screen.queryByText(/name13/)).toBeInTheDocument();
    expect(screen.queryByText(/name23/)).toBeInTheDocument();
    expect(screen.queryByText(/name24/)).not.toBeInTheDocument();
  });
});
