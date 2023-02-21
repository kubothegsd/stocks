import React from 'react';
import { render, screen } from '../utils/test-helper';
import { App } from '../App';

describe('App', () => {
  it('works', () => {
    render(<App />);
    expect(screen.getByText('This is the test app')).toBeVisible();
  });
});
