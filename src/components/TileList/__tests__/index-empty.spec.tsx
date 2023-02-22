import React from 'react';
import TileList from '../index';
import { render, screen, setUpMockServer } from '../../../utils/test-helper';
import { store } from '../../../store';

const { server, emptyResponse } = setUpMockServer();

describe('TileList - No data', () => {
  it('shows empty state when having no data', async () => {
    server.use(emptyResponse);

    render(<TileList />, { store });
    expect(screen.getByText('Loading...')).toBeVisible();
    expect(await screen.findByText(/No data/)).toBeInTheDocument();
    expect(screen.queryByText(/No data/)).toBeInTheDocument();
  });
});
