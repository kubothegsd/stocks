import React from 'react';
import TileList from '../index';
import { render, screen, setUpMockServer } from '../../../utils/test-helper';
import { store } from '../../../store';

const { server, errorResponse } = setUpMockServer();

describe('TileList - error', () => {
  it('shows error state when having error', async () => {
    server.use(errorResponse);
    render(<React.Fragment />);
    render(<TileList />, { store });

    // expect(screen.getByText('Loading...')).toBeVisible();

    expect(await screen.findByText(/errorDetail/)).toBeInTheDocument();
    expect(screen.queryByText(/errorDetail/)).toBeInTheDocument();
  });
});
