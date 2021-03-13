import React from 'react';
import { render, screen } from '@testing-library/react';
import { CraApp } from './cra-app';

test('renders learn react link', () => {
  render(<CraApp />);
  const linkElement = screen.getByText(/learn react/i);
  // @ts-ignore
  expect(linkElement).toBeInTheDocument();
});
