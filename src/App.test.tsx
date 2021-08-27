import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';

test('renders Login to Github button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/login to github/i);
  expect(buttonElement).toBeInTheDocument();
});
