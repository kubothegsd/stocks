import React from 'react';
import { render, screen } from '../utils/test-helper';
import { App } from '../App';

describe('App', () => {
  it('works', () => {
    render(<App name="a" />);
    expect(screen.getByText('a')).toBeVisible();
  });
});
